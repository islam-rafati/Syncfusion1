import { Routes } from '@angular/router';

// Lazy-loaded routes for the survey dashboard feature.
export const SURVEY_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./survey-dashboard.component').then((m) => m.SurveyDashboardComponent),
  },
];
