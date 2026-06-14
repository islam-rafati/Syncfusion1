import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Thin wrapper around Syncfusion's badge CSS classes.
// Keeps badge markup in one place so status pills look identical everywhere.
@Component({
  selector: 'app-status-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  // Visible text inside the pill.
  readonly label = input.required<string>();

  // Syncfusion modifier (e.g. 'e-badge-success'); empty → default badge.
  readonly badgeClass = input<string>('');
}
