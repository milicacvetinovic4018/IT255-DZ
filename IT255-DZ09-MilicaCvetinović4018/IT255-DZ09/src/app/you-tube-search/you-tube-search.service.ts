import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { SearchResult } from './search-result.model';

/*
  Ovaj API ključ možda neće raditi kod vas. Najbolja opcija jeste da obezbedite
  vlastiti API ključ prateći sledeće instrukcije:
  https://developers.google.com/youtube/registering_an_application#Create_API_Keys

  Ovde se koristi **server key** - neophodno je da je obezbeđen YouTube.

  Ukoliko koristite ovaj ključ API key, funkcionalnost će biti moguća samo ako je URL u
  vašem pregledaču "localhost"
*/
export const YOUTUBE_API_KEY =
  'AIzaSyAFmuZdw5VxPiV-Tvm0KY3i9xZXlOhFK5o';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';

/**
 * YouTubeService se povezuje na  YouTube API
 * Pogledajte: * https://developers.google.com/youtube/v3/docs/search/list
 */
@Injectable()
export class YouTubeSearchService {
  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) {}

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).map((response:any) => {
      return <any>response['items'].map((item:any) => {
        // console.log("raw item", item); // uklonite komentar za debug
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    });
  }
}
