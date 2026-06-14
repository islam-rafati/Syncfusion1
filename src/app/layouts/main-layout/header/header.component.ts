import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

// Top application header: sidebar toggle, page title, notifications, user.
// Icons are inline SVG to avoid an icon-font dependency in the skeleton;
// swap to Angular Material components once Material is installed.
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // Emitted when the user clicks the sidebar toggle button.
  readonly toggleSidebar = output<void>();

  // Auth service exposes the current user signal for display.
  private readonly auth = inject(AuthService);
  readonly user = this.auth.user;
}
