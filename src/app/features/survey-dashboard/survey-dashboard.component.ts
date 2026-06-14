import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { WelcomeBannerComponent } from './components/welcome-banner/welcome-banner.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { SurveyFilterBarComponent } from './components/survey-filter-bar/survey-filter-bar.component';
import { SurveysTableComponent } from './components/surveys-table/surveys-table.component';
import { DashboardPagerComponent } from './components/dashboard-pager/dashboard-pager.component';
import { SurveysService } from './services/surveys.service';
import { FilterChipOption, KpiCard, SurveyFilter } from './models/survey.model';
import { SurveyRow } from './models/survey-row.model';

// Survey dashboard page — reproduces the full Figma frame (sidebar + app bar +
// content). Owns UI state (search text, active filter) and the loaded data.
@Component({
  selector: 'app-survey-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidebarNavComponent,
    AppBarComponent,
    WelcomeBannerComponent,
    KpiCardComponent,
    SurveyFilterBarComponent,
    SurveysTableComponent,
    DashboardPagerComponent,
  ],
  templateUrl: './survey-dashboard.component.html',
  styleUrl: './survey-dashboard.component.scss',
})
export class SurveyDashboardComponent implements OnInit {
  private readonly surveysService = inject(SurveysService);
  private readonly destroyRef = inject(DestroyRef);

  // Loaded data.
  readonly kpis = signal<KpiCard[]>([]);
  readonly surveys = signal<SurveyRow[]>([]);
  readonly isLoading = signal(true);

  // UI state.
  readonly searchQuery = signal('');
  readonly activeFilter = signal<SurveyFilter>('all');

  // Filter chips with leading icons, in the exact order shown in the frame.
  readonly filters: FilterChipOption[] = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'published', label: 'Published', icon: 'check-circle' },
    { id: 'draft', label: 'Draft', icon: 'edit' },
    { id: 'completed', label: 'Completed', icon: 'history' },
    { id: 'closed', label: 'Closed', icon: 'lock' },
    { id: 'favorites', label: 'Favorites', icon: 'star' },
    { id: 'field', label: 'Field', icon: 'place' },
    { id: 'call-center', label: 'Call Center', icon: 'call' },
    { id: 'self', label: 'Self Survey', icon: 'person' },
  ];

  // Rows after applying the active filter + search query.
  readonly filteredSurveys = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filter = this.activeFilter();
    return this.surveys().filter(
      (row) =>
        this.matchesFilter(row, filter) &&
        (query === '' || row.name.toLowerCase().includes(query)),
    );
  });

  // True when there is nothing to show after filtering.
  readonly isEmpty = computed(
    () => !this.isLoading() && this.filteredSurveys().length === 0,
  );

  ngOnInit(): void {
    this.loadData();
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  onFilterSelect(filter: SurveyFilter): void {
    this.activeFilter.set(filter);
  }

  // Action handlers — wired to real navigation/services later.
  onNewSurvey(): void {
    /* navigate to create flow */
  }

  onUseTemplate(): void {
    /* open template picker */
  }

  onOpenReport(_id: string): void {
    /* open report */
  }

  // Handle a chosen overflow-menu action for a row.
  onRowAction(event: { action: string; id: string }): void {
    // "Add to Favorites" reuses the existing favorite toggle.
    if (event.action === 'add-favorite') {
      this.onFavoriteToggle(event.id);
    }
    // Other actions (edit, duplicate, archive, trash, …) wire to services later.
  }

  // Optimistically flip the favorite flag for the toggled row.
  onFavoriteToggle(id: string): void {
    this.surveys.update((rows) =>
      rows.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)),
    );
  }

  // Load KPIs + surveys; clear the loading flag when both arrive.
  private loadData(): void {
    this.isLoading.set(true);

    this.surveysService
      .getKpis()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((kpis) => this.kpis.set(kpis));

    this.surveysService
      .getSurveys()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rows) => {
        this.surveys.set(rows);
        this.isLoading.set(false);
      });
  }

  // Decide whether a row passes the selected filter chip.
  private matchesFilter(row: SurveyRow, filter: SurveyFilter): boolean {
    switch (filter) {
      case 'all':
        return true;
      case 'favorites':
        return row.isFavorite;
      case 'field':
      case 'call-center':
      case 'self':
        return row.dataSource === filter;
      default:
        return row.status === filter;
    }
  }
}
