import { Injectable, OnDestroy } from "@angular/core";
import { SearchType } from "./search-type";
import { Observable, Subscription, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class SearchFilterFrontService implements OnDestroy {

  constructor() { }

  searchResult: SearchType[] = [];
  searchResultReturn: Observable<SearchType[]> = new Observable<SearchType[]>();

  public makeEntitySearch(obj: any, params: any) {
    obj.map((x: any) => {
      let objSelected = new SearchType();
      objSelected.id = x[params.param0];
      objSelected.name = x[params.param1]
      objSelected.type = params.type;
      this.searchResult.push(objSelected);
    })
    this.searchResultReturn = of(this.searchResult);
    return of(this.searchResultReturn);
  }

  toDestroy: Subscription;
  // public searchFilter(param: string) {
  //   this.searchResult = [];
  //   this.toDestroy = this.searchResultReturn.pipe(map(x => x.filter(xy => {
  //     if (xy.type === param) {
  //       this.searchResult.push(xy)
  //     }
  //     if (param === 'everyone') {
  //       this.searchResult.push(xy)
  //     }
  //   }))).subscribe();
  // }

  indexStepperCollectDeliver:number;

  public genericFilter(param: string) {
    this.searchResult = [];
    this.toDestroy = this.searchResultReturn.pipe(map(x => x.filter(xy => {
      if (xy.name.toLowerCase().includes(param.toLowerCase())) {
        this.searchResult.push(xy)
      }
    }))).subscribe();
  }

  ngOnDestroy(): void {
    this.toDestroy.unsubscribe();
  }
}


