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
    const searchEngineId = this.searchEngineId;
    const apiKey = this.apiKey;
    const exclude = 'Java';
    const dateRestrict = 'm[1]'
    const url = `https://customsearch.googleapis.com/customsearch/v1?q=${query}&cx=${searchEngineId}&key=${apiKey}&excludeTerms=${exclude}&dateRestrict=${dateRestrict}`; // &siteSearch=linkedin;
    return this.http.get<any>(url).pipe(map((s) => s.items));
  }
}
