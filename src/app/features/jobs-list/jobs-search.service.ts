import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";
import { environment } from "../../../environment/environment";

@Injectable({
  providedIn: "root",
})
export class JobsSearchService {
  http = inject(HttpClient);

  private apiKey = environment.GOOGLE_API_KEY;
  private searchEngineId = environment.GOOGLE_SEARCH_ENGINE_ID;

  searchJobs(query: string) {
    const url1 = `https://www.googleapis.com/customsearch/v1?key=<span class="math-inline">${this.apiKey}&cx=</span>${this.searchEngineId}&q=${encodeURIComponent(query)}`;
    const url = `https://customsearch.googleapis.com/customsearch/v1?q=${query}&cx=${this.searchEngineId}&key=${this.apiKey}`; // &siteSearch=linkedin;
    return this.http.get<any>(url).pipe(map((s) => s.items));
  }
}
