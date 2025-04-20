"use client"

import { GTMPlan } from "@/components/gtm/GTMPlan"
import { useEffect, useState } from "react";

export default function GTMPlanPage() {
  // This would typically come from an API or database
  const [gtmPlanData, setGTMPlanData] = useState({
    "title": "FutureProof Marketing Campaign",
    "subtitle": "A six-month campaign to position MarketMind's AI platform as the premier solution for mid to large-sized enterprises seeking to future-proof their marketing strategies.",
    "executive_summary": "FutureProof Marketing is a targeted six-month campaign aimed at positioning MarketMind's AI platform as the premier solution for mid to large-sized enterprises seeking to future-proof their marketing strategies. The campaign focuses on increasing brand awareness by 40%, generating 150 qualified leads, and converting 25% of those leads into trial users by leveraging a mix of digital ads, webinars, content marketing, and strategic partnerships. The phased approach ensures sustained engagement and measurable progress, establishing MarketMind as a thought leader in AI-powered marketing.",
    "market_analysis": "The target market comprises mid to large-sized enterprises that are increasingly seeking innovative, data-driven marketing solutions to maintain competitive advantage. Key segments include enterprises in retail, technology, financial services, and healthcare who prioritize marketing innovation and automation. The problem these enterprises face is the rapid evolution of marketing technology and the challenge of integrating AI effectively to optimize marketing ROI while dealing with complex data sets and fragmented tools. There is a clear gap for an AI marketing platform that simplifies predictive insights and automation at scale.",
    "value_proposition": "MarketMind offers an advanced AI-powered marketing platform that enables enterprises to anticipate market trends, automate complex campaigns, and optimize marketing performance with predictive analytics. By harnessing MarketMind, enterprises can future-proof their marketing strategies, reduce manual effort, increase campaign precision, and ultimately drive higher ROI and customer engagement. This solution is designed for scalability, integration ease, and actionable insights, delivering sustainable marketing advantages.",
    "competitive_strategy": "MarketMind differentiates itself from competitors by focusing on deep AI-driven predictive capabilities combined with user-friendly automation tailored to enterprise complexity. Unlike generic marketing automation tools, MarketMind integrates advanced machine learning models that continuously learn and adapt to market changes. The competitive landscape includes established marketing automation players and emerging AI startups, but MarketMind's unique blend of enterprise scalability, actionable AI insights, and strong support positions it ahead. The campaign emphasizes thought leadership and demonstrable ROI to build trust and authority.",
    "marketing_strategy": "The campaign messaging centers on 'Stay ahead by harnessing AI to future-proof your marketing strategies and outcomes.' This theme resonates around innovation, security against market disruption, and actionable AI benefits. The strategy uses a content-first approach featuring authoritative webinars and whitepapers that illustrate use cases and market trends. Digital advertising will target decision-makers with precision messaging, augmented by email nurtures and retargeting to maximize engagement. Strategic partnerships with marketing associations will amplify reach and credibility.",
    "marketing_channels": [
      "LinkedIn Ads targeting marketing executives and enterprise decision-makers",
      "Industry-specific online publications and newsletters (Martech Today, Chief Marketer)",
      "Webinars and virtual conferences with MarketMind experts and industry thought leaders",
      "Google Ads with targeted keywords ('AI marketing platform', 'marketing automation AI', 'predictive marketing solutions')",
      "Email marketing campaigns targeting curated enterprise contact lists",
      "Content marketing via blog articles, whitepapers, and case studies",
      "Strategic partnerships with marketing associations and enterprise technology forums"
    ],
    "sales_and_pricing": "The sales strategy is to leverage qualified leads generated through the campaign for direct sales outreach and demos aimed at converting trial users. A free trial of the AI platform will be offered to encourage hands-on experience, backed by personalized onboarding support. Pricing is tiered based on enterprise scale and feature sets, allowing flexibility and scalability. Bundled pricing options with premium support cater to larger organizations. Monetization focuses on subscription-based licensing with annual commitments encouraged for retention.",
    "launch_plan": "Month 1 initiates campaign launch with LinkedIn and Google Ads activation, initial content publication including blog posts and three whitepapers, and planning of webinars with industry leaders. A dedicated landing page is optimized for conversion and lead capture. During Months 2-3, a series of five webinars and virtual events will be held, supported by ongoing SEM and content marketing to build pipeline. Months 4-5 amplify email marketing leveraging segmented lists, activate partnerships for co-branded events, and ramp retargeting ads to re-engage site visitors. Month 6 focuses on campaign wrap-up, performance analysis, and intensified lead nurturing to convert trials into paying customers.",
    "timeline": [
      "Month 1: Campaign launch; LinkedIn Ads and Google Ads live; initial content and whitepapers published; webinar scheduling and outreach commenced",
      "Month 2-3: Host 5 webinars; continue SEM and content marketing; amplify social media sharing; initiate partnership agreements",
      "Month 4-5: Launch segmented email campaigns; activate partnership events; increase retargeting ad spend; produce additional case studies",
      "Month 6: Campaign wrap-up; analyze KPIs; conduct targeted lead nurturing; prepare post-campaign report and recommendations"
    ],
    "metrics_and_goals": [
      "Increase brand awareness by 40% measured via pre/post surveys and social listening analytics",
      "Generate at least 150 qualified leads from mid to large-sized enterprises",
      "Achieve 25% conversion rate from lead to platform trial user within 3 months post-launch",
      "Increase website traffic to product landing page by 60% through targeted digital campaigns",
      "Achieve 50% average attendance rate across webinars with 500+ content downloads",
      "Maintain average click-through rates of 2.5% on digital ads",
      "Secure email open rates of 25% or better",
      "Keep cost per lead under $3,333"
    ],
    "risk_and_resources": "Potential risks include underperforming digital ads, webinar attendance below targets, and slow lead conversion rates. To mitigate, rigorous A/B testing of ad creatives and messaging will be conducted with rapid iteration. Resources wise, dedicated campaign management, content creation teams, technical support for platform trials, and sales enablement staff are required. Collaboration with partnerships needs formal agreements and assigned liaisons. Budget allocation will prioritize channels with high ROI and flexible reallocation based on performance data.",
    "growth_strategy": "Post-campaign growth will focus on solidifying partnerships with marketing associations and enterprise tech forums for co-marketing and referral programs. Acquisition efforts will leverage testimonials, case studies, and trial success stories for expanded outreach. Retention strategies include continuous customer education via webinars, personalized support, and feature upgrades. Scalability is planned through integration with popular enterprise systems and continuous AI model enhancement to maintain competitive advantage and broaden product applicability across industries."
  });

  const loadGTMPlan = async () => {
    const memeContentId = "abc";

    if (!memeContentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${memeContentId}&contentType=gtm-plan`);
      if (!response.ok) {
        throw new Error('Failed to load gtm plan');
      }
      const data = await response.json();
      console.log(data);
      setGTMPlanData(data);
    } catch (error) {
      console.error('Error loading gtm plan:', error);
    }
  };

  useEffect(() => {
    loadGTMPlan();
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold">{gtmPlanData.title}</h1>
          <p className="text-muted-foreground mt-2">{gtmPlanData.subtitle}</p>
        </div>
        <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      <GTMPlan {...gtmPlanData} />
    </div>
  )
} 