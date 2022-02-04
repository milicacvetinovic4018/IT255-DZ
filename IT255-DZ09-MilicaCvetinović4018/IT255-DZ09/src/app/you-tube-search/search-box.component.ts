import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

import { YouTubeSearchService } from './you-tube-search.service';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    // konvertuje unos sa tastature u observable tok
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // izvlači vrednost inputa
      .filter((text: string) => text.length > 1) // odbacuje ulaz ako je prazan
      .debounceTime(250)                         // na unos stringa pokreće pretragu za vreme do 250ms 
      .do(() => this.loading.emit(true))         // omogućava učitavanje
      // pretraga, odbacuju se stari događaji ukoliko se javi nov input
      .map((query: string) => this.youtube.search(query))
      .switch()
      // postupa po vraćanju rezultata
      .subscribe(
        (results: SearchResult[]) => { // uspešno (onSucces)
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // greška (onError)
          console.log(err);
          this.loading.emit(false);
        },
        () => { // kompletirano (onComplete)
          this.loading.emit(false);
        }
      );
  }
}
