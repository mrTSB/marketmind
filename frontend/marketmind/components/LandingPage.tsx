"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Star, 
  Zap, 
  Shield, 
  Sparkles, 
  BarChart3, 
  Brain, 
  Target,
  ArrowRight,
  Check,
  Laptop,
  Users,
  Lightbulb,
  Twitter,
  Linkedin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Typewriter from "@/fancy/components/text/typewriter";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "MarketMind has revolutionized our development workflow. The components are incredibly well-designed.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "The attention to detail in each component is outstanding. This is a game-changer for our team.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "Finally, a component library that prioritizes both aesthetics and functionality. Absolutely love it!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "The documentation is crystal clear and the components are a joy to work with. Highly recommended!",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "MarketMind has cut our development time in half. The components are intuitive and beautifully crafted.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "This is exactly what we've been looking for. The quality and flexibility of the components is unmatched.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-600 dark:text-white/70">{body}</blockquote>
    </figure>
  );
};

const integrations = [
  "hubspot.svg",
  "salesforce.svg",
  "slack.svg",
  "notion.svg",
  "google.svg",
  "microsoft.svg",
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for side projects and small teams",
    features: [
      "Up to 5 team members",
      "Basic analytics",
      "24/7 support",
      "1 market research per month",
      "Basic templates"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "Everything you need for a growing business",
    features: [
      "Unlimited team members",
      "Advanced analytics",
      "Priority support",
      "10 market research per month",
      "Custom templates",
      "API access",
      "Custom integrations"
    ],
    cta: "Start Free Trial",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "Custom features",
      "SLA guarantee",
      "Advanced security",
      "Custom training"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const FloatingShape = ({ className, delay = 0 }: { className?: string; delay?: number }) => {
  return (
    <motion.div
      className={cn(
        "absolute w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70",
        className
      )}
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{
        scale: [0.8, 1, 0.8],
        opacity: [0.5, 0.8, 0.5],
        y: [0, -50, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    console.log("Email submitted:", email);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden w-full h-full">
            <FloatingShape 
              className="bg-blue-300/90 left-[-20%] top-[10%] scale-125" 
              delay={0}
            />
            <FloatingShape 
              className="bg-purple-300/90 right-[-10%] top-[20%] scale-125" 
              delay={2} 
            />
            <FloatingShape 
              className="bg-orange-300/90 left-[40%] top-[60%] scale-125" 
              delay={4} 
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
        </div>
        {/* Hero Section */}
        <div className="relative max-w-4xl mx-auto text-center space-y-8 pt-32 overflow-hidden">
          {/* Rest of the hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="outline" className="px-4 py-1 mb-4">
              <Star className="h-3.5 w-3.5 mr-1" />
              <span>Trusted by 10,000+ companies worldwide</span>
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your ideas into{" "}
            <Typewriter
              text={[
                "market success",
                "customer insights",
                "growth strategies",
                "winning products",
                "business opportunities",
              ]}
              speed={70}
              className="text-blue-600"
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            MarketMind combines AI-powered market research, competitive analysis, and strategic planning
            to help you make data-driven decisions and stay ahead of the competition.
          </motion.p>

          <motion.div 
            className="flex gap-x-4 max-w-md mx-auto mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Input
              type="email"
              placeholder="Enter your work email"
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Free Trial
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">50M+</h3>
              <p className="text-gray-600">Data Points Analyzed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">99%</h3>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </motion.div>
        </div>

        {/* Integrations */}
        <div className="py-24 text-center">
          <p className="text-sm font-medium text-gray-500 mb-8">TRUSTED BY TEAMS AT</p>
          <div className="flex justify-center items-center gap-x-12 grayscale opacity-70">
            {integrations.map((logo, index) => (
              <Image
                key={index}
                src={`/logos/${logo}`}
                alt="Integration Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div id="how-it-works" className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How MarketMind Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get from idea to execution in three simple steps. Our AI-powered platform
              handles the complex analysis while you focus on making strategic decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Input Your Idea</h3>
              <p className="text-gray-600">
                Share your business concept or challenge, and our AI will analyze market
                opportunities and potential risks.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Get Deep Insights</h3>
              <p className="text-gray-600">
                Receive comprehensive market analysis, competitor insights, and
                actionable recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Execute with Confidence</h3>
              <p className="text-gray-600">
                Use our strategic recommendations and templates to implement your
                plan effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">AI-Powered Research</h3>
                <p className="text-gray-600">
                  Our advanced AI analyzes millions of data points to provide you with
                  accurate market insights and predictions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Competitor Analysis</h3>
                <p className="text-gray-600">
                  Stay ahead with real-time competitor tracking and detailed analysis
                  of their strategies and market position.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-purple-100 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Strategic Planning</h3>
                <p className="text-gray-600">
                  Transform insights into action with our customizable strategic
                  planning tools and templates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Marquee */}
        <div className="py-24">
          <h2 className="text-3xl font-bold text-center mb-12">Loved by Teams Worldwide</h2>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:40s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>

        {/* Pricing */}
        <div id="pricing" className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={cn(
                "relative",
                plan.highlighted && "border-blue-600 shadow-lg"
              )}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-x-2">
                        <Check className="h-5 w-5 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={cn(
                      "w-full",
                      plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 text-center">
          <Card className="bg-blue-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of successful businesses using MarketMind to drive growth.
              </p>
              <div className="flex justify-center gap-x-4">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Schedule Demo
                </Button>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t py-12 mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Case Studies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Community</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                © 2024 MarketMind. Free and open source forever.
              </p>
              <div className="flex gap-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 