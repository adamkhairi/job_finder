import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./job/job-list/jobs-list.component").then(
        (m) => m.JobsListComponent,
      ),
  },
];
