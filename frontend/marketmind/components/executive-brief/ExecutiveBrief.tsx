import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2,
  Calendar,
  ArrowRight,
  ThumbsUp,
  ArrowUpRight
} from "lucide-react"

interface ExecutiveBriefProps {
  title: string
  executive_summary: string
  business_opportunity: string
  investment_required: string
  expected_roi: string
  key_risks: string[]
  key_benefits: string[]
  timeline_highlights: string[]
  recommendation: string
  next_steps: string[]
}

export function ExecutiveBrief({
  title,
  executive_summary,
  business_opportunity,
  investment_required,
  expected_roi,
  key_risks,
  key_benefits,
  timeline_highlights,
  recommendation,
  next_steps,
}: ExecutiveBriefProps) {
  return (
    <div className="space-y-10">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{executive_summary}</p>
        </CardContent>
      </Card>

      {/* Business Opportunity & Investment */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Business Opportunity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Opportunity Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{business_opportunity}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Investment Required</h3>
            <p className="text-muted-foreground leading-relaxed">{investment_required}</p>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Expected Return on Investment
        </h2>
        <p className="text-muted-foreground leading-relaxed">{expected_roi}</p>
      </section>

      {/* Risks & Benefits */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Benefits & Risks Analysis
        </h2>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Key Benefits
                </h3>
                <div className="space-y-3">
                  {key_benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Key Risks
                </h3>
                <div className="space-y-3">
                  {key_risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Timeline Highlights */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          Timeline
        </h2>
        <Card>
          <CardContent className="relative">
            <div className="absolute left-8.5 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800" />
            <div className="space-y-3">
              {timeline_highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 relative">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center ring-4 ring-white dark:ring-gray-950">
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">{index + 1}</span>
                    </div>
                  <span className="text-sm leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recommendation */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-blue-500" />
              Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{recommendation}</p>
          </CardContent>
        </Card>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <ArrowUpRight className="h-5 w-5 text-green-500" />
          Next Steps
        </h2>
        <div className="space-y-2">
          {next_steps.map((step, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm"
            >
              <ArrowRight className="h-4 w-4 text-green-500" />
              {step}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 