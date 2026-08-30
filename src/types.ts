export type UserRole = 'creator' | 'business';

export type CreatorNiche =
  | 'Coffee Shop & Cafe'
  | 'Restaurant & Dining'
  | 'Gym & Fitness Studio'
  | 'Bakery & Dessert'
  | 'Beauty Salon, Spa & Skincare'
  | 'Boutique & Local Retail'
  | 'Music, Festivals & Events'
  | 'Bars, Pubs & Nightlife'
  | 'Local Services & Experiences';

export type BrandCategory =
  | 'Coffee Shop & Cafe'
  | 'Restaurant & Dining'
  | 'Gym & Fitness Studio'
  | 'Bakery & Dessert'
  | 'Beauty Salon, Spa & Skincare'
  | 'Boutique & Local Retail'
  | 'Music, Festivals & Events'
  | 'Bars, Pubs & Nightlife'
  | 'Local Services & Experiences';

export type AdFormatType =
  | 'Location Tag & Venue Check-in'
  | 'In-Store Promo Code'
  | 'Menu / Booking Link Sticker'
  | 'Event Ticket Link';

export type PayoutMethod = 'Venmo' | 'PayPal' | 'Cash App' | 'Direct Bank Transfer' | 'Apple Cash';

export interface CreatorRegistration {
  id: string;
  fullName: string;
  instagramHandle: string;
  email: string;
  phone?: string;
  city: string;
  country?: string;
  neighborhood: string;
  avgViewsRange: string;
  estimatedAvgViews: number;
  niches: CreatorNiche[];
  preferredAdFormats?: AdFormatType[];
  acceptsOnlineOnlyAds?: boolean;
  payoutMethod: PayoutMethod;
  payoutHandle?: string;
  referralSource?: string;
  createdAt: string;
  queueNumber: number;
}

export interface BusinessRegistration {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteOrInstagram: string;
  category: BrandCategory;
  brandCategory?: BrandCategory;
  brandType: 'local' | 'event' | 'Local Spot / Store' | 'Entertainment / Music' | 'Other Brand';
  city: string;
  neighborhood: string;
  isGlobalOrNational?: boolean;
  address?: string;
  adFormat?: AdFormatType;
  preferredAdFormats?: AdFormatType[];
  monthlyBudget: string;
  targetStoryViews: number;
  promotionGoal: string;
  targetAudienceNotes?: string;
  createdAt: string;
  pilotPriority: 'Standard' | 'VIP Fast-Track';
}

export interface SampleCampaign {
  id: string;
  businessName: string;
  category: BrandCategory;
  brandType: 'Local Spot / Store' | 'Entertainment / Music';
  adFormat: AdFormatType;
  city: string;
  neighborhood?: string;
  isGlobalOrNational?: boolean;
  offerHeadline: string;
  creatorPayoutPer100Views: number;
  avgCreatorEarned: number;
  verifiedViews: number;
  storyImage: string;
  stickerText: string;
  tagHandle: string;
  linkUrl?: string;
  promoCode?: string;
  verifiedBadge: string;
}

export interface CityDemandStat {
  city: string;
  country: string;
  creatorCount: number;
  businessCount: number;
  status: 'Active Pilot' | 'Launching Next' | 'Fast Growing' | 'Voting Open';
  topNiches: string[];
}

export interface StoryAdMockup {
  id: string;
  advertiserName: string;
  advertiserType: 'local' | 'event';
  handle: string;
  avatarUrl: string;
  backgroundImage: string;
  adHeadline: string;
  tagHandle: string;
  adFormatType: AdFormatType;
  linkUrl?: string;
  promoCode?: string;
  verifiedViews: number;
  estPayout: number;
  conversionBenefit: string;
}
