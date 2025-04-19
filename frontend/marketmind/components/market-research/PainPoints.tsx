import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertCircle, 
  Target, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react"

interface PainPoint {
  description: string
  severity: "low" | "medium" | "high"
  impact: string
  affected_users: string[]
  potential_solutions: string[]
}

interface PainPointsProps {
  pain_points: PainPoint[]
  market_impact: string
  opportunity_size: string
  priority_level: "low" | "medium" | "high"
}

export function PainPoints({
  pain_points,
  market_impact,
  opportunity_size,
  priority_level,
}: PainPointsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <AlertCircle className="h-4 w-4" />
      case "low":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Customer Pain Points
        </CardTitle>
        <CardDescription>
          Key challenges and opportunities in the market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Target className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Market Impact</p>
              <p className="text-sm text-muted-foreground">{market_impact}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Opportunity Size</p>
              <p className="text-sm text-muted-foreground">{opportunity_size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
            <AlertCircle className={`h-5 w-5 ${getSeverityColor(priority_level)}`} />
            <div>
              <p className="text-sm font-medium">Priority Level</p>
              <p className="text-sm text-muted-foreground capitalize">{priority_level}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {pain_points.map((point, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-2">
                <div className="flex-1 flex-row">
                  <CardTitle className="text-base">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(point.severity)}
                      Pain Point {index + 1}
                    </div>
                  </CardTitle>
                  <CardDescription className="mt-2 space-y-3">
                    <p className="text-sm">{point.description}</p>
                    
                    <div className="bg-amber-50 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <p className="font-medium text-sm">Impact:</p>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{point.impact}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <p className="font-medium text-sm">Affected Users:</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-6">
                        {point.affected_users.map((user, idx) => (
                          <Badge key={idx} variant="secondary" className="text-sm">
                            {user}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">Potential Solutions:</p>
                      </div>
                      <ul className="list-none space-y-1 pl-6">
                        {point.potential_solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="h-3.5 w-3.5 text-green-500 mt-0.5" />
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 