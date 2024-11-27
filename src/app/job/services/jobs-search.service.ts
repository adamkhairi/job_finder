import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";

export interface SearchResponse {
  items: any[];
  searchInformation: {
    totalResults: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class JobsSearchService {
  http = inject(HttpClient);

  private apiKey = environment.GOOGLE_API_KEY;
  private searchEngineId = environment.GOOGLE_SEARCH_ENGINE_ID;
  private readonly maxResultsPerPage = 10;

  searchJobs(query: string, page: number): Observable<SearchResponse> {
    const start = ((page - 1) * this.maxResultsPerPage) + 1;
    const q = `${query} Maroc`;

    const params = new HttpParams({
      fromObject: {
        q: q,
        cx: this.searchEngineId,
        key: this.apiKey,
        excludeTerms: 'Java',
        dateRestrict: 'w[3]',
        start: start.toString(),
        sort: 'date',
        //num: this.maxResultsPerPage.toString()
      }
    });

    const url = 'https://customsearch.googleapis.com/customsearch/v1';

    return this.http.get<SearchResponse>(url, { params });
  }
}
