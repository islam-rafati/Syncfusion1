import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

// Top application bar. Reproduces the Figma "Header" frame:
// hamburger + logo + title on the start side, 3 icon actions + avatar on the
// end side, on a white rounded surface with a subtle bottom shadow.
@Component({
  selector: 'app-app-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {}
