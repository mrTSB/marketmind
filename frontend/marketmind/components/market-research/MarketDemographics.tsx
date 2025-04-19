import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, GraduationCap, Brain, DollarSign } from "lucide-react"

interface MarketDemographicsProps {
  age_groups: string[]
  income_levels: string[]
  geographic_regions: string[]
  education_levels: string[]
  key_psychographics: string[]
}

export function MarketDemographics({
  age_groups,
  income_levels,
  geographic_regions,
  education_levels,
  key_psychographics,
}: MarketDemographicsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Market Demographics
          </div>
        </CardTitle>
        <CardDescription>
          Key demographic segments in the market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium">Age Groups</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {age_groups.map((group, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Income Levels</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {income_levels.map((level, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {level}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <h3 className="font-medium">Geographic Regions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {geographic_regions.map((region, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {region}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium">Education Levels</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {education_levels.map((level, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {level}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">Key Psychographics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {key_psychographics.map((trait, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 