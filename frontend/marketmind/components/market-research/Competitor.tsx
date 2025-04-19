import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Target, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Users, 
  Activity,
  TrendingUp,
  TrendingDown,
  Shield,
  AlertTriangle
} from "lucide-react"

interface CompetitorProps {
  name: string
  description: string
  market_share: number
  strengths: string[]
  weaknesses: string[]
  pricing_strategy: string
  target_audience: string
  status: "active" | "inactive" | "acquired"
}

export function Competitor({
  name,
  description,
  market_share,
  strengths,
  weaknesses,
  pricing_strategy,
  target_audience,
  status,
}: CompetitorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "inactive":
        return "text-red-500"
      case "acquired":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4" />
      case "inactive":
        return <AlertTriangle className="h-4 w-4" />
      case "acquired":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              {name}
            </CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`flex items-center gap-1 ${getStatusColor(status)}`}
          >
            {getStatusIcon(status)}
            <span className="capitalize">{status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-purple-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">Market Share</p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full" 
                  style={{ width: `${market_share}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{market_share}%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Strengths</h3>
            </div>
            <ul className="space-y-1">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500 mt-0.5" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <h3 className="font-medium">Weaknesses</h3>
            </div>
            <ul className="space-y-1">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <TrendingDown className="h-3.5 w-3.5 text-red-500 mt-0.5" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Pricing Strategy</p>
              <p className="text-sm text-muted-foreground">{pricing_strategy}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Target Audience</p>
              <p className="text-sm text-muted-foreground">{target_audience}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 