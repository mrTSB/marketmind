"use client"

import { useContext, useEffect, useState } from "react"
import { Persona } from "@/components/Persona"
import { ContentIdContext } from "../providers/content_id_provider";
import { QuickLoadingModal } from "@/components/QuickLoadingModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { groupChat } from "../communicator";

// Sample data - replace with actual data from your backend
const initialPersonas = [
  {
    name: "Sarah Johnson",
    image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    age: 32,
    occupation: "Marketing Manager",
    income_level: "$80,000 - $120,000",
    interests: ["Digital Marketing", "Social Media", "Content Creation", "Data Analytics"],
    pain_points: [
      "Struggling to measure ROI effectively",
      "Limited budget for marketing tools",
      "Time-consuming content creation process"
    ],
    goals: [
      "Increase brand awareness",
      "Improve social media engagement",
      "Streamline marketing workflows"
    ],
    preferred_channels: ["LinkedIn", "Twitter", "Email", "Webinars"],
    buying_behavior: "Research-driven, values authenticity and data-backed solutions",
    brand_preferences: ["HubSpot", "Buffer", "Canva", "Google Analytics"],
    chat_system_prompt: "You are a marketing professional focused on digital strategy and content creation. You value data-driven decisions and are always looking for ways to optimize campaigns.",
    messages: [
      {
        role: "User",
        content: "What marketing tools do you use for social media management?"
      },
      {
        role: "Sarah Johnson",
        content: "I primarily use Buffer for scheduling and analytics, along with Canva for content creation. I'm also exploring HubSpot's social media tools for better integration with our CRM."
      }
    ]
  },
  {
    name: "Michael Chen",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    age: 28,
    occupation: "Software Developer",
    income_level: "$90,000 - $130,000",
    interests: ["Web Development", "AI/ML", "Open Source", "Tech Communities"],
    pain_points: [
      "Complex technical documentation",
      "Time-consuming debugging",
      "Keeping up with new technologies"
    ],
    goals: [
      "Build scalable applications",
      "Contribute to open source",
      "Learn new programming languages"
    ],
    preferred_channels: ["GitHub", "Stack Overflow", "Tech Blogs", "Developer Forums"],
    buying_behavior: "Technical evaluation first, community-driven decisions",
    brand_preferences: ["VS Code", "GitHub", "JetBrains", "AWS"],
    chat_system_prompt: "You are a software developer with expertise in web technologies. You value clean code, efficient solutions, and staying current with industry best practices.",
    messages: [
      {
        role: "User",
        content: "What's your preferred development environment setup?"
      },
      {
        role: "Michael Chen",
        content: "I use VS Code as my primary IDE with several key extensions for web development. For version control, I'm active on GitHub and contribute to open source projects regularly."
      }
    ]
  },
  {
    name: "Emily Rodriguez",
    image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    age: 35,
    occupation: "Product Manager",
    income_level: "$100,000 - $150,000",
    interests: ["Product Strategy", "User Experience", "Agile Methodologies", "Market Research"],
    pain_points: [
      "Balancing stakeholder expectations",
      "Prioritizing feature requests",
      "Measuring product success metrics"
    ],
    goals: [
      "Launch successful products",
      "Improve user satisfaction",
      "Build strong product teams"
    ],
    preferred_channels: ["Product Hunt", "LinkedIn", "Industry Conferences", "Product Communities"],
    buying_behavior: "Data-driven, ROI-focused, values user feedback",
    brand_preferences: ["Jira", "Figma", "Amplitude", "Mixpanel"],
    chat_system_prompt: "You are a product manager focused on delivering value to users while meeting business objectives. You excel at prioritization and stakeholder management.",
    messages: [
      {
        role: "User",
        content: "How do you approach product roadmap planning?"
      },
      {
        role: "Emily Rodriguez",
        content: "I start with user research and market analysis, then prioritize features based on impact and effort. I use Jira for tracking and Figma for prototyping, ensuring alignment with stakeholders throughout the process."
      }
    ]
  },
  {
    name: "David Kim",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    age: 41,
    occupation: "Small Business Owner",
    income_level: "$70,000 - $120,000",
    interests: ["Business Growth", "Customer Service", "Local Community", "Digital Marketing"],
    pain_points: [
      "Limited marketing budget",
      "Finding reliable staff",
      "Managing cash flow"
    ],
    goals: [
      "Expand business operations",
      "Build customer loyalty",
      "Implement digital solutions"
    ],
    preferred_channels: ["Local Business Groups", "Facebook", "Email Marketing", "Word of Mouth"],
    buying_behavior: "Cost-conscious, values local relationships, seeks proven solutions",
    brand_preferences: ["Square", "Mailchimp", "QuickBooks", "Google Business"],
    chat_system_prompt: "You are a small business owner focused on growth while maintaining quality service. You value practical solutions and community relationships.",
    messages: [
      {
        role: "User",
        content: "What tools do you use to manage your business?"
      },
      {
        role: "David Kim",
        content: "I use Square for payments, QuickBooks for accounting, and Mailchimp for customer communications. Google Business helps me manage my online presence and local SEO."
      }
    ]
  }
]

interface GroupMessage {
  role: string;
  content: string;
  persona?: string;
}

export default function PersonasPage() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;
  
  const [personas, setPersonas] = useState(initialPersonas)
  const [isLoading, setIsLoading] = useState(true)
  const [isGroupChatOpen, setIsGroupChatOpen] = useState(false);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [groupChatInput, setGroupChatInput] = useState("");

  const loadPersonas = async () => {
    if (!contentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${contentId}&contentType=personas`);
      if (!response.ok) {
        throw new Error('Failed to load personas');
      }
      const data = await response.json();
      setPersonas(data.personas);
    } catch (error) {
      console.error('Error loading personas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPersonas();
  }, [contentId]);

  const handleMessagesUpdate = (name: string, newMessages: Array<{ role: string; content: string }>) => {
    setPersonas(prevPersonas =>
      prevPersonas.map(persona =>
        persona.name === name
          ? { ...persona, messages: newMessages }
          : persona
      ) ?? []
    )
  }

  const handleGroupChat = async () => {
    if (!groupChatInput.trim() || !contentId) return;

    // Add user message
    const userMessage: GroupMessage = {
      role: "User",
      content: groupChatInput,
    };
    setGroupMessages(prev => [...prev, userMessage]);

    try {
      // Get responses from all personas using the API
      const responses = await groupChat(contentId, groupChatInput);

      console.log(responses);
      
      // Add each persona's response to the messages
      responses.responses.forEach(personaResponse => {
        const response: GroupMessage = {
          role: personaResponse.persona_name,
          content: personaResponse.response,
          persona: personaResponse.persona_name
        };
        setGroupMessages(prev => [...prev, response]);
      });
    } catch (error) {
      console.error('Error in group chat:', error);
      // You might want to show an error message to the user here
    }

    setGroupChatInput("");
  };

  if (isLoading) {
    return <QuickLoadingModal message="Loading customer personas..." />;
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Personas</h1>
          <p className="text-muted-foreground mt-2">
            Detailed profiles of our target customers to help guide marketing and product decisions.
          </p>
        </div>
        <Dialog open={isGroupChatOpen} onOpenChange={setIsGroupChatOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-4">
              Open Group Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Group Chat with All Personas</DialogTitle>
            </DialogHeader>
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 border rounded-lg mb-4">
                <div className="flex flex-col gap-4">
                  {groupMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg break-words ${
                        message.role === "User"
                          ? "bg-primary text-primary-foreground ml-auto max-w-[80%] self-end"
                          : "bg-muted max-w-[80%] self-start"
                      }`}
                    >
                      {message.persona && (
                        <div className="font-semibold text-sm mb-1">{message.persona}</div>
                      )}
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 p-4 border-t">
                <input
                  type="text"
                  value={groupChatInput}
                  onChange={(e) => setGroupChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGroupChat()}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your message..."
                />
                <Button onClick={handleGroupChat}>Send</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {personas.map((persona) => (
          <Persona
            key={persona.name}
            {...persona}
            onMessagesUpdate={(messages) => handleMessagesUpdate(persona.name, messages)}
          />
        ))}
      </div>
    </div>
  )
} 