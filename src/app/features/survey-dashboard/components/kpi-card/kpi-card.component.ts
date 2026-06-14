import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { KpiCard } from '../../models/survey.model';

// One KPI tile: left accent bar + icon container + title + value + description.
// Visual hierarchy = Value > Title > Icon > Description (matches the frame).
@Component({
  selector: 'app-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class KpiCardComponent {
  // The KPI data to render.
  readonly kpi = input.required<KpiCard>();

  // Host modifier for the semantic accent (left bar + icon color).
  readonly semanticClass = computed(() => `kpi--${this.kpi().semantic}`);
}
