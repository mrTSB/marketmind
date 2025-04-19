import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface PersonaProps {
  name: string
  age: number
  occupation: string
  income_level: string
  interests: string[]
  pain_points: string[]
  goals: string[]
  preferred_channels: string[]
  buying_behavior: string
  brand_preferences: string[]
  chat_system_prompt: string
}

export function Persona({
  name,
  age,
  occupation,
  income_level,
  interests,
  pain_points,
  goals,
  preferred_channels,
  buying_behavior,
  brand_preferences,
  chat_system_prompt,
}: PersonaProps) {
  return (
    <Card className="w-full h-min">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="persona-details">
          <AccordionTrigger className="px-6 py-2  cursor-pointer hover:no-underline">
            <div className="flex flex-col items-start">
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription>
                {age} years old • {occupation} • {income_level}
              </CardDescription>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pain Points</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {pain_points.map((point) => (
                        <li key={point} className="text-sm text-muted-foreground">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Goals</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {goals.map((goal) => (
                        <li key={goal} className="text-sm text-muted-foreground">
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Preferred Channels</h3>
                    <div className="flex flex-wrap gap-2">
                      {preferred_channels.map((channel) => (
                        <Badge key={channel} variant="outline">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Buying Behavior</h3>
                    <p className="text-sm text-muted-foreground">{buying_behavior}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Brand Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand_preferences.map((brand) => (
                        <Badge key={brand} variant="secondary">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
} 