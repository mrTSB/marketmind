import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
  const yearsDiff = projection_year - year
  const valueDiff = projected_value - total_market_value
  const progressValue = (total_market_value / projected_value) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Market Size</CardTitle>
        <CardDescription>
          Current market value and projections from {year} to {projection_year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Current Market Value ({year})</h3>
              <p className="text-3xl font-bold">
                {total_market_value.toLocaleString()} {unit}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Growth Rate</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-green-600">
                  {growth_rate > 0 ? "+" : ""}{growth_rate}%
                </p>
                <p className="text-sm text-muted-foreground">CAGR</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Projected Value ({projection_year})</h3>
              <p className="text-3xl font-bold">
                {projected_value.toLocaleString()} {unit}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Growth Over {yearsDiff} Years</h3>
              <p className="text-2xl font-bold text-green-600">
                {valueDiff.toLocaleString()} {unit}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Market Growth Trajectory</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{year}: {total_market_value.toLocaleString()} {unit}</span>
              <span>{projection_year}: {projected_value.toLocaleString()} {unit}</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 