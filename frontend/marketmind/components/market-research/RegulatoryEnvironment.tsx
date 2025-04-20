import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Shield, 
  AlertCircle,
  FileText,
  Building,
  ArrowRight
} from "lucide-react"

interface RegulatoryEnvironmentProps {
  current_regulations: string[]
  pending_regulations: string[]
  compliance_requirements: string[]
  regulatory_bodies: string[]
  potential_risks: string[]
}

export function RegulatoryEnvironment({
  current_regulations,
  pending_regulations,
  compliance_requirements,
  regulatory_bodies,
  potential_risks,
}: RegulatoryEnvironmentProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-500" />
          Regulatory Environment
        </CardTitle>
        <CardDescription>
          Current and pending regulations affecting the market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <h3 className="font-medium">Current Regulations</h3>
              </div>
              <div className="space-y-2 pl-6">
                {current_regulations.map((regulation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FileText className="h-3.5 w-3.5 text-green-500 mt-0.5" />
                    <span className="text-sm">{regulation}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <h3 className="font-medium">Pending Regulations</h3>
              </div>
              <div className="space-y-2 pl-6">
                {pending_regulations.map((regulation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                    <span className="text-sm">{regulation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">Compliance Requirements</h3>
              </div>
              <div className="space-y-2 pl-6">
                {compliance_requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-blue-500 mt-0.5" />
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-8 w-4 text-purple-500" />
                <h3 className="font-medium">Regulatory Bodies</h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-6 max-h-48 overflow-y-auto">
                {regulatory_bodies.map((body, index) => (
                  <Badge key={index} variant="outline" className="text-sm whitespace-normal">
                    {body}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-500/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <h3 className="font-medium">Potential Risks</h3>
          </div>
          <div className="space-y-2 pl-6">
            {potential_risks.map((risk, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-500 mt-0.5" />
                <span className="text-sm">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 