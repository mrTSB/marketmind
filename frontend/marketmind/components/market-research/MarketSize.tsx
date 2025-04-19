import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Target, 
  ArrowUpRight,
  BarChart3,
  LineChart
} from "lucide-react"

interface MarketSizeProps {
  total_market_value: number
  unit: string
  year: number
  growth_rate: number
  projected_value: number
  projection_year: number
}

export function MarketSize({
  total_market_value,
  unit,
  year,
  growth_rate,
  projected_value,
  projection_year,
}: MarketSizeProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B ${unit}`
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M ${unit}`
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K ${unit}`
    } else {
      return `${value} ${unit}`
    }
  }

  const growthColor = growth_rate >= 10 ? "text-green-500" : growth_rate >= 5 ? "text-amber-500" : "text-red-500"
  const growthIcon = growth_rate >= 10 ? "↑" : growth_rate >= 5 ? "→" : "↓"

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Market Size
        </CardTitle>
        <CardDescription>
          Current market value and growth projections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Total Market Value</p>
              <p className="text-2xl font-bold">{formatCurrency(total_market_value)}</p>
              <p className="text-sm text-muted-foreground">As of {year}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Growth Rate</p>
              <p className={`text-2xl font-bold ${growthColor}`}>
                {growth_rate}% {growthIcon}
              </p>
              <p className="text-sm text-muted-foreground">Year over Year</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
            <Target className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium">Projected Value</p>
              <p className="text-2xl font-bold">{formatCurrency(projected_value)}</p>
              <p className="text-sm text-muted-foreground">By {projection_year}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <LineChart className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium">Growth Analysis</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Current Year ({year})</span>
              </div>
              <span className="font-medium">{formatCurrency(total_market_value)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Projected Year ({projection_year})</span>
              </div>
              <span className="font-medium">{formatCurrency(projected_value)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm">Total Growth</span>
              </div>
              <span className={`font-medium ${growthColor}`}>
                {((projected_value - total_market_value) / total_market_value * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 