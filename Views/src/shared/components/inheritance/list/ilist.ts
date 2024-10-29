import { PageEvent } from "@angular/material/paginator";
import { IEntityGridAction } from "../../grid-list-common/interface/entity-grid-action";
import { Observable } from "rxjs";

export interface IList {

  ngAfterViewInit(): void
  onPageChange($event: PageEvent): void;
  onPageChangeBack($event: PageEvent): void;
  onPageChangeFront(event: PageEvent): void;
  getEntity($event: IEntityGridAction, itemWillDeleted: string): void;
  add(): void
  view(url: string, id: number): void;
  edit(url: string, id: number): void;
  orderByFrontEnd(entities$: Observable<any[]>, field: any): void;
  searchField(entities: any[], currentPage: number, pageSize: number, term: string): Observable<any[]>;
  delete(entity: any, itemWillDeleted: string): void;
  removeNonNumericAndConvertToNumber(str: string): number;
  removeAccentsSpecialCharacters(value: string): string;
  filterBySelectedMonth(entities: any[], currentPage: number, pageSize: number, selectedMonth: number, field:string): Observable<any[]>;
  getByCurrentYear(entities: any[], currentPage: number, pageSize: number, field: string): Observable<any[]>;
  getCurrentByCurrentYearAndSelectedMonth(entities: any[], currentPage: number, pageSize: number, selectedMonth: number, field:string):Observable<any[]>;
  lengthPaginatorByCurrentYearAndSelectedMonth(entities: any[], selectedMonth: number, field: string): number;
  lengthPaginatorByCurrentYear(entities: any[], field: string):number;
  lengthPaginatorNoFilter(entities: any[]):number;
}
