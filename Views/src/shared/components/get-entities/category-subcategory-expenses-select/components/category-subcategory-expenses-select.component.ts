import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryExpenseDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto';
import { SubcategoryExpenseDto } from 'src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';




@Component({
  selector: 'select-category-subcategory-expenses',
  templateUrl: './category-subcategory-expenses-select.component.html',
  styleUrls: ['./category-subcategory-expenses-select.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    CategoryExpensesService,
  ]

})

export class CategorySubcategoryExpensesSelectComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fillersService: CategoryExpensesService,
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  fillersExpenses = new Observable<CategoryExpenseDto[]>();
  subcategoriesExpenses = new Observable<SubcategoryExpenseDto[]>();
  selectedCategoryExpensesId(id: number) {
    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        return x.find(Xid => Xid.id == id).subcategoriesExpenses
      }),
    )
    this.subcategoriesExpenses = selected;
  }


  ngOnInit(): void {
    this.fillersExpenses = this._fillersService.getFillers();
  }

}
