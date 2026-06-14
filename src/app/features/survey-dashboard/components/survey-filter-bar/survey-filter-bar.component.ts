import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FilterChipOption, SurveyFilter } from '../../models/survey.model';

// Search field + filter chips above the table. Stateless: reflects the active
// filter from inputs and emits user intents back to the page.
@Component({
  selector: 'app-survey-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './survey-filter-bar.component.html',
  styleUrl: './survey-filter-bar.component.scss',
})
export class SurveyFilterBarComponent {
  // Available filter chips, in display order.
  readonly filters = input.required<FilterChipOption[]>();

  // Currently selected filter id.
  readonly activeFilter = input.required<SurveyFilter>();

  // Emits the latest search text (search-as-you-type).
  readonly search = output<string>();

  // Emits the chosen filter id.
  readonly filterSelect = output<SurveyFilter>();

  protected onSearch(value: string): void {
    this.search.emit(value.trim());
  }
}
