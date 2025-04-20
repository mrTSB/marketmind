'use client';

import Link from 'next/link';
import { Users, Search, Rocket, FileText, Megaphone, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const contentId = localStorage.getItem('contentId');
    if (!contentId) {
      router.push('/generate');
    }
  }, [router]);

  const navigationItems = [
    {
      title: 'Personas',
      description: 'Define and manage your target audience personas',
      icon: Users,
      href: '/personas',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Market Research',
      description: 'Analyze market trends and competitor insights',
      icon: Search,
      href: '/market-research',
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Go-to-Market',
      description: 'Plan and execute your GTM strategy',
      icon: Rocket,
      href: '/gtm',
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Executive Brief',
      description: 'Generate comprehensive executive reports',
      icon: FileText,
      href: '/executive-brief',
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      title: 'Campaigns',
      description: 'Create and manage marketing campaigns',
      icon: Megaphone,
      href: '/campaigns',
      color: 'bg-red-500/10 text-red-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome to MarketMind</h1>
          <p className="text-muted-foreground text-lg">
            Your all-in-one platform for market intelligence and strategy
          </p>
        </div>
        <Button 
          onClick={() => router.push('/generate')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Generate New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="group transition-all hover:shadow-lg h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to show</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Active Personas</p>
                  <p className="text-2xl font-bold">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Campaigns</p>
                  <p className="text-2xl font-bold">0</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 