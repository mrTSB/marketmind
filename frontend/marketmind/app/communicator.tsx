import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// Types
export interface ProductInfo {
  product_info: string;
  company_info: string;
}

export interface Campaign {
  concept?: string;
  [key: string]: any;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
}

export interface DetailedCampaign {
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

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatRequest {
  content_id: string;
  persona_name: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  response: string;
}

export interface PersonaResponse {
  persona_name: string;
  response: string;
}

export interface GroupChatResponse {
  responses: PersonaResponse[];
}

export interface GroupChatRequest {
  content_id: string;
  initial_message: string;
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

export const generateDetailedCampaign = async (productInfo: string, campaign: Campaign): Promise<DetailedCampaign> => {
  console.log(productInfo, campaign);
  try {
    const response = await axios.post(`${BASE_URL}/generate_detailed_campaign`, { productInfo, campaign });
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

// Chat function
export const chatWithPersona = async (
  contentId: string,
  personaName: string,
  messages: ChatMessage[]
): Promise<string> => {
  try {
    const chatRequest: ChatRequest = {
      content_id: contentId,
      persona_name: personaName,
      messages: messages
    };
    
    const response = await axios.post(`${BASE_URL}/chat`, chatRequest);
    return response.data.response;
  } catch (error) {
    console.error('Error chatting with persona:', error);
    throw error;
  }
};

export const groupChat = async (
  contentId: string,
  initialMessage: string
): Promise<GroupChatResponse> => {
  try {
    const groupChatRequest: GroupChatRequest = {
      content_id: contentId,
      initial_message: initialMessage
    };
    
    const response = await axios.post(`${BASE_URL}/group-chat`, groupChatRequest);
    return response.data;
  } catch (error) {
    console.error('Error in group chat:', error);
    throw error;
  }
};
