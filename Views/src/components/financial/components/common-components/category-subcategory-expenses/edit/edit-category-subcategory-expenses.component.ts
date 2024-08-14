import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { CategorySubcategoryExpensesSelectAddComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select-add/components/category-subcategory-expenses-select-add.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CategoryExpensesDto } from '../../../month-fixed-expenses/dto/category-expenses-dto';
import { SubcategoryExpensesDto } from '../../../month-fixed-expenses/dto/subcategory-expenses-dto';
import { CategorySubcategoryExpensesService } from '../services/category-subcategory-expenses.service';

@Component({
  selector: 'edit-category-subcategory-expenses',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    NgFor,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    CategorySubcategoryExpensesSelectAddComponent

  ],
  templateUrl: './edit-category-subcategory-expenses.component.html',
  styleUrls: ['./edit-category-subcategory-expenses.component.css']
})
export class EditCategorySubcategoryExpensesComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _service: CategorySubcategoryExpensesService,
    private _dialog: MatDialog,
  ) {
    super(_breakpointObserver);
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // radios:string[]=['Adicionar','Editar'];
  screenFieldPosition: string = 'column';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })


  }
  
  deleteCategory(x: CategoryExpensesDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: x.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${x.name}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        this.fillersExpenses.pipe(
          map((x: CategoryExpensesDto[]) => {
            x.forEach(Xid => {
              if (Xid.id == result.id){
                Xid.deleted = true;
                Xid.subcategoriesExpenses.forEach(x=> x.deleted = true)
              }
              this.makeFormBeforeSaveUpdate();
              this._service.updateOrSave(this.formMain);
            })
          }),
        ).subscribe();
      }

    })
  }

  findToDelete(){
   const id: number = this.formMain.get('name').value;
    this.fillersExpenses.pipe(
      map((x: CategoryExpensesDto[]) => {
        x.forEach(Xid => {
          if (Xid.id == id)
          this.deleteCategory(Xid)
        })
      }),
    ).subscribe();
  }


  editChk: boolean = true;
  btnSave: boolean = true;
  editCheck(edit: MatCheckbox) {
    if (edit.checked)
      this.editChecked(!edit.checked)
    else
      this.editUnChecked(!edit.checked);
  }

  editChecked(checked: boolean) {
    const id: number = this.formMain.get('subcategoriesExpenses').get('0').get('categoryExpensesId').value;
    this.delete = false;
    this.getSubcategories.controls.forEach(x => x.enable())
    this.btnSave = checked;
    this.editChk = checked;
    this.fillersExpenses.pipe(
      map((x: CategoryExpensesDto[]) => {
        x.forEach(Xid => {
          if (Xid.id == id)
            this.formLoadEditCategory(Xid);
        })
      }),
    ).subscribe();
  }

  editUnChecked(checked: boolean) {
    this.getSubcategories.controls.forEach(x => x.disable())
    this.btnSave = checked;
    this.editChk = checked;
    this.formLoadEditCat.reset();
    this.delete = true;
  }

  disableToAdd: boolean = false;
  delete: boolean = false;
  selectedCategoryExpensesId(id: number) {

    if (this.formMain.get('name').value == -1) {
      this.disableToAdd = true;
      this.formLoadEditCat.get('name').setValue('Nova Categoria');
      this.formLoadEditCat.get('id').setValue(0);
      this.editChk = false;
      this.btnSave = false;
      this.delete = false;
    }
    else {
      this.disableToAdd = false;
      this.editChk = true;
      this.btnSave = true;
      this.delete = true;
    }

    this.getSubcategories.clear();
    this.getSubcategories.reset();

    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpensesDto[]) => {
        return x.find(Xid => Xid.id == id).subcategoriesExpenses
      }),
    ).subscribe(
      x => {
        this.subcategoryFormLoaded(x);
      });

  }

  back() {
    window.history.back();
  }

  formLoad(x?: CategoryExpensesDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name || '', [Validators.required, Validators.maxLength(30)]],
      companyId: [x?.companyId || this.companyId, []],
      subcategoriesExpenses: this._fb.array([]),
      deleted: [false, []],
    })
    this.subcategoryFormLoaded(x?.subcategoriesExpenses);
  }

  formLoadEditCat: FormGroup;
  formLoadEditCategory(x?: CategoryExpensesDto) {
    this.formLoadEditCat = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name.toUpperCase() || '', [Validators.required, Validators.maxLength(30)]],
    })
  }

  subcategoryFormLoaded(x?: SubcategoryExpensesDto[]) {
    x?.forEach(y => {
      this.getSubcategories.push(
        this._fb.group(
          {
            id: [y?.id || 0, [Validators.required]],
            name: [{ value: y?.name.toUpperCase() || '', disabled: true }, [Validators.required, Validators.maxLength(30)]],
            categoryExpensesId: [y?.categoryExpensesId || 0, []],
            deleted: [y?.deleted || false, []],
          }
        )
      )
    });
  }

  get getSubcategories() {
    return <FormArray>this.formMain.get('subcategoriesExpenses')
  }



  subcategoryFormLoad() {
    return this._fb.group({
      id: [0, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      categoryExpensesId: [0, []],
      deleted: [false, []],
    })
  }

  addSubcategories() {
    this.getSubcategories.push(this.subcategoryFormLoad());
    this.validationSubcategory();
  }


  isExists(value: string) {
    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpensesDto[]) => {
        if (x.find(xy => xy.name.toLowerCase() == value.toLowerCase()))
          this.validationCategoryIsExist();
      }),
    ).subscribe();
  }

  removeSubcategory(index: number) {
    this.getSubcategories.controls.forEach((value, ind) => {
      if (index == ind) {

        value.get('deleted').setValue(true);

        console.log(value)

        if (!value.valid)
          this.getSubcategories.removeAt(index);

        if (value.valid && value.value.id == 0)
          this.getSubcategories.removeAt(index);

      }

    })


    this.validationSubcategory();
  }


  validationSubcategory() {
    let length = false;

    this.getSubcategories.controls.forEach(x => {
      if (x.get('deleted').value != true) {
        length = true;
      }
      else {
        this.formLoadEditCat.controls['name'].setErrors({ requiredSubcategory: true });
        console.log('passou aqui')
        length = false;
      }

    })

    if(!length)
    this.formLoadEditCat.controls['name'].setErrors({ requiredSubcategory: true });
    // this.formLoadEditCat.controls['name'].setErrors(null);

    console.log(this.formLoadEditCat)
    return length;
    // if (this.getSubcategories.length == 0)
    //   this.formMain.controls['name'].setErrors({ requiredSubcategory: true })
    // else
    //   this.formMain.controls['name'].setErrors(null);
  }

  requiredSubcategory() {
    return this.formMain?.get('name')?.hasError('requiredSubcategory')
      ? `${'Subcategoria' + ' Preenchimento obrigatório.'}` : ''
  }

  validationCategoryIsExist() {
    this.formMain.controls['name'].setErrors({ alreadyExists: true })
    this.formLoadEditCat.controls['name'].setErrors({ alreadyExists: true })
  }

  categoryIsExist() {
    return this.formMain?.get('name')?.hasError('alreadyExists')
      ? `${'Categoria já cadastrada!'}` : ''
  }



  save() {
    if (this.validationSubcategory()) {

      this.makeFormBeforeSaveUpdate();

      if (this.alertSave(this.formMain))
        this._service.updateOrSave(this.formMain)
    };
  }


  // processingBeforeSaveUpdate() {

  //   if (this.formLoadEditCat.get('id').value)
  //     this.makeFormBeforeSaveUpdate();

  // }

  makeFormBeforeSaveUpdate() {
    const id = this.formLoadEditCat.get('id').value;
    const name = this.formLoadEditCat.get('name').value;

    this.formMain.get('id').setValue(id);
    this.formMain.get('name').setValue(name);
  }



  fillersExpenses = new Observable<CategoryExpensesDto[]>();
  newCat() {
    const newCategory = new CategoryExpensesDto();
    newCategory.id = -1;
    newCategory.name = "INSERIR -- (NOVA CATEGORIA)";
    return newCategory;
  }

  ngOnInit(): void {
    this.formLoad();
    this.formLoadEditCategory();
    // this._service.getFillers().subscribe((x: CategoryExpensesDto[]) => {
    //   this.formLoad(x);
    // })

    this.screen();

    //this.fillersExpenses = this._service.getFillers()
    this.fillersExpenses = this._service.getFillers().pipe(
      map(x => [...x, this.newCat()])
    )
    // this.addSubcategories();
  }
}
