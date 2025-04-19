import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

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
        <CardTitle>Regulatory Environment</CardTitle>
        <CardDescription>
          Current and pending regulations, compliance requirements, and potential risks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Current Regulations</h3>
              <ul className="list-disc list-inside space-y-1">
                {current_regulations.map((regulation, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {regulation}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Compliance Requirements</h3>
              <ul className="list-disc list-inside space-y-1">
                {compliance_requirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Pending Regulations</h3>
              <ul className="list-disc list-inside space-y-1">
                {pending_regulations.map((regulation, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {regulation}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Regulatory Bodies</h3>
              <div className="flex flex-wrap gap-2">
                {regulatory_bodies.map((body, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {body}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {potential_risks.length > 0 && (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Potential Regulatory Risks</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {potential_risks.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
} 