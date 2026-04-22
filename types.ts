export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type TradeDirection = 'Long' | 'Short';
export type TradeStatus = 'Open' | 'Closed - Win' | 'Closed - Loss' | 'Cancelled';
export type AdviceType = 'Cancel' | 'Hold' | 'Partial Exit' | 'Tighten Stop';
export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type Outcome = 'Win' | 'Loss' | 'Breakeven';

export interface Trade extends CosmicObject {
  type: 'trades';
  metadata: {
    symbol?: string;
    direction?: { key: string; value: TradeDirection } | TradeDirection;
    entry_price?: number;
    current_price?: number;
    position_size?: number;
    stop_loss?: number;
    take_profit?: number;
    status?: { key: string; value: TradeStatus } | TradeStatus;
    entry_time?: string;
    exit_time?: string;
    current_pnl?: number;
    trade_notes?: string;
    chart_snapshot?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface AIAdvisory extends CosmicObject {
  type: 'ai-advisories';
  metadata: {
    trade?: Trade;
    advice_type?: { key: string; value: AdviceType } | AdviceType;
    reversal_probability?: number;
    confidence_score?: number;
    triggering_factors?: string[];
    ai_explanation?: string;
    short_message?: string;
    price_at_advisory?: number;
    advisory_time?: string;
    trader_accepted?: boolean;
    severity?: { key: string; value: Severity } | Severity;
  };
}

export interface TradeDebrief extends CosmicObject {
  type: 'trade-debriefs';
  metadata: {
    trade?: Trade;
    outcome?: { key: string; value: Outcome } | Outcome;
    final_pnl?: number;
    pnl_percentage?: number;
    followed_ai_advice?: boolean;
    ai_feedback?: string;
    key_lesson?: string;
    behavior_tags?: string[];
    time_from_signal_minutes?: number;
    debrief_date?: string;
  };
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