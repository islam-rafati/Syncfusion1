import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

// Pagination footer: rows-per-page (start), numbered pager (center),
// "Showing X to Y of N" summary (end). Reproduces the Figma "Pagination".
@Component({
  selector: 'app-dashboard-pager',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './dashboard-pager.component.html',
  styleUrl: './dashboard-pager.component.scss',
})
export class DashboardPagerComponent {
  // Total number of items across all pages.
  readonly total = input<number>(0);

  // Rows shown per page (display only in this mock).
  readonly rowsPerPage = signal(10);

  // Active page (1-based).
  readonly currentPage = signal(1);

  // Page numbers to render in the pager.
  readonly pages = [1, 2, 3, 4, 5];

  // Summary text, e.g. "Showing 1 to 6 of 6 surveys".
  readonly summary = computed(() => {
    const shown = Math.min(this.total(), this.rowsPerPage());
    const from = this.total() === 0 ? 0 : 1;
    return `Showing ${from} to ${shown} of ${this.total()} surveys`;
  });

  protected onPage(page: number): void {
    this.currentPage.set(page);
  }
}
