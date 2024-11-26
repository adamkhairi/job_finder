import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JobsSearchService } from "./jobs-search.service";
import { map, pipe } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { updateSignal } from "../../utils";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-jobs-list",
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: "./jobs-list.component.html",
  styleUrl: "./jobs-list.component.scss",
  providers: [JobsSearchService],
})
export class JobsListComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.search();
  }
  service = inject(JobsSearchService);
  destroyRef = inject(DestroyRef);
  form = {
    query: "Angular",
  };

  jobs = signal<any[]>([]);

  search() {
    const query = this.form.query;
    this.service
      .searchJobs(query)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        // map((s) => ({
        //   title: s.title,
        //   link: s.link,
        // })),
      )
      .subscribe((response: any) => {
        console.log(response);
        this.jobs.set(response);
      });
  }
}
