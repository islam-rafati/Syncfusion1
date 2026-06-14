import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IconName } from '../../../shared/components/icon/icon.component';
import { KpiCard, Survey, SurveyDataSource } from '../models/survey.model';
import { SurveyRow, SURVEY_STATUS_META } from '../models/survey-row.model';

// Short month names for the "MMM dd, yyyy" date format used in the table.
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Data-access layer for the dashboard.
// Returns mock data via `of()`; swap the bodies for HttpClient calls later
// without touching any component.
@Injectable({ providedIn: 'root' })
export class SurveysService {
  // KPI tiles for the top summary row (matches the Figma frame exactly).
  getKpis(): Observable<KpiCard[]> {
    const kpis: KpiCard[] = [
      {
        id: 'total',
        title: 'Total Surveys',
        value: 9,
        description: 'Registered surveys in system',
        icon: 'clipboard',
        semantic: 'neutral',
      },
      {
        id: 'published',
        title: 'Published Surveys',
        value: 2,
        description: 'Currently collecting responses',
        icon: 'check-circle',
        semantic: 'success',
      },
      {
        id: 'draft',
        title: 'Draft Surveys',
        value: 8,
        description: 'Awaiting completion',
        icon: 'edit',
        semantic: 'warning',
      },
      {
        id: 'completed',
        title: 'Completed Surveys',
        value: 24,
        description: 'Survey collection period ended',
        icon: 'history',
        semantic: 'danger',
      },
      {
        id: 'closed',
        title: 'Closed Surveys',
        value: 0,
        description: 'No active participation allowed',
        icon: 'lock',
        semantic: 'primary', // purple accent bar per the Figma frame
      },
    ];
    return of(kpis);
  }

  // Survey rows, already mapped to the presentational view-model.
  getSurveys(): Observable<SurveyRow[]> {
    return of(this.seed().map((s) => this.toRow(s)));
  }

  // Map a domain Survey to a display-ready SurveyRow.
  private toRow(s: Survey): SurveyRow {
    const status = SURVEY_STATUS_META[s.status];
    return {
      ...s,
      languagesLabel: this.languagesLabel(s.languages),
      startDateLabel: this.formatDate(s.startDate),
      endDateLabel: s.endDate ? this.formatDate(s.endDate) : '—',
      participantsLabel: s.participants.toLocaleString('en-US'),
      statusLabel: status.label,
      statusVariant: status.variant,
      statusHasFill: status.hasFill,
      dataSourceIcon: this.dataSourceIcon(s.dataSource),
    };
  }

  // "EN" or "EN +2" — keeps the cell compact when many languages exist.
  private languagesLabel(langs: string[]): string {
    if (langs.length === 0) return '—';
    if (langs.length === 1) return langs[0];
    return `${langs[0]} +${langs.length - 1}`;
  }

  // "Apr 02, 2026" — short month + zero-padded day + full year.
  private formatDate(d: Date): string {
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${MONTHS[d.getMonth()]} ${day}, ${d.getFullYear()}`;
  }

  // Data source → the icon glyph shown in the table cell.
  private dataSourceIcon(src: SurveyDataSource): IconName {
    switch (src) {
      case 'field':
        return 'place';
      case 'call-center':
        return 'call';
      case 'self':
        return 'group';
      case 'online':
        return 'public';
    }
  }

  // Mock dataset — mirrors the six rows in the Figma frame.
  private seed(): Survey[] {
    return [
      {
        id: 's-1',
        name: 'Q2 Employee Engagement',
        languages: ['EN'],
        startDate: new Date(2026, 3, 2),
        endDate: new Date(2026, 5, 30),
        dataSource: 'field',
        participants: 1204,
        status: 'published',
        isFavorite: false,
        hasReport: true,
      },
      {
        id: 's-2',
        name: 'Customer NPS – EMEA',
        languages: ['EN', 'FR', 'DE'],
        startDate: new Date(2026, 3, 4),
        endDate: new Date(2026, 4, 20),
        dataSource: 'call-center',
        participants: 3310,
        status: 'published',
        isFavorite: true,
        hasReport: true,
      },
      {
        id: 's-3',
        name: 'Product Feedback Beta',
        languages: ['AR'],
        startDate: new Date(2026, 2, 28),
        endDate: new Date(2026, 3, 30),
        dataSource: 'self',
        participants: 842,
        status: 'draft',
        isFavorite: false,
        hasReport: true,
      },
      {
        id: 's-4',
        name: 'Onboarding Experience',
        languages: ['EN'],
        startDate: new Date(2026, 2, 20),
        endDate: null,
        dataSource: 'online',
        participants: 0,
        status: 'draft',
        isFavorite: true,
        hasReport: true,
      },
      {
        id: 's-5',
        name: 'Annual Benefits Review',
        languages: ['EN', 'AR'],
        startDate: new Date(2026, 2, 12),
        endDate: new Date(2026, 2, 30),
        dataSource: 'field',
        participants: 5118,
        status: 'closed',
        isFavorite: false,
        hasReport: true,
      },
      {
        id: 's-6',
        name: 'Website Usability Test',
        languages: ['EN'],
        startDate: new Date(2026, 3, 1),
        endDate: new Date(2026, 3, 16),
        dataSource: 'self',
        participants: 261,
        status: 'completed',
        isFavorite: true,
        hasReport: true,
      },
    ];
  }
}
