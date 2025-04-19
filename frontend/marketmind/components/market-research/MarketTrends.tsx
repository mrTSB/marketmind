import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Rocket, TrendingDown, Cpu, Users } from "lucide-react"

interface MarketTrendsProps {
  current_trends: string[]
  emerging_trends: string[]
  declining_trends: string[]
  technology_impact: string[]
  social_impact: string[]
}

export function MarketTrends({
  current_trends,
  emerging_trends,
  declining_trends,
  technology_impact,
  social_impact,
}: MarketTrendsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>
          Current, emerging, and declining trends in the market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium">Current Trends</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {current_trends.map((trend, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Emerging Trends</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {emerging_trends.map((trend, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <h3 className="font-medium">Declining Trends</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {declining_trends.map((trend, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium">Technology Impact</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technology_impact.map((trend, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">Social Impact</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {social_impact.map((trend, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 