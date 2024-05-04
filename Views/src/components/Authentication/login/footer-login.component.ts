import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'footer-login',
  template: `
   <div fxLayout="column" fxLayoutAlign="center center"class="around" [style]="height">
    <div fxLayout="row">
      <div fxLayout="column">
     <mat-icon class="icon">{{icon}}</mat-icon>
      </div>
      <div  fxLayout="column"[style]="styleContainerTitle">
      <h3 class="title-text" [style]="titleStyle">{{title}}</h3>
      </div>
    </div>
   </div>
  `,
  styles: [`
.around{
  background-color: rgb(43, 161, 168);

  margin-right:-10px;
  margin-left:-16px;
}

.title-text{
    font-family: Mynerve;
    font-size:14.3px;
    color:white;
    /*margin-top:7px;*/
    margin-top:8px;

}
.icon{
     font-size:18px;
    color:white;
    margin-top:7px;
    margin-top:8px;
    margin-left:10px;
}

`],
  standalone: true,
  imports: [MatIconModule, FlexLayoutModule]
})
export class FooterLoginComponent {

  @Input() title: string;
  @Input() titleStyle: string;
  @Input() styleContainerTitle: string;
  @Input() icon: string;
  @Input() height: string;

}
