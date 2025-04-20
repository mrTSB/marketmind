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
import { QuickLoadingModal } from "@/components/QuickLoadingModal"
import { Skeleton } from "@/components/ui/skeleton"
export default function MarketResearchPage() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;

  const [marketResearch, setMarketResearch] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadMarketResearch = async () => {
    if (!contentId) return;

    if (!contentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${contentId}&contentType=market-research`);
      if (!response.ok) {
        throw new Error('Failed to load market research');
      }
      const data = await response.json();
      console.log(data);
      setMarketResearch(data);
    } catch (error) {
      console.error('Error loading market research:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMarketResearch();
  }, [contentId]);

  console.log(marketResearch);

  if (!marketResearch) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-6 w-full" />

        <div className="grid grid-cols-1 gap-8">
          {/* Market Overview Section */}
          <section>
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-[200px] w-full" />
          </section>
          
          {/* Market Analysis Section */}
          <section>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </section>
          
          {/* Competitive Analysis Section */}
          <section>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[400px] w-full" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          </section>
          
          {/* Market Challenges Section */}
          <section>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </section>
        </div>
      </div>
    );
  }

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
          <MarketSize {...marketResearch.market_size} />
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