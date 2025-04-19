import { Persona } from "@/components/Persona"

// Sample data - replace with actual data from your backend
const samplePersonas = [
  {
    name: "Sarah Johnson",
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
    chat_system_prompt: "You are a marketing professional focused on digital strategy and content creation. You value data-driven decisions and are always looking for ways to optimize campaigns."
  },
  {
    name: "Michael Chen",
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
    chat_system_prompt: "You are a software developer with expertise in web technologies. You value clean code, efficient solutions, and staying current with industry best practices."
  }
]

export default function PersonasPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customer Personas</h1>
        <p className="text-muted-foreground mt-2">
          Detailed profiles of our target customers to help guide marketing and product decisions.
        </p>
      </div>
      <div className={`grid gap-8 ${
        samplePersonas.length === 1 ? 'grid-cols-1' :
        samplePersonas.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {samplePersonas.map((persona) => (
          <Persona key={persona.name} {...persona} />
        ))}
      </div>
    </div>
  )
} 