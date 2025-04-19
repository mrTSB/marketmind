import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Target, Users, DollarSign } from "lucide-react"

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Pain Points</CardTitle>
        <CardDescription>
          Key challenges and opportunities in the market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Market Impact</p>
              <p className="text-sm text-muted-foreground">{market_impact}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Opportunity Size</p>
              <p className="text-sm text-muted-foreground">{opportunity_size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-4 w-4 ${getSeverityColor(priority_level)}`} />
            <div>
              <p className="text-sm font-medium">Priority Level</p>
              <p className="text-sm text-muted-foreground capitalize">{priority_level}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {pain_points.map((point, index) => (
            <Alert key={index} variant="outline">
              <AlertCircle className={`h-4 w-4 ${getSeverityColor(point.severity)}`} />
              <AlertTitle className="ml-2">Pain Point {index + 1}</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>{point.description}</p>
                <div>
                  <p className="font-medium">Impact:</p>
                  <p className="text-sm text-muted-foreground">{point.impact}</p>
                </div>
                <div>
                  <p className="font-medium">Affected Users:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {point.affected_users.map((user, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {user}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Potential Solutions:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    {point.potential_solutions.map((solution, idx) => (
                      <li key={idx}>{solution}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 