export type UserRole = 'creator' | 'business';

export type CreatorNiche =
  | 'E-Commerce & DTC Brands'
  | 'Mobile Apps & Tech Tools'
  | 'Fashion, Streetwear & Drops'
  | 'Food, Cafes & Restaurants'
  | 'Fitness, Health & Wellness'
  | 'Beauty, Skincare & Hair'
  | 'Music, Festivals & Events'
  | 'Gaming, Gear & Entertainment'
  | 'Local Spots & Neighborhood Places'
  | 'Books, Education & Productivity';

export type BrandCategory =
  | 'E-Commerce & DTC Brands'
  | 'Mobile Apps & Tech Tools'
  | 'Streetwear & Apparel Drops'
  | 'Coffee Shop & Cafe'
  | 'Restaurant & Dining'
  | 'Gym & Fitness Studio'
  | 'Bakery & Dessert'
  | 'Beauty, Wellness & Skincare'
  | 'Music, Festivals & Events'
  | 'Local Professional Service';

export type AdFormatType =
  | 'Link Sticker (Website URL)'
  | 'App Store / Play Store Link'
  | 'Exclusive Promo Code'
  | 'Location Tag & Venue Check-in'
  | 'Audio / Music Tag';

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
  brandType: 'dtc' | 'app' | 'local' | 'event' | 'DTC / E-Commerce' | 'Mobile App / Software' | 'Local Spot / Store' | 'Entertainment / Music' | 'Other Brand';
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
  brandType: 'DTC / E-Commerce' | 'Mobile App / Software' | 'Local Spot / Store' | 'Entertainment / Music';
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
  advertiserType: 'dtc' | 'app' | 'local' | 'event';
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
