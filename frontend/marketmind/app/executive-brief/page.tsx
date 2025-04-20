"use client"

import { ExecutiveBrief } from "@/components/executive-brief/ExecutiveBrief"
import { useContext, useEffect, useState } from "react";
import { QuickLoadingModal } from "@/components/QuickLoadingModal";
import { ContentIdContext } from "../providers/content_id_provider";

export default function ExecutiveBriefPage() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  // This would typically come from an API or database
  const [executiveBriefData, setExecutiveBriefData] = useState({
    title: "MarketMind AI Platform Investment",
    executive_summary: "This executive brief outlines the opportunity to invest in MarketMind's AI-powered marketing platform, which has demonstrated strong market potential and competitive advantages. The platform offers predictive analytics and automation capabilities that address critical pain points for mid to large-sized enterprises.",
    business_opportunity: "MarketMind's AI platform targets a $5B market with 12.5% annual growth. The solution addresses the challenge enterprises face with fragmented marketing tools and complex data sets. Our platform simplifies predictive insights and automation at scale, offering a unique value proposition in the market.",
    investment_required: "Initial investment of $2.5M is required to accelerate product development, expand marketing efforts, and scale operations. This includes $1M for product enhancements, $800K for marketing and sales, $500K for operations, and $200K for contingency.",
    expected_roi: "Based on conservative projections, we expect to achieve $1M ARR within 12 months and $5M ARR within 24 months. The investment is expected to yield a 3.2x return within 36 months, with a payback period of approximately 18 months.",
    key_risks: [
      "Market adoption speed may be slower than projected",
      "Established competitors may respond with similar offerings",
      "Technical challenges in scaling the AI models",
      "Regulatory changes affecting data usage and AI applications",
      "Economic downturn affecting enterprise technology budgets"
    ],
    key_benefits: [
      "First-mover advantage in AI-powered marketing automation",
      "Proprietary machine learning algorithms",
      "Strong intellectual property portfolio",
      "Experienced team with domain expertise",
      "Strategic partnerships with key industry players"
    ],
    timeline_highlights: [
      "Month 1-2: Product enhancements and beta testing",
      "Month 3-4: Public launch with marketing campaign",
      "Month 5-6: Sales team expansion and partner program",
      "Month 7-9: International market entry",
      "Month 10-12: Series A funding preparation"
    ],
    recommendation: "We strongly recommend proceeding with the investment in MarketMind. The platform addresses a significant market need, has demonstrated technical feasibility, and offers a compelling return on investment. The team's expertise and the company's strategic positioning create a favorable risk-reward profile.",
    next_steps: [
      "Schedule technical deep dive with the engineering team",
      "Conduct customer reference calls",
      "Review detailed financial projections",
      "Finalize investment terms and conditions",
      "Prepare board presentation for approval"
    ]
  });

  const [isLoading, setIsLoading] = useState(true)

  const loadExecutiveBrief = async () => {
    if (!contentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${contentId}&contentType=executive-brief`);
      if (!response.ok) {
        throw new Error('Failed to load executive brief');
      }
      const data = await response.json();
      setExecutiveBriefData(data);
    } catch (error) {
      console.error('Error loading executive brief:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExecutiveBrief();
  }, []);

  if (isLoading) {
    return <QuickLoadingModal message="Loading executive brief..." />;
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{executiveBriefData.title}</h1>
          <p className="text-muted-foreground mt-2">Investment opportunity analysis and recommendation</p>
        </div>
        <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      <ExecutiveBrief {...executiveBriefData} />
    </div>
  )
} 