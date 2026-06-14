import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// ============================================================
// Sidebar Item — the "Atom / context menu" navigation row.
//
// One row = one navigation entry. The PARENT owns the data and
// passes it down through inputs; this CHILD only renders a row.
// This keeps the components small, modular and easy to reuse.
//
// The row adapts to how it is used:
//   - route present  -> internal <a routerLink> (active = router)
//   - href present   -> external <a href>       (active = input)
//   - neither        -> <button> action row     (active = input)
//   - disabled       -> non-interactive <span>
// ============================================================
@Component({
  selector: 'kw-sidebar-item',
  standalone: true,
  // NgTemplateOutlet lets us write the row content once and reuse it
  // across the link / button / disabled variants (DRY, no duplication).
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent {
  // SVG path data for a 24x24 icon (inline SVG = no icon-font dependency).
  readonly iconPath = input<string>('');

  // Visible Arabic label for the row.
  readonly label = input<string>('');

  // Internal route. When set, Angular Router decides the active state.
  readonly route = input<string | undefined>(undefined);

  // External URL. Use instead of `route` for links outside the app.
  readonly href = input<string | undefined>(undefined);

  // Manual active flag. Used for href/button rows where the router
  // cannot detect the active state automatically.
  readonly active = input<boolean>(false);

  // Disabled rows are shown but cannot be focused or activated.
  readonly disabled = input<boolean>(false);

  // Optional badge (e.g. a count). Rendered at the inline-end of the row.
  readonly badge = input<string | number | undefined>(undefined);

  // When collapsed the row hides its label/badge and shows the icon only.
  readonly collapsed = input<boolean>(false);
}
