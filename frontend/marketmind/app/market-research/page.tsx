"use client"

import { MarketSize } from "@/components/market-research/MarketSize"
import { MarketDemographics } from "@/components/market-research/MarketDemographics"
import { MarketTrends } from "@/components/market-research/MarketTrends"
import { Competitor } from "@/components/market-research/Competitor"
import { PainPoints } from "@/components/market-research/PainPoints"
import { RegulatoryEnvironment } from "@/components/market-research/RegulatoryEnvironment"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, TrendingUp, Users, Target, AlertTriangle, Scale, FileText } from "lucide-react"
import { ContentIdContext } from "../providers/content_id_provider"
import { useContext, useEffect, useState } from "react"

// Sample data - in a real app, this would come from an API or database
const marketData = {
  title: "Consumer Health and Wellness App Market",
  summary: "The market research indicates a rapidly growing sector with significant opportunities for innovation. Key trends include digital transformation and sustainability, while regulatory compliance remains a critical consideration. The competitive landscape shows both established players and emerging startups, creating a dynamic market environment.",
  marketSize: {
    total_market_value: 5000000000,
    unit: "USD",
    year: 2023,
    growth_rate: 12.5,
    projected_value: 8000000000,
    projection_year: 2025
  },
  demographics: {
    age_groups: ["18-24", "25-34", "35-44", "45-54", "55+"],
    income_levels: ["$30k-$50k", "$50k-$75k", "$75k-$100k", "$100k+"],
    geographic_regions: ["North America", "Europe", "Asia Pacific", "Latin America"],
    education_levels: ["High School", "Bachelor's", "Master's", "PhD"],
    key_psychographics: ["Tech-savvy", "Health-conscious", "Environmentally aware", "Value-driven"]
  },
  trends: {
    current_trends: ["Remote work", "Digital transformation", "Sustainability", "AI integration"],
    emerging_trends: ["Web3", "Metaverse", "Quantum computing", "Green tech"],
    declining_trends: ["Traditional retail", "Fossil fuels", "Manual processes"],
    technology_impact: ["Cloud computing", "5G networks", "IoT", "Blockchain"],
    social_impact: ["Work-life balance", "Mental health awareness", "Social responsibility"]
  },
  competitors: [
    {
      name: "TechCorp Solutions",
      description: "Leading provider of enterprise software solutions",
      market_share: 35,
      strengths: ["Strong brand", "Large customer base", "Innovative R&D"],
      weaknesses: ["High pricing", "Complex UI", "Limited customization"],
      pricing_strategy: "Premium pricing with enterprise licensing",
      target_audience: "Large enterprises",
      status: "active"
    },
    {
      name: "StartupX",
      description: "Agile startup disrupting the market",
      market_share: 5,
      strengths: ["Innovative approach", "Agile development", "Competitive pricing"],
      weaknesses: ["Limited resources", "Small team", "Unproven track record"],
      pricing_strategy: "Freemium model with premium features",
      target_audience: "SMBs and startups",
      status: "active"
    }
  ],
  painPoints: {
    pain_points: [
      {
        description: "Complex integration with existing systems",
        severity: "high" as const,
        impact: "Significant delays in implementation and increased costs",
        affected_users: ["IT teams", "System administrators", "End users"],
        potential_solutions: ["API-first approach", "Pre-built connectors", "Simplified integration"]
      },
      {
        description: "Limited customization options",
        severity: "medium" as const,
        impact: "Reduced user satisfaction and adoption rates",
        affected_users: ["Business users", "Administrators"],
        potential_solutions: ["Customizable dashboards", "White-label solutions", "Extensible architecture"]
      }
    ],
    market_impact: "High impact on enterprise adoption and market penetration",
    opportunity_size: "$2.5B in potential revenue by 2025",
    priority_level: "high" as const
  },
  regulatory: {
    current_regulations: ["GDPR", "CCPA", "SOC 2"],
    pending_regulations: ["AI Ethics Framework", "Data Localization Laws"],
    compliance_requirements: ["Data encryption", "Access controls", "Audit trails"],
    regulatory_bodies: ["EU Commission", "FTC", "SEC"],
    potential_risks: ["Data privacy violations", "Non-compliance penalties", "Reputation damage"]
  }
}

export default function MarketResearchPage() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  const [marketResearch, setMarketResearch] = useState(marketData)

  const loadPersonas = async () => {
    const memeContentId = "abc";

    if (!memeContentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${memeContentId}&contentType=market-research`);
      if (!response.ok) {
        throw new Error('Failed to load market research');
      }
      const data = await response.json();
      console.log(data);
      setMarketResearch(data);
    } catch (error) {
      console.error('Error loading market research:', error);
    }
  };

  useEffect(() => {
    loadPersonas();
  }, []);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{marketResearch.title}</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <p className="text-xl text-muted-foreground">
        {marketResearch.summary}
      </p>

      <div className="grid grid-cols-1 gap-8">
        {/* Market Overview Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
          <MarketSize {...marketResearch.marketSize} />
        </section>
        
        {/* Market Analysis Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Market Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MarketDemographics {...marketResearch.demographics} />
            <MarketTrends {...marketResearch.trends} />
          </div>
        </section>
        
        {/* Competitive Analysis Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Competitive Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketResearch.competitors.map((competitor, index) => (
              <Competitor key={index} {...competitor} />
            ))}
          </div>
        </section>
        
        {/* Market Challenges Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Market Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PainPoints
              pain_points={marketResearch?.painPoints?.pain_points ?? []}
              market_impact={marketResearch?.painPoints?.market_impact ?? "No market impact data available"}
              opportunity_size={marketResearch?.painPoints?.opportunity_size ?? "No opportunity size data available"}
              priority_level={marketResearch?.painPoints?.priority_level ?? "medium"}
            />
            <RegulatoryEnvironment
              current_regulations={marketResearch?.regulatory?.current_regulations ?? []}
              pending_regulations={marketResearch?.regulatory?.pending_regulations ?? []}
              compliance_requirements={marketResearch?.regulatory?.compliance_requirements ?? []}
              regulatory_bodies={marketResearch?.regulatory?.regulatory_bodies ?? []}
              potential_risks={marketResearch?.regulatory?.potential_risks ?? []}
            />
          </div>
        </section>
      </div>
    </div>
  )
} 