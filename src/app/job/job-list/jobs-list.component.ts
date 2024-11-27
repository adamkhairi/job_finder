import { AfterViewInit, Component, computed, DestroyRef, inject, signal, } from "@angular/core";
import { JobsSearchService } from "../services/jobs-search.service";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { JobItemComponent } from "../job-item/job-item.component";

interface PaginationState {
  currentPage: number;
  totalResults: number;
}

@Component({
  selector: "app-job-list",
  imports: [ReactiveFormsModule, FormsModule, CommonModule, JobItemComponent],
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"],
  standalone: true,
  providers: [JobsSearchService],
})
export class JobsListComponent implements AfterViewInit {
  service = inject(JobsSearchService);
  destroyRef = inject(DestroyRef);

  jobs = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  currentQuery = signal<string>("");

  pagination = signal<PaginationState>({
    currentPage: 1,
    totalResults: 0
  });

  // Computed values for pagination
  totalPages = computed(() =>
    Math.min(Math.ceil(this.pagination().totalResults / 10), 10) // Google API limit of 100 results (10 pages)
  );

  resultRange = computed(() => {
    const start = ((this.pagination().currentPage - 1) * 10) + 1;
    const end = Math.min(this.pagination().currentPage * 10, this.pagination().totalResults);
    return { start, end };
  });

  form = new FormGroup({
    query: new FormControl<string>("Angular"),
  });

  ngAfterViewInit(): void {
    this.search();
  }

  search() {
    if (this.isLoading()) return;
    this.pagination.update(state => ({ ...state, currentPage: 1 }));
    this.currentQuery.set(this.form.value.query || "");
    this.fetchJobs(true);
  }

  private fetchJobs(isNewSearch: boolean = false) {
    this.isLoading.set(true);
    this.service
      .searchJobs(this.currentQuery(), this.pagination().currentPage)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this.jobs.set(response.items || []);
        // Only update total results on new search
        if (isNewSearch) {
          this.pagination.update(state => ({
            ...state,
            totalResults: parseInt(response.searchInformation.totalResults, 10)
          }));
        }
      });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.pagination.update(state => ({
      ...state,
      currentPage: page
    }));
    this.fetchJobs(false);
  }

  nextPage() {
    this.goToPage(this.pagination().currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.pagination().currentPage - 1);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.pagination().currentPage;
    const pages: number[] = [];

    // Show maximum 5 page numbers
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }

    return pages;
  }
}
