import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchGModule } from '../../search-g/modules/search-g.module';

import { GridListOptsSearchComponent } from '../grid-list-opts-search.component';
import { GridListOptsComponent } from '../grid-list-opts.component';
import { GridListOptsTitleComponent } from '../grid-list-opts-title.component';
import { GridListOptsTableComponent } from '../grid-list-opts-table.component';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ReserveSellChecksComponent } from 'src/components/product/components/reserve-sell-list/reserve-sell-checks.component';

@NgModule({
  declarations: [
    GridListOptsComponent,
    GridListOptsTableComponent,
    GridListOptsSearchComponent,
    GridListOptsTitleComponent,
    ReserveSellChecksComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    //My
    // SharedModule,
    SearchGModule
  ],
  exports: [
    GridListOptsComponent,
    GridListOptsTableComponent,
    GridListOptsSearchComponent,
    GridListOptsTitleComponent,
  ],
  providers: [
    PtBrDataPipe
  ]
})
export class GridListModule { }
