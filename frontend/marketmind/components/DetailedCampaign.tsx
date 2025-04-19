"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Target, Users, MessageSquare, BarChart3, Building2, Lightbulb, Radio, DollarSign, Calendar, LineChart, Search, AlertTriangle, Trophy } from "lucide-react"
import Image from "next/image"

interface DetailedCampaign {
  name: string
  image_url: string
  slogan: string
  concept: string
  target_audience: string
  key_message: string
  campaign_objectives: string[]
  brand_positioning: string
  creative_strategy: string
  media_channels: string[]
  budget_allocation: string
  timeline: string
  key_performance_indicators: string[]
  competitive_analysis: string
  risk_assessment: string
  success_metrics: string[]
}

interface DetailedCampaignProps {
  campaign: DetailedCampaign
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetailedCampaign({ campaign, open, onOpenChange }: DetailedCampaignProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[80vw] max-h-[90vh] overflow-y-auto">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-4 pb-8">
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{campaign.name}</CardTitle>
              <CardDescription className="text-xl italic text-muted-foreground">{campaign.slogan}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={campaign.image_url}
                    alt={campaign.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Campaign Overview Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold border-b pb-2">Campaign Overview</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <h3 className="font-semibold text-lg">Concept</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.concept}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold text-lg">Target Audience</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.target_audience}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold text-lg">Key Message</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.key_message}</p>
                    </div>
                  </div>
                </div>

                {/* Strategy Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold border-b pb-2">Strategy & Objectives</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-lg">Campaign Objectives</h3>
                      </div>
                      <ul className="list-disc list-inside text-muted-foreground pl-7 space-y-1">
                        {campaign.campaign_objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-purple-500" />
                        <h3 className="font-semibold text-lg">Brand Positioning</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.brand_positioning}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <h3 className="font-semibold text-lg">Creative Strategy</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.creative_strategy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Execution Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold border-b pb-2">Execution Plan</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Radio className="h-5 w-5 text-indigo-500" />
                        <h3 className="font-semibold text-lg">Media Channels</h3>
                      </div>
                      <ul className="list-disc list-inside text-muted-foreground pl-7 space-y-1">
                        {campaign.media_channels.map((channel, index) => (
                          <li key={index}>{channel}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <h3 className="font-semibold text-lg">Budget Allocation</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.budget_allocation}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-cyan-500" />
                        <h3 className="font-semibold text-lg">Timeline</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.timeline}</p>
                    </div>
                  </div>
                </div>

                {/* Analysis & Metrics Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold border-b pb-2">Analysis & Metrics</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-orange-500" />
                        <h3 className="font-semibold text-lg">Key Performance Indicators</h3>
                      </div>
                      <ul className="list-disc list-inside text-muted-foreground pl-7 space-y-1">
                        {campaign.key_performance_indicators.map((kpi, index) => (
                          <li key={index}>{kpi}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-teal-500" />
                        <h3 className="font-semibold text-lg">Competitive Analysis</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.competitive_analysis}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold text-lg">Risk Assessment</h3>
                      </div>
                      <p className="text-muted-foreground pl-7">{campaign.risk_assessment}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-rose-500" />
                        <h3 className="font-semibold text-lg">Success Metrics</h3>
                      </div>
                      <ul className="list-disc list-inside text-muted-foreground pl-7 space-y-1">
                        {campaign.success_metrics.map((metric, index) => (
                          <li key={index}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
} 