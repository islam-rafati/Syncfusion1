import { IconName } from '../../../shared/components/icon/icon.component';

// Domain models for the Survey dashboard feature.
// Pure data shapes only — no presentational fields (see survey-row.model.ts).

// Lifecycle status of a survey. String union → strict typing, no enums.
export type SurveyStatus = 'published' | 'draft' | 'completed' | 'closed';

// Where responses are collected from. Drives the data-source icon.
export type SurveyDataSource = 'field' | 'call-center' | 'self' | 'online';

// Semantic accent for KPI tiles + status badges.
export type KpiSemantic = 'neutral' | 'success' | 'warning' | 'danger' | 'primary';

// Filter chip identifiers shown above the table.
export type SurveyFilter =
  | 'all'
  | 'published'
  | 'draft'
  | 'completed'
  | 'closed'
  | 'favorites'
  | 'field'
  | 'call-center'
  | 'self';

// Domain entity for a single survey row.
export interface Survey {
  readonly id: string;
  readonly name: string; // survey name
  readonly languages: string[]; // e.g. ['EN'] or ['EN','AR','FR']
  readonly startDate: Date;
  readonly endDate: Date | null; // null → not set (renders as “—”)
  readonly dataSource: SurveyDataSource;
  readonly participants: number;
  readonly status: SurveyStatus;
  isFavorite: boolean; // mutable: user can toggle
  readonly hasReport: boolean;
}

// KPI summary tile shown in the dashboard's top row.
export interface KpiCard {
  readonly id: string;
  readonly title: string; // tile title
  readonly value: number;
  readonly description: string; // short supporting text
  readonly icon: IconName; // icon rendered in the tile's icon container
  readonly semantic: KpiSemantic; // drives left accent + icon color
}

// A selectable filter chip (label + leading icon).
export interface FilterChipOption {
  readonly id: SurveyFilter;
  readonly label: string;
  readonly icon: IconName;
}

// Generic API envelope used by the service layer.
export interface ApiResponse<T> {
  readonly data: T;
}
