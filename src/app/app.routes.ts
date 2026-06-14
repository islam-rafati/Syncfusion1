import { Routes } from '@angular/router';

// Top-level routing tree.
//
// The survey dashboard reproduces a complete Figma frame that already includes
// its own sidebar + app bar, so it is routed as a standalone full-page view
// (NOT nested inside the generic MainLayout shell, which would double the
// navigation chrome).
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/survey-dashboard/survey-dashboard.routes').then(
        (m) => m.SURVEY_DASHBOARD_ROUTES,
      ),
  },
];
