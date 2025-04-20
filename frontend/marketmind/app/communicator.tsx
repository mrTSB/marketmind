import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// Types
export interface ProductInfo {
  product_info: string;
  company_info: string;
}

export interface Campaign {
  title: string;
  concept?: string;
  [key: string]: any;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
}

export interface DetailedCampaign {
  title: string;
  concept: string;
  [key: string]: any;
}

export interface GTMPlan {
  strategy: string;
  timeline: string;
  [key: string]: any;
}

export interface Persona {
  name: string;
  role: string;
  [key: string]: any;
}

export interface PersonasResponse {
  personas: Persona[];
}

export interface MarketResearch {
  market_size: string;
  key_trends: string[];
  [key: string]: any;
}

export interface ExecutiveBrief {
  summary: string;
  [key: string]: any;
}

export interface AllContent {
  campaigns: CampaignsResponse;
  detailedCampaign: DetailedCampaign;
  gtmPlan: GTMPlan;
  personas: PersonasResponse;
  marketResearch: MarketResearch;
  executiveBrief: ExecutiveBrief;
}

// API Functions
export const generateContent = async (productInfo: ProductInfo): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/generate`, productInfo);
    return response.data.id;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export const getCampaigns = async (contentId: string): Promise<CampaignsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${contentId}/campaigns`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const getDetailedCampaign = async (contentId: string): Promise<DetailedCampaign> => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${contentId}/detailed-campaign`);
    return response.data;
  } catch (error) {
    console.error('Error fetching detailed campaign:', error);
    throw error;
  }
};

export const getGTMPlan = async (contentId: string): Promise<GTMPlan> => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${contentId}/gtm-plan`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GTM plan:', error);
    throw error;
  }
};

export const getPersonas = async (contentId: string): Promise<PersonasResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${contentId}/personas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};

export const getMarketResearch = async (contentId: string): Promise<MarketResearch> => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${contentId}/market-research`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market research:', error);
    throw error;
  }
};

export const getExecutiveBrief = async (contentId: string): Promise<ExecutiveBrief> => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${contentId}/executive-brief`);
    return response.data;
  } catch (error) {
    console.error('Error fetching executive brief:', error);
    throw error;
  }
};

// export const getAllContent = async (contentId: string): Promise<AllContent> => {
//   try {
//     const [
//       campaigns,
//       detailedCampaign,
//       gtmPlan,
//       personas,
//       marketResearch,
//       executiveBrief
//     ] = await Promise.all([
//       getCampaigns(contentId),
//       getDetailedCampaign(contentId),
//       getGTMPlan(contentId),
//       getPersonas(contentId),
//       getMarketResearch(contentId),
//       getExecutiveBrief(contentId)
//     ]);

//     const allContent: AllContent = {
//       campaigns,
//       detailedCampaign,
//       gtmPlan,
//       personas,
//       marketResearch,
//       executiveBrief
//     };

//     // Save to localStorage with contentId as key
//     localStorage.setItem(`content_${contentId}`, JSON.stringify(allContent));
    
//     return allContent;
//   } catch (error) {
//     console.error('Error fetching all content:', error);
//     throw error;
//   }
// };

// export const getSavedContent = (contentId: string): AllContent | null => {
//   const savedContent = localStorage.getItem(`content_${contentId}`);
//   return savedContent ? JSON.parse(savedContent) : null;
// };

// Debug function to get all content
export const getDebugContent = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/debug/content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching debug content:', error);
    throw error;
  }
};
