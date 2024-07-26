import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BtnGComponent } from '../btn-g/btn-g.component';
import { SubTitleComponent } from '../sub-title/sub-title.component';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    SubTitleComponent,
    BtnGComponent
  ],
  template: `
    <mat-card>
      <sub-title title class="font-title" [title]="'Confirmação de exclusão'" [styleContainerTitle]="'padding-top:8px;'" [titleStyle]="'font-family: Mynerve; font-size: 24px; '" [titleBarStyle]="test"></sub-title>

       <mat-dialog-content style="padding-top: 20px">
          <span class="font-body">{{messageBody}}</span><span class="itemToBeDelete">{{itemToBeDelete}}</span><span>?</span>
         </mat-dialog-content>

              <div fxLayout="row"  class="margin" fxLayoutGap="30px">
                <div fxLayout="column" fxFlex>
                </div>
                <div fxLayout="column">
                 <btn-g mat-dialog-close [name]="'Cancelar'" [icon]="'cancel'" [styleColors]="'font-size: 15px;color: white;background-color: rgb(110,110,110);'" (click)="clickedNo('cancel')"></btn-g>
                </div>
                <div fxLayout="column">
                 <btn-g mat-dialog-close [name]="'Apagar'" [icon]="'delete_outline'" [styleColors]="'font-size: 15px;color: white;background-color: rgb(156,33,29);'" (click)="clickedYes(this.id,'yes')"></btn-g>
              </div>
       </div>
    </mat-card>
`,
  styles: [
    ` .delete-dialog-class {
      mat-dialog-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          border-top-right-radius: 20px;
          border-top-left-radius: 20px;
          padding: -330px;
          overflow: hidden;
          width: 100%;
          height: 100%;
      }
  }

      mat-card{
       margin-top: -5px;
       margin-left: -25px;
       margin-right: -25px;
       margin-bottom: -25px
      }

      .font-body{
        font-family: Mynerve;
      }
      .margin{
        margin-top:30px;
      }
      .itemToBeDelete{
        font-family: Mynerve;
        font-weight: bold;
        color: rgb(156,33,29);

      }

   `
  ]
})
export class DeleteDialogComponent implements OnInit {

  messageBody: string;
  itemToBeDelete: string;
  btn1: string;
  btn2: string;
  id: number;

  constructor(
    private _DialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,


  ) {

    this.messageBody = this.data.messageBody;
    this.itemToBeDelete = this.data.itemToBeDelete;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
    this.id = this.data.id;
  }

  test:string = `
  background-color: rgb(43, 161, 168);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height:60px;
  margin-top:-35px;
  margin-right:-16px;
  margin-left:-16px;
  top:18px
  `

  clickedYes(id: number, yes: string) {
    this._DialogRef.close({ id: id });
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }

  ngOnInit(): void {
  }

}
