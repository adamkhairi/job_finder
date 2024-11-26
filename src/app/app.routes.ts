import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/jobs-list/jobs-list.component").then(
        (m) => m.JobsListComponent,
      ),
  },
];
