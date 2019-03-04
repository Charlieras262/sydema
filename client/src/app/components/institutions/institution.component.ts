import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/services/institutions/institution.service';
import { Institution } from 'src/app/models/institution';
import { NgForm } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate/validate.service';

declare var jQuery: any;
declare var $: any;
var input;

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css'],
  providers: [InstitutionService]
})
export class InstitutionComponent implements OnInit {

  constructor(public careerService: InstitutionService, public validateService: ValidateService) { }

  ngOnInit() {
    input = $('.validate-input .input100');
    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        var thisAlert = $(this).parent();
        $(thisAlert).removeClass('alert-validate');
      });
    });
    this.animImage();
    this.getCareers();
  }

  addCareer(form: NgForm) {
    console.log(form);
    if (form.value._id) {
      this.careerService.putCareer(form.value)
        .subscribe(res => {
          this.cleanForm(form);
          $.toaster('Institution Updated Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
          this.getCareers();
        });
        this.removeValidate(input);
    } else {
      this.careerService.authCareerInfo(form.value).subscribe(res => {
        var Institution = JSON.parse(JSON.stringify(res));
        this.valComp(input[0], Institution.code);
        this.valComp(input[1], Institution.name);
        if (Institution.code.success && Institution.name.success) {
          this.careerService.postCareer(form.value)
            .subscribe(res => {
              this.cleanForm(form);
              $.toaster('Institution Saved Successfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
              this.getCareers();
            });
        }
      });
    }
  }

  getCareers() {
    this.careerService.getCareers().
      subscribe(res => {
        this.careerService.careers = res as Institution[];
        console.log(res);
      });
  }

  editStudent(Institution: Institution) {
    this.careerService.selectedCareer = Institution;
  }

  deleteStudent(_id: string) {
    this.careerService.deleteCareer(_id)
      .subscribe(res => {
        $.toaster('Institution Deleted Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
        this.getCareers();
      });
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.careerService.selectedCareer = new Institution();
    }
  }

  valComp(input, data) {
    if (data.success) {
      this.validateService.hideValidate(input);
    } else {
      $.toaster(data.msg + ' <i class="fa fa-times"></i>', 'Notice', 'danger');
      this.validateService.showValidate(input);
      return false;
    }
  }

  animImage() {
    $('.js-tilt').tilt({
      scale: 1.1
    })
  }

  removeValidate(input){
    console.log(input.length);
    for(let i = 0; i < input.length; i++){
      console.log(i);
      this.validateService.hideValidate(input[i]);
    }
  }

}
