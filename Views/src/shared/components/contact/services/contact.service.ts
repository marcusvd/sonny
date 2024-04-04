import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ContactDto } from "src/shared/dtos/contact-dto";
import { SocialMediasDto } from "src/shared/dtos/social-medias-dto";
import { BaseForm } from "src/shared/helpers/forms/base-form";
@Injectable()
export class ContactService extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  formLoad(contact?: ContactDto) {

   return  this.formMain = this._fb.group({
      id: [contact?.id || 0, [Validators.required]],
      email: [contact?.email || '', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: [contact?.cel || '', [Validators.required, Validators.minLength(11)]],
      zap: [contact?.zap || '', [Validators.required, Validators.minLength(11)]],
      landline: [contact?.landline || '', [Validators.required, Validators.minLength(10)]],
      site: [contact?.site || '', [Validators.maxLength(150)]],
      socialMedias: this._fb.array([])
    });

  }

  seedingSocialnetworks(socialMedias?: SocialMediasDto[]) {

    socialMedias?.forEach((item: SocialMediasDto) => {
      return this.socialNets.push(this.subForm = this._fb.group({
        id: [item?.id || '', [Validators.required]],
        name: [item?.name || '', [Validators.required, Validators.maxLength(150)]],
        url: [item?.url || '', [Validators.required, Validators.maxLength(150)]]
      }))

    })

  }

  get subFormValidation() {
    return this.subForm;
  }

  socialNetworkValidators(): FormGroup {
    return this.subForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      url: ['', [Validators.required, Validators.maxLength(150)]]
    })
  }

  addSocialNets() {
    this.socialNets.push(this.socialNetworkValidators())
  }

  get socialNets(): FormArray {
    return <FormArray>this.formMain.get('socialMedias');
  }
}
