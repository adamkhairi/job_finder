import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsSearchService {
  http = inject(HttpClient);

  private apiKey = process.env['GOOGLE_API_KEY'];
  private searchEngineId = process.env['GOOGLE_SEARCH_ENGINE_ID'];

  searchJobs(query: string) {
    const url = `https://customsearch.googleapis.com/customsearch/v1?q=${query}&cx=${this.searchEngineId}&key=${this.apiKey}`;
    return this.http.get(url).pipe(tap(console.log));
  }
}
