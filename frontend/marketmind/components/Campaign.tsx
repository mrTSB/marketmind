"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import { DetailedCampaign } from "./DetailedCampaign"

interface Campaign {
  name: string
  image_url: string
  slogan: string
  concept: string
  target_audience: string
  key_message: string
}

interface CampaignProps {
  campaign: Campaign
}

export function Campaign({ campaign }: CampaignProps) {
  const [showDetailed, setShowDetailed] = useState(false)

  // Generate detailed campaign data based on basic campaign info
  const detailedCampaign = {
    ...campaign,
    campaign_objectives: [
      `Increase brand awareness for ${campaign.name} by 25%`,
      `Drive 10,000 new user signups from ${campaign.target_audience}`,
      `Achieve 15% conversion rate through ${campaign.key_message} messaging`
    ],
    brand_positioning: `Premium, innovative, and user-friendly solution for ${campaign.target_audience}`,
    creative_strategy: `Focus on ${campaign.concept} through emotional storytelling and user testimonials`,
    media_channels: ["Social Media", "Content Marketing", "Email Campaigns", "Influencer Partnerships"],
    budget_allocation: "$50,000 total - 40% Social Media, 30% Content, 20% Email, 10% Influencer",
    timeline: "Q2 2024 - 3 months campaign duration",
    key_performance_indicators: [
      "Social Media Engagement Rate",
      "Website Traffic",
      "Conversion Rate",
      "Customer Acquisition Cost"
    ],
    competitive_analysis: `Leading competitor has 35% market share, focusing on ${campaign.target_audience}`,
    risk_assessment: `Market saturation and changing consumer preferences in ${campaign.target_audience} segment pose potential risks`,
    success_metrics: [
      "20% increase in brand mentions",
      "15% growth in organic traffic",
      "10% improvement in conversion rate"
    ]
  }

  return (
    <>
      <Card 
        className="w-full max-w-2xl mx-auto cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowDetailed(true)}
      >
        <CardHeader>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={campaign.image_url}
              alt={campaign.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <CardTitle className="text-2xl font-bold">{campaign.name}</CardTitle>
          <CardDescription className="text-lg italic">{campaign.slogan}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Concept</h3>
            <p className="text-muted-foreground">{campaign.concept}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Target Audience</h3>
            <p className="text-muted-foreground">{campaign.target_audience}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Key Message</h3>
            <p className="text-muted-foreground">{campaign.key_message}</p>
          </div>
        </CardContent>
      </Card>
      <DetailedCampaign 
        campaign={detailedCampaign} 
        open={showDetailed} 
        onOpenChange={setShowDetailed} 
      />
    </>
  )
} 