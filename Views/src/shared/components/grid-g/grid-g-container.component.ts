import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { Observable } from "rxjs";
// import {  } from "events";

@Component({
  selector: 'grid-g-container',
  template: `
  <div fxLayoutAlign="center center">
    <grid-g>
        <grid-g-header header [titlesHeader]="titlesHeader"></grid-g-header>
        <search-g search [inputFxFlex]="searchInputFxFlexSize" (queryField)="outputFieldSearch($event)">
          <ng-content found select="[found]"></ng-content>
        </search-g>
        <grid-g-items items-body [fieldsInEnglish]="fieldsInEnglish" [entities]="entities$"></grid-g-items>
        <ng-content pgNgContent select="[pgNgContent]"></ng-content>
    </grid-g>
</div>
  `,

})

export class GridGContainer {
  //header
  @Input() titlesHeader: string[] = [];
  //searchField
  @Input() searchInputFxFlexSize: number;
  @Output() queryField = new EventEmitter<FormControl>();
  outputFieldSearch($event: FormControl) {
    const queryField = $event;
    this.queryField.emit(queryField);
  }
  //grid-itens
  @Input() fieldsInEnglish: string[] = [];
  @Input() entities$ = new Observable<any[]>();

}
