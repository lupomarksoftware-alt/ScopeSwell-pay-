export type UserRole = 'creator' | 'business' | 'admin';

export type CityRateKey = 'tallinn' | 'riga' | 'helsinki' | 'stockholm' | 'newyork';

export interface CityRateInfo {
  id: CityRateKey;
  cityName: string;
  country: string;
  ratePerReach: number; // e.g. 0.03 EUR per unique account reached
  ratePer100Reach: number; // e.g. 3.00 EUR per 100 accounts reached
  ratePerView?: number; // legacy alias
  ratePer100Views?: number; // legacy alias
  serviceFeePercent: number; // 15%
  popularNiches: string[];
  sampleAudience: string;
  badge?: string;
}

export type FeedbackType =
  | 'Bug / Error Report'
  | 'Feature Suggestion'
  | 'General Feedback'
  | 'Escrow & Payout Issue'
  | 'Campaign & Verification Problem'
  | 'feedback'
  | 'bug'
  | 'help'
  | 'feature'
  | 'escrow';

export interface FeedbackReport {
  id: string;
  type: FeedbackType;
  role: 'Creator' | 'Business' | 'Visitor' | 'Other';
  name: string;
  email: string;
  accountHandle?: string; // @handle or Business name
  message: string;
  deviceInfo?: string;
  browser?: string;
  pageUrl?: string;
  createdAt: string;
  status: 'Received' | 'In Review' | 'Resolved';
}

export interface CreatorRegistration {
  id: string;
  fullName: string;
  instagramHandle: string;
  email: string;
  city: string;
  neighborhood?: string;
  avgReachRange?: string;
  avgViewsRange?: string;
  estimatedAvgReach?: number;
  estimatedAvgViews?: number;
  niches: string[];
  preferredAdFormats: string[];
  payoutMethod: string;
  payoutHandle: string;
  createdAt: string;
  queueNumber?: number;
}

export interface BusinessRegistration {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  websiteOrInstagram?: string;
  category: string;
  city: string;
  targetStoryReach?: number;
  targetStoryViews?: number;
  monthlyBudget: string;
  promotionGoal: string;
  createdAt: string;
}

export interface ProofSubmissionMock {
  id: string;
  campaignTitle: string;
  businessName: string;
  creatorHandle: string;
  city: string;
  ratePerReach?: number;
  ratePerView?: number;
  submittedReach?: number;
  submittedViews?: number;
  timestamp: string;
  storyLink: string;
  status: 'Pending Audit' | 'Verified & Paid' | 'Under Review';
  screenshotUrl: string;
  escrowLocked: number;
  actualPayout: number;
  refundToBusiness: number;
}

export interface SampleCampaign {
  id: string;
  businessName: string;
  category: string;
  brandType?: string;
  adFormat?: string;
  city: string;
  neighborhood?: string;
  isGlobalOrNational?: boolean;
  offerHeadline: string;
  creatorPayoutPer100Reach?: number;
  creatorPayoutPer100Views?: number;
  avgCreatorEarned: number;
  verifiedReach?: number;
  verifiedViews?: number;
  storyImage: string;
  stickerText: string;
  tagHandle: string;
  linkUrl?: string;
  promoCode?: string;
  verifiedBadge: string;
}
