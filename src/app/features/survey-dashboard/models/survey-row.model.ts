import { IconName } from '../../../shared/components/icon/icon.component';
import { Survey, SurveyStatus } from './survey.model';

// Color variant for a status badge.
export type StatusVariant = 'success' | 'warning' | 'info' | 'neutral';

// Presentational view-model for one table row. The service derives the
// display-only fields once, so the template never formats during change
// detection (keeps rendering cheap and predictable).
export interface SurveyRow extends Survey {
  readonly languagesLabel: string; // "EN" / "EN +2"
  readonly startDateLabel: string; // "Apr 02, 2026"
  readonly endDateLabel: string; // "Jun 30, 2026" or "—"
  readonly participantsLabel: string; // "1,204"
  readonly statusLabel: string; // "Published"
  readonly statusVariant: StatusVariant; // badge color
  readonly statusHasFill: boolean; // closed = plain text, others = filled pill
  readonly dataSourceIcon: IconName; // place / call / group / public
}

// Status → label + badge variant. Published/Draft/Completed are filled pills;
// Closed is plain neutral text (matches the Figma frame exactly).
export const SURVEY_STATUS_META: Record<
  SurveyStatus,
  {
    readonly label: string;
    readonly variant: StatusVariant;
    readonly hasFill: boolean;
  }
> = {
  published: { label: 'Published', variant: 'success', hasFill: true },
  draft: { label: 'Draft', variant: 'warning', hasFill: true },
  completed: { label: 'Completed', variant: 'info', hasFill: true },
  closed: { label: 'Closed', variant: 'neutral', hasFill: false },
};
