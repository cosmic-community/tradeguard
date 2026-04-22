import { createBucketClient } from '@cosmicjs/sdk';
import { Trade, AIAdvisory, TradeDebrief } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getTrades(): Promise<Trade[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'trades' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    const trades = response.objects as Trade[];
    return trades.sort((a, b) => {
      const dateA = new Date(a.metadata?.entry_time || a.created_at).getTime();
      const dateB = new Date(b.metadata?.entry_time || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch trades');
  }
}

export async function getTradeBySlug(slug: string): Promise<Trade | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'trades', slug })
      .depth(1);
    return response.object as Trade;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch trade');
  }
}

export async function getAdvisories(): Promise<AIAdvisory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ai-advisories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    const advisories = response.objects as AIAdvisory[];
    return advisories.sort((a, b) => {
      const dateA = new Date(a.metadata?.advisory_time || a.created_at).getTime();
      const dateB = new Date(b.metadata?.advisory_time || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch advisories');
  }
}

export async function getAdvisoryBySlug(slug: string): Promise<AIAdvisory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'ai-advisories', slug })
      .depth(1);
    return response.object as AIAdvisory;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch advisory');
  }
}

export async function getDebriefs(): Promise<TradeDebrief[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'trade-debriefs' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    const debriefs = response.objects as TradeDebrief[];
    return debriefs.sort((a, b) => {
      const dateA = new Date(a.metadata?.debrief_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.debrief_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch debriefs');
  }
}

export async function getDebriefBySlug(slug: string): Promise<TradeDebrief | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'trade-debriefs', slug })
      .depth(1);
    return response.object as TradeDebrief;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch debrief');
  }
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}