import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

// Application shell: collapsible sidebar + top header + routed content.
// Owns the sidebar collapsed state because both the header (toggle button)
// and the sidebar (display) depend on it.
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  // Whether the sidebar is collapsed (narrow, icon-only mode).
  readonly collapsed = signal(false);

  // Toggle handler invoked by the header's menu button.
  toggleSidebar(): void {
    this.collapsed.update((value) => !value);
  }
}
