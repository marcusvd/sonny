import { HttpClient } from "@angular/common/http";
import { Injectable, ɵRender3ComponentRef } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { IBackEndService } from "./contracts/ibackend.service";

Injectable({
  providedIn: 'root'
})


export abstract class BackEndService<T, ID> implements IBackEndService<T, ID> {


  constructor(
    protected _Http: HttpClient,
    protected _BackEnd?: string,
    protected _BackEndIncluded?: string,
  ) {

  }

  add$<T>(record: T): Observable<T> {
    return this._Http.post<T>(this._BackEnd, record);
  }
  loadAll$<T>(): Observable<T[]> {
    return this._Http.get<T[]>(this._BackEnd).pipe(take(1));
  }
  getByIdAsync<T>(id:number): Observable<T> {
    return this._Http.get<T>(`${this._BackEnd}/${id}`)
   }

  loadById$<T>(id: number): Observable<T> {
    return this._Http.get<T>(`${this._BackEnd}/${id}`).pipe(take(1));
  }
  loadByIdIncluded$<T>(id: number): Observable<T> {
    return this._Http.get<T>(`${this._BackEndIncluded}/${id}`).pipe(take(1));
  }
  update$<T>(record: any): Observable<T> {
    return this._Http.put<T>(`${this._BackEnd}/${record.id}`, record).pipe(take(1));
  }
  remove$<T>(ID: T): Observable<T> {
    return this._Http.delete<T>(`${this._BackEnd}/${ID}`).pipe(take(1))
  }
  delete$<T>(APIURL: string): Observable<T> {
   return this._Http.delete<T>(`${APIURL}`).pipe(take(1));
  }


}
