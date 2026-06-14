import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

// Welcome banner — the focal element. Reproduces the Figma "Welcome Banner":
// gradient surface, "Last updated today" pill (top end), heading + subtitle
// (start), primary/secondary actions (bottom end), faint survey watermark.
@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './welcome-banner.component.html',
  styleUrl: './welcome-banner.component.scss',
})
export class WelcomeBannerComponent {
  // Personalized name shown in the greeting.
  readonly userName = input<string>('');

  // User asked to create a new survey.
  readonly newSurvey = output<void>();

  // User asked to start from a template.
  readonly useTemplate = output<void>();
}
