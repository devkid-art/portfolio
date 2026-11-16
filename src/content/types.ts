import type { Locale } from '@/i18n/routing';
import type { PlaceId } from './places';
import type { TechId } from './tech';

export type Localized<T = string> = Record<Locale, T>;

/** live: online today · ready: complete, never deployed · delivered: shipped to a client, offline now ·
 *  proposal: full redesign the client did not adopt · building: under construction. */
export type ProjectStatus = 'live' | 'ready' | 'delivered' | 'proposal' | 'building';

export type ProjectCategory = 'featured' | 'client' | 'building';

export interface Project {
  slug: string;
  /** Tracking code shown on the project ticket, e.g. PRJ-SNC-001. */
  code: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** 0–100, only when status is 'building'. */
  progress?: number;
  year: number;
  liveUrl?: string;
  tagline: Localized;
  problem: Localized;
  highlights: Localized<string[]>;
  stack: TechId[];
  places: PlaceId[];
  media: { poster: string; video?: string; shots: string[] };
}
