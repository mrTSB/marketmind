"use client"

import { Campaign } from "@/components/Campaign"
import { CampaignList } from "@/components/CampaignList"
import { QuickLoadingModal } from "@/components/QuickLoadingModal"
import { useContext, useEffect, useState } from "react"
import { ContentIdContext } from "../providers/content_id_provider"

export default function CampaignsPage() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;
  const [campaigns, setCampaigns] = useState([
    {
      name: "Summer Refresh",
      image_url: "https://images.unsplash.com/photo-1586902197503-e71026292412?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slogan: "Stay Cool, Stay Fresh",
      concept: "A summer campaign focusing on refreshing beverages",
      target_audience: "Young adults, 18-35",
      key_message: "Beat the heat with our refreshing drinks"
    },
    {
      name: "Winter Warmth",
      image_url: "https://images.unsplash.com/photo-1420585269105-d908ec316eb3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slogan: "Cozy Up This Winter",
      concept: "Winter collection featuring warm clothing",
      target_audience: "Fashion-conscious adults, 25-45",
      key_message: "Stay stylish and warm this winter"
    },
    {
      name: "Spring Bloom",
      image_url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slogan: "Fresh Start, Fresh Look",
      concept: "Spring fashion and lifestyle campaign",
      target_audience: "Fashion-forward millennials, 22-38",
      key_message: "Embrace the season of renewal"
    },
    {
      name: "Back to School",
      image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slogan: "Learn, Grow, Succeed",
      concept: "Educational supplies and student essentials",
      target_audience: "Students and parents, 16-45",
      key_message: "Equip yourself for academic excellence"
    },
    {
      name: "Holiday Magic",
      image_url: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slogan: "Make Memories Last",
      concept: "Holiday gift guide and special promotions",
      target_audience: "Gift shoppers, 25-55",
      key_message: "Create unforgettable moments this holiday season"
    }
  ])
  const [isLoading, setIsLoading] = useState(true)

  const loadCampaigns = async () => {
    if (!contentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${contentId}&contentType=campaigns`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to load campaigns');
      }
      const data = await response.json();
      console.log(data.campaigns);
      setCampaigns(data.campaigns);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);
      
  
  if (isLoading) {
    return <QuickLoadingModal message="Loading campaigns..." />;
  }

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Our Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <Campaign key={index} campaign={campaign} />
        ))}
      </div>
    </main>
  )
} 