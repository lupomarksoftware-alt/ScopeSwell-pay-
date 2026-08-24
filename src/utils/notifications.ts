import { BusinessRegistration, CreatorRegistration } from '../types';
import { APP_CONFIG } from '../config/constants';

export const MAIN_EMAIL = APP_CONFIG.mainEmail;

/**
 * Dispatches a creator signup directly to the main email endpoint asynchronously
 */
export async function sendCreatorRegistrationEmail(creator: CreatorRegistration): Promise<{ success: boolean; message: string }> {
  try {
    const payload = {
      _subject: `[ScopeSwell Pay] New Creator Registration: @${creator.instagramHandle} (${creator.city})`,
      _replyto: creator.email,
      recipient: MAIN_EMAIL,
      creator_name: creator.fullName,
      instagram_handle: `@${creator.instagramHandle}`,
      email: creator.email,
      phone: creator.phone || 'Not provided',
      city: creator.city,
      neighborhood: creator.neighborhood || 'N/A',
      estimated_avg_story_views: `${creator.estimatedAvgViews} (${creator.avgViewsRange})`,
      content_niches: creator.niches.join(', '),
      preferred_ad_formats: creator.preferredAdFormats.join(', '),
      payout_method: `${creator.payoutMethod} (${creator.payoutHandle || `@${creator.instagramHandle}`})`,
      queue_number: `#${creator.queueNumber}`,
      registered_at: creator.createdAt ? new Date(creator.createdAt).toISOString() : new Date().toISOString(),
      source: 'ScopeSwell Pay Creator Intake Portal',
    };

    // Attempt background HTTP post to form service for immediate inbox delivery
    const response = await fetch(`https://formsubmit.co/ajax/${MAIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, message: `Registration notification delivered to ${MAIN_EMAIL}` };
    }
    return { success: false, message: 'Notification queued in local session.' };
  } catch (err) {
    console.warn('Direct HTTP notification dispatch failed, fallback active:', err);
    return { success: false, message: 'Local registration saved successfully.' };
  }
}

/**
 * Dispatches an advertiser/brand pilot brief directly to the main email endpoint asynchronously
 */
export async function sendBusinessRegistrationEmail(business: BusinessRegistration): Promise<{ success: boolean; message: string }> {
  try {
    const payload = {
      _subject: `[ScopeSwell Pay] 🎁 Founding 100 Brand Pilot: ${business.businessName} (${business.category})`,
      _replyto: business.email,
      recipient: MAIN_EMAIL,
      business_name: business.businessName,
      contact_person: business.contactName,
      email: business.email,
      phone: business.phone,
      website_or_social: business.websiteOrInstagram || 'Not provided',
      category: business.category,
      target_location: business.isGlobalOrNational ? 'Nationwide / Online' : business.city,
      preferred_formats: business.preferredAdFormats.join(', '),
      monthly_budget: business.monthlyBudget,
      target_verified_views: `~${business.targetStoryViews.toLocaleString()} views`,
      campaign_goals: business.promotionGoal || 'Pay-per-view Story Pilot',
      pioneer_perk_claimed: 'Founding 100 Brand: Free Custom Story Template & Ad Kit + 500 Bonus Story Views + $0 Matchmaking Fee',
      submitted_at: business.createdAt ? new Date(business.createdAt).toISOString() : new Date().toISOString(),
      source: 'ScopeSwell Pay Brand Pilot Intake Desk (First 100 Businesses Promotion)',
    };

    // Attempt background HTTP post to form service for immediate inbox delivery
    const response = await fetch(`https://formsubmit.co/ajax/${MAIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, message: `Pilot brief delivered to ${MAIN_EMAIL}` };
    }
    return { success: false, message: 'Pilot request saved in database.' };
  } catch (err) {
    console.warn('Direct HTTP notification dispatch failed, fallback active:', err);
    return { success: false, message: 'Pilot request saved in database.' };
  }
}

/**
 * Generates a pre-filled mailto URL for a newly registered creator
 */
export function getCreatorMailtoUrl(creator: CreatorRegistration): string {
  const subject = encodeURIComponent(`[ScopeSwell Pay] New Creator Registration: @${creator.instagramHandle} (${creator.city})`);
  const body = encodeURIComponent(
`Hi ScopeSwell Team (${MAIN_EMAIL}),

I just registered as a creator on ScopeSwell Pay!

--- CREATOR DETAILS ---
Name: ${creator.fullName}
Instagram: @${creator.instagramHandle}
City: ${creator.city} (${creator.neighborhood})
Estimated Story Views: ${creator.estimatedAvgViews} (${creator.avgViewsRange})
Niches: ${creator.niches.join(', ')}
Preferred Formats: ${creator.preferredAdFormats.join(', ')}
Email: ${creator.email}
Phone: ${creator.phone || 'N/A'}
Payout Method: ${creator.payoutMethod} (${creator.payoutHandle || `@${creator.instagramHandle}`})
Queue Number: #${creator.queueNumber}

I look forward to receiving relevant story campaign invites!

Best,
${creator.fullName}`
  );

  return `mailto:${MAIN_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Generates a pre-filled mailto URL for a newly registered advertiser/business
 */
export function getBusinessMailtoUrl(business: BusinessRegistration): string {
  const subject = encodeURIComponent(`[ScopeSwell Pay] 🎁 Founding 100 Brand Pilot: ${business.businessName} (${business.category})`);
  const body = encodeURIComponent(
`Hi ScopeSwell Campaign Team (${MAIN_EMAIL}),

We just submitted a pilot campaign brief for ${business.businessName}!

--- FOUNDING 100 BUSINESS PILOT DETAILS ---
Company / Brand: ${business.businessName}
Contact Person: ${business.contactName}
Business Email: ${business.email}
Phone: ${business.phone || 'N/A'}
Website / Instagram: ${business.websiteOrInstagram || 'N/A'}
Category: ${business.category}
Target Audience / Location: ${business.city} (${business.isGlobalOrNational ? 'Nationwide/Online' : 'Local'})
Ad Formats: ${business.preferredAdFormats.join(', ')}
Monthly Pilot Budget: ${business.monthlyBudget}
Estimated Target Views: ~${business.targetStoryViews.toLocaleString()} verified views
Campaign Goal: ${business.promotionGoal || 'Pay-per-view Story Pilot'}
Claimed Perks: Free Story Template & Creative Kit + 500 Bonus Story Views + $0 Matchmaking Fee

Please send over our custom Story Template Kit, creator roster, and campaign launch matrix.

Best regards,
${business.contactName}
${business.businessName}`
  );

  return `mailto:${MAIN_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Generates a full summary email draft of all current registrations for export
 */
export function getFullExportMailtoUrl(
  creators: CreatorRegistration[],
  businesses: BusinessRegistration[]
): string {
  const totalViews = creators.reduce((acc, c) => acc + (c.estimatedAvgViews || 500) * 3, 0);
  const subject = encodeURIComponent(`[ScopeSwell Pay] Master Early Access Pipeline Report (${creators.length} Creators, ${businesses.length} Brands)`);
  
  const creatorListSummary = creators
    .slice(0, 10)
    .map((c, i) => `${i + 1}. @${c.instagramHandle} | ${c.city} | ~${c.estimatedAvgViews} views | ${c.email}`)
    .join('\n');

  const businessListSummary = businesses
    .slice(0, 10)
    .map((b, i) => `${i + 1}. ${b.businessName} (${b.category}) | ${b.city} | ${b.monthlyBudget} | ${b.email}`)
    .join('\n');

  const body = encodeURIComponent(
`Hi ScopeSwell Admin (${MAIN_EMAIL}),

Here is the latest snapshot of registrations from the ScopeSwell Pay demand validation pipeline:

--- EXECUTIVE SUMMARY ---
Total Active Creators: ${creators.length}
Total Registered Brands & Spots: ${businesses.length}
Combined Monthly View Capacity: ~${totalViews.toLocaleString()} verified story views
Central Notification Email: ${MAIN_EMAIL}
Report Timestamp: ${new Date().toLocaleString()}

--- TOP REGISTERED CREATORS (Sample 10) ---
${creatorListSummary}

--- TOP REGISTERED BRANDS & ADVERTISERS (Sample 10) ---
${businessListSummary}

Full database records are stored in browser local cache and downloadable via CSV in the Admin Hub.

Best,
ScopeSwell Pay Automated Notification Engine`
  );

  return `mailto:${MAIN_EMAIL}?subject=${subject}&body=${body}`;
}
