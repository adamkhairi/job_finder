import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobsSearchService } from './jobs-search.service';
import { map, pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { updateSignal } from '../../utils';

@Component({
  selector: 'app-jobs-list',
  imports: [],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
})
export class JobsListComponent {
  service = inject(JobsSearchService);
  destroyRef = inject(DestroyRef);
  form = {
    query: '',
  };

  jobs = signal([]);

  search() {
    const query = this.form.query;
    this.service
      .searchJobs(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: any) => {
        response.console.log();
        this.jobs.set(response.items);
      });
  }
}
