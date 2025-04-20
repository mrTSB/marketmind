'use client';

import { useState, useEffect, useContext } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateContent, getCampaigns, getMarketResearch, getPersonas, getExecutiveBrief, getGTMPlan } from '@/app/communicator';
import { LoadingModal } from '@/components/LoadingModal';
import { ContentIdContext } from "@/app/providers/content_id_provider";
import { useRouter } from 'next/navigation';
export default function GeneratePage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const router = useRouter();
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  useEffect(() => {
    // Initialize contentId from localStorage if not already set
    if (contentId === null) {
      const storedContentId = localStorage.getItem('contentId');
      if (storedContentId) {
        setContentId(storedContentId);
      }
    }
  }, [contentId, setContentId]);

  const exampleQueries = [
    "What were the top performing sectors last quarter?",
    "Analyze the market sentiment for tech stocks",
    "Show me emerging trends in renewable energy",
    "Compare Tesla and Ford's performance"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage('Preparing your request...');

    try {
      setLoadingMessage('Generating content...');
      const productInfo = {
        product_info: query,
        company_info: "The company information should be in Product Info"
      };
      
      const newContentId = await generateContent(productInfo);
      setContentId(newContentId);

      // Clear existing content first
      const clearResponse = await fetch('/api/clear-content', {
        method: 'POST',
      });
      
      if (!clearResponse.ok) {
        throw new Error('Failed to clear existing content');
      }
      
      const campaigns = await getCampaigns(newContentId);
      console.log(campaigns);
      
      // Save campaigns to JSON file in content folder
      const campaignsJson = JSON.stringify(campaigns, null, 2);
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contentId: newContentId, 
          content: campaignsJson,
          contentType: 'campaigns'
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to save campaigns');
      }
      
      const personas = await getPersonas(newContentId);
      console.log(personas);
      
      // Save personas to JSON file
      const personasJson = JSON.stringify(personas, null, 2);
      const personasResponse = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contentId: newContentId, 
          content: personasJson,
          contentType: 'personas'
        }),
      });
      
      if (!personasResponse.ok) {
        console.error('Failed to save personas');
      }
      
      const marketResearch = await getMarketResearch(newContentId);
      console.log(marketResearch);
      
      // Save market research to JSON file
      const marketResearchJson = JSON.stringify(marketResearch, null, 2);
      const marketResearchResponse = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contentId: newContentId, 
          content: marketResearchJson,
          contentType: 'market-research'
        }),
      });
      
      if (!marketResearchResponse.ok) {
        console.error('Failed to save market research');
      }
      
      const executiveBrief = await getExecutiveBrief(newContentId);
      console.log(executiveBrief);
      
      // Save executive brief to JSON file
      const executiveBriefJson = JSON.stringify(executiveBrief, null, 2);
      const executiveBriefResponse = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contentId: newContentId, 
          content: executiveBriefJson,
          contentType: 'executive-brief'
        }),
      });
      
      if (!executiveBriefResponse.ok) {
        console.error('Failed to save executive brief');
      }
      
      const gtmPlan = await getGTMPlan(newContentId);
      console.log(gtmPlan);
      
      // Save GTM plan to JSON file
      const gtmPlanJson = JSON.stringify(gtmPlan, null, 2);
      const gtmPlanResponse = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contentId: newContentId, 
          content: gtmPlanJson,
          contentType: 'gtm-plan'
        }),
      });
      
      if (!gtmPlanResponse.ok) {
        console.error('Failed to save GTM plan');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <LoadingModal isOpen={isLoading} message={loadingMessage} />
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl pb-2 font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Ready when you are.
          </h1>
          <p className="text-lg text-muted-foreground">
            Ask anything about your market data and get instant insights.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything"
              className="w-full px-6 py-8 text-xl rounded-full hover:border-primary/30 focus:border-primary/50 transition-all duration-300 pr-16 placeholder:text-muted-foreground/50"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full"
            >
              <SendHorizontal className="w-6 h-6" />
              <span className="sr-only">Submit</span>
            </Button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-1">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(example);
                // Set content_id when clicking an example query
                setContentId(`example-${index + 1}`);
              }}
              className="text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg border border-border/40 hover:border-border bg-background/50 hover:bg-background/80 transition-all duration-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 