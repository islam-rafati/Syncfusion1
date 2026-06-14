import { Component, input } from '@angular/core';
import { SidebarItemComponent } from './sidebar-item.component';

// Shape of one navigation entry passed into the sidebar.
// The parent receives an array of these and renders one row each.
export interface SidebarNavItem {
  label: string; // Arabic label shown to the user
  iconPath: string; // SVG path data for the 24x24 icon
  route?: string; // internal router path (enables active detection)
  href?: string; // external URL (use instead of route)
  disabled?: boolean; // show but make non-interactive
  badge?: string | number; // optional count / status pill
}

// ============================================================
// Sidebar (parent)
//
// Renders the brand block + a <nav> landmark, then maps each
// nav item to a <kw-sidebar-item> child row. The parent only
// owns layout + data; each row handles its own states.
//
// OPTIONAL Angular Material wrapper (NOT a hard dependency):
//   Material is intentionally NOT imported here so the sidebar
//   works on its own. If you later want Material ripples/menus:
//     1. npm install @angular/material @angular/cdk
//     2. Create a thin wrapper component/directive (e.g. add
//        matRipple to the .item element in sidebar-item.html, or
//        wrap rows in <mat-nav-list>/<a mat-list-item>).
//     3. Keep this core component untouched so it still runs
//        without Material installed.
// ============================================================
@Component({
  selector: 'kw-sidebar',
  standalone: true,
  imports: [SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  // Navigation entries to render. Provided by the host layout.
  readonly items = input<SidebarNavItem[]>([]);

  // Collapsed (icon-only) mode, mirrors the existing layout sidebar.
  readonly collapsed = input<boolean>(false);

  // Brand text shown next to the mark when expanded.
  readonly brandName = input<string>('الخوارزمي');

  // Accessible name for the <nav> landmark (helps screen readers).
  readonly navLabel = input<string>('التنقل الرئيسي');
}
