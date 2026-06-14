import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { IconComponent, IconName } from '../../../../shared/components/icon/icon.component';
import { SurveyRow } from '../../models/survey-row.model';

// A single entry in the row overflow (three-dots) menu.
interface RowMenuItem {
  readonly action: string;
  readonly label: string;
  readonly icon: IconName;
  readonly danger?: boolean; // red styling (e.g. Move to Trash)
}

// Survey data table. Reproduces the Figma "Survey Table": 10 fixed columns,
// lavender header, 52px rows with divider lines. Built as a semantic table
// for exact column-width and alignment control.
@Component({
  selector: 'app-surveys-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './surveys-table.component.html',
  styleUrl: './surveys-table.component.scss',
})
export class SurveysTableComponent {
  // Rows to render (already mapped to the presentational view-model).
  readonly rows = input.required<SurveyRow[]>();

  // User toggled the favorite star for a row (emits survey id).
  readonly favoriteToggle = output<string>();

  // User opened the report for a row.
  readonly reportOpen = output<string>();

  // User chose an item from a row's overflow menu (emits action + row id).
  readonly actionSelect = output<{ action: string; id: string }>();

  // Id of the row whose overflow menu is currently open (null = none).
  readonly openMenuId = signal<string | null>(null);

  // Overflow menu items — matches the Figma "Overflow menu" frame exactly.
  readonly menuItems: RowMenuItem[] = [
    { action: 'copy-link', label: 'Copy Link', icon: 'link' },
    { action: 'add-favorite', label: 'Add to Favorites', icon: 'bookmark' },
    { action: 'save-template', label: 'Save as Template', icon: 'launch' },
    { action: 'edit', label: 'Edit Survey', icon: 'edit' },
    { action: 'duplicate', label: 'Duplicate Survey', icon: 'content-copy' },
    { action: 'releases', label: 'Manage Releases', icon: 'layers' },
    { action: 'close', label: 'Close Survey', icon: 'lock' },
    { action: 'archive', label: 'Archive Survey', icon: 'archive' },
    { action: 'trash', label: 'Move to Trash', icon: 'delete', danger: true },
  ];

  // Toggle the overflow menu for a given row.
  protected onActionClick(id: string): void {
    this.openMenuId.update((current) => (current === id ? null : id));
  }

  // Run a menu action, then close the menu.
  protected onMenuItem(action: string, id: string): void {
    this.actionSelect.emit({ action, id });
    this.openMenuId.set(null);
  }

  // Close any open menu (used by the click-outside backdrop).
  protected closeMenu(): void {
    this.openMenuId.set(null);
  }
}
