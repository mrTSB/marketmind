import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Target, 
  BarChart3, 
  Users, 
  DollarSign, 
  Rocket, 
  Calendar, 
  LineChart, 
  AlertTriangle, 
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react"

interface GTMPlanProps {
  executive_summary: string
  market_analysis: string
  value_proposition: string
  competitive_strategy: string
  marketing_strategy: string
  marketing_channels: string[]
  sales_and_pricing: string
  launch_plan: string
  timeline: string[]
  metrics_and_goals: string[]
  risk_and_resources: string
  growth_strategy: string
}

export function GTMPlan({
  executive_summary,
  market_analysis,
  value_proposition,
  competitive_strategy,
  marketing_strategy,
  marketing_channels,
  sales_and_pricing,
  launch_plan,
  timeline,
  metrics_and_goals,
  risk_and_resources,
  growth_strategy,
}: GTMPlanProps) {
  return (
    <div className="space-y-10">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Executive Summary
          </CardTitle>
          <CardDescription>
            Overview of the go-to-market strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{executive_summary}</p>
        </CardContent>
      </Card>

      {/* Timeline & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <LineChart className="h-5 w-5 text-green-500" />
            Metrics & Goals
          </h2>
          <Card>
            <CardContent className="">
              <div className="space-y-3">
                {metrics_and_goals.map((metric, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{metric}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Timeline
          </h2>
          <Card>
            <CardContent className="relative">
              <div className="absolute left-8.5 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800" />
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 relative">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center ring-4 ring-white dark:ring-gray-950">
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">{index + 1}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Market Analysis Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          Market Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Market Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{market_analysis}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Value Proposition</h3>
            <p className="text-muted-foreground leading-relaxed">{value_proposition}</p>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Target className="h-5 w-5 text-green-500" />
          Strategy
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Competitive Strategy</h3>
            <p className="text-muted-foreground leading-relaxed">{competitive_strategy}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Marketing Strategy</h3>
            <p className="text-muted-foreground leading-relaxed">{marketing_strategy}</p>
          </div>
        </div>
      </section>

      {/* Marketing Channels */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Marketing Channels
        </h2>
        <div className="space-y-2">
          {marketing_channels.map((channel, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm"
            >
              <ArrowRight className="h-4 w-4 text-blue-500" />
              {channel}
            </div>
          ))}
        </div>
      </section>

      {/* Sales & Launch Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Sales & Launch
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Sales & Pricing</h3>
            <p className="text-muted-foreground leading-relaxed">{sales_and_pricing}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Launch Plan</h3>
            <p className="text-muted-foreground leading-relaxed">{launch_plan}</p>
          </div>
        </div>
      </section>

      

      {/* Growth & Risks Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Growth & Risks
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Growth Strategy</h3>
            <p className="text-muted-foreground leading-relaxed">{growth_strategy}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Risks & Resources</h3>
            <p className="text-muted-foreground leading-relaxed">{risk_and_resources}</p>
          </div>
        </div>
      </section>
    </div>
  )
} 