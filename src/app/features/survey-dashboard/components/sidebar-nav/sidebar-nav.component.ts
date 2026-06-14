import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IconComponent, IconName } from '../../../../shared/components/icon/icon.component';

// A single navigation entry.
interface NavItem {
  readonly label: string;
  readonly icon: IconName;
}

// Left sidebar navigation. Reproduces the Figma "Sidebar Navigation" frame:
// 13 nav items (Dashboard active) plus a Logout action pinned to the bottom.
@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
})
export class SidebarNavComponent {
  // Currently active item label (Dashboard by default, per the frame).
  readonly active = signal('Dashboard');

  // Navigation items in the exact order shown in the design.
  readonly items: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'My Surveys', icon: 'my-surveys' },
    { label: 'Entities', icon: 'entities' },
    { label: 'Roles & Permissions', icon: 'roles' },
    { label: 'User Management', icon: 'user-management' },
    { label: 'Survey Assignment', icon: 'survey-assignment' },
    { label: 'Evaluation', icon: 'evaluation' },
    { label: 'Database Records', icon: 'database' },
    { label: 'Question Bank', icon: 'question-bank' },
    { label: 'Sample Upload', icon: 'sample-upload' },
    { label: 'Economic Framework', icon: 'economic' },
    { label: 'Feature Library', icon: 'feature-library' },
    { label: 'Registered Accounts', icon: 'registered-accounts' },
  ];

  protected onSelect(label: string): void {
    this.active.set(label);
  }
}
