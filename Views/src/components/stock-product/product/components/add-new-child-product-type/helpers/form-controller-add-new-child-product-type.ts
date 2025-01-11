import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


import { SpecificitiesDto } from "src/components/stock-product/product/dtos/specificities-dto";
import { ValidatorsProductTypeEditAsyncField } from "../form-validators/validators-product-type-edit-async-field";
import { ProductTypeEdit } from "../../../dtos/produc-type-edit";
import { ex_makeDescription, ex_speed, ex_storage } from "../../common/helpers/product-type-helpers";


export class FormControllerAddNewChildProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,
    public _validatorsAsyncField: ValidatorsProductTypeEditAsyncField
  ) {
    super()
  }

  //Arrays
  speed$ = of(ex_speed);
  storage$ = of(ex_storage);

  //Variables
  speedMeasure = ''
  storageMeasure = ''

  //FORMS
  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  get manufacturers() {
    return this.segmentForm.get('manufacturers') as FormArray
  }
  get models() {
    return this.manufacturerForm.get('models') as FormArray
  }

  //FormGroups
  segmentForm!: FormGroup;
  manufacturerForm!: FormGroup;
  modelForm!: FormGroup;
  specificitiesForm!: FormGroup;

  //Validators
  nameMaxLength = 50;
  descriptionMaxLength = 500;

  speedFormControl = new FormControl(null, Validators.required);
  speedSearchFormControl = new FormControl('', Validators.required);
  capacityFormControl = new FormControl(null, Validators.required);
  capacitySearchFormControl = new FormControl('', Validators.required);

  formLoad(productType?: ProductTypeEdit) {
    this.formMain = this._fb.group({
      id: [productType?.productTypeId ?? 0, [Validators.required]],
      name: new FormControl(productType?.productTypeName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)] }),
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadSegment(productType?: ProductTypeEdit) {
    return this.segmentForm = this._fb.group({
      id: [productType?.segmentId ?? 0, [Validators.required]],
      name: new FormControl(productType?.segmentName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateSegmentAsync(productType?.productTypeId)] }),
      companyId: [this.companyId, [Validators.required]],
      productId: [0, []],
      registered: [new Date(), [Validators.required]],
      manufacturers: this._fb.array([], Validators.required)
    })
  }

  formLoadManufacturer(productType?: ProductTypeEdit) {
    return this.manufacturerForm = this._fb.group({
      id: [productType?.manufacturerId ?? 0, [Validators.required]],
      name: new FormControl(productType?.manufacturerName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateManufacturerAsync(productType?.segmentId)] }),
      companyId: [this.companyId, [Validators.required]],
      segmentId: [0, []],
      registered: [new Date(), [Validators.required]],
      models: this._fb.array([], Validators.required)
    })
  }

  formLoadModel(productType?: ProductTypeEdit) {
    return this.modelForm = this._fb.group({
      id: [0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      name: new FormControl('', { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateModelAsync(productType?.manufacturerId)] }),
      manufacturerId: 0,
      registered: [new Date(), [Validators.required]],
      specificities: this.formLoadSpecificities()
      // specificities: this._fb.array([], Validators.required)
    })
  }

  formLoadSpecificities(specificities?: SpecificitiesDto) {
    return this.specificitiesForm = this._fb.group({
      id: [specificities?.id ?? 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      speed: new FormControl({ value: specificities?.speed ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      capacity: new FormControl({ value: specificities?.capacity ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      generation: ['', []],
      description: new FormControl({value:'', disabled:true}, [Validators.required, Validators.maxLength(this.descriptionMaxLength)]),
      detailedDescription: ['', []],
      manufacturerLink: ['http://', []],
      registered: [new Date(), [Validators.required]],
    })
  }

  formDisabledToStart = () => {
    this?.formMain?.get('name')?.disable();

    if (this?.formMain?.get('segments')?.get('0').get('id').value != 0)
      this?.formMain?.get('segments')?.get('0').get('name')?.disable();

    if (this?.formMain?.get('segments')?.get('0').get('manufacturers').get('0').get('id').value != 0)
      this?.formMain?.get('segments')?.get('0').get('manufacturers').get('0').get('name')?.disable();

  }

  makeDescription = () =>{
    ex_makeDescription(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm, this.speedMeasure, this.storageMeasure, 'edit')
  }
  
  formEnableToSave = () => {
    this?.formMain?.get('name')?.enable();
    this?.formMain?.get('segments')?.get('0').get('name')?.enable();
    this?.formMain?.get('segments')?.get('0').get('manufacturers').get('0').get('name')?.enable();
  }

  formControlReset = () => {
    this.speedFormControl.reset();
    this.speedSearchFormControl.reset();
    this.capacityFormControl.reset();
    this.capacitySearchFormControl.reset();
  }



}
