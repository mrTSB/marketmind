"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState } from "react";
import { Github, Star, Zap, Shield, Sparkles } from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    // Handle email submission here
    console.log("Email submitted:", email);
  };

  return (
    <div className="min-h-screen">
      <AuroraBackground className="min-h-screen absolute top-0 left-0 w-full h-full -z-10"><div></div></AuroraBackground>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mt-8">
          <Badge variant="outline" className="px-4 py-1 mb-4">
            <Star className="h-3.5 w-3.5 mr-1" />
            <span>Now in public beta</span>
          </Badge>
          <h1 className="text-6xl font-bold tracking-tight text-gray-900">
            Give your big idea the design it deserves
          </h1>
          <p className="text-xl text-gray-600 mt-6">
            Professionally designed blocks and templates built with React,
            shadcn/ui and Tailwind that will help your product stand out.
          </p>

          {/* Email Signup */}
          <div className="flex gap-x-4 max-w-md mx-auto mt-10">
            <Input
              type="email"
              placeholder="Email address"
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Get Started
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-gray-600">Components</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="text-gray-600">Downloads</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MarketMind</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-orange-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Built for speed and performance, ensuring your applications run smoothly.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Secure by Default</h3>
                <p className="text-gray-600">Enterprise-grade security features built into every component.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-purple-100 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Beautiful Design</h3>
                <p className="text-gray-600">Professionally crafted components that look great out of the box.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonial */}
        <div id="testimonials" className="py-24">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                {/* <Image
                  src="https://avatars.githubusercontent.com/u/1"
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="rounded-full"
                /> */}
                <blockquote className="mt-6 text-xl font-medium italic text-gray-900">
                  "MarketMind has transformed how we build our products. The components are beautiful and the documentation is excellent."
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-gray-600">Lead Developer @ TechCorp</p>
                </div>
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
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Community</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">License</a></li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-center text-gray-500 mt-8">
            Free and open source forever.
          </p>
        </footer>
      </div>
    </div>
  );
} 