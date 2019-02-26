import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/careers/career.service';
import { Career } from 'src/app/models/career';
import { NgForm } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate/validate.service';

declare var jQuery: any;
declare var $: any;
var input;

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
  providers: [CareerService]
})
export class CareersComponent implements OnInit {

  constructor(public careerService: CareerService, public validateService: ValidateService) { }

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
          $.toaster('Career Updated Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
          this.getCareers();
        });
        this.removeValidate(input);
    } else {
      this.careerService.authCareerInfo(form.value).subscribe(res => {
        var career = JSON.parse(JSON.stringify(res));
        this.valComp(input[0], career.code);
        this.valComp(input[1], career.name);
        if (career.code.success && career.name.success) {
          this.careerService.postCareer(form.value)
            .subscribe(res => {
              this.cleanForm(form);
              $.toaster('Career Saved Successfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
              this.getCareers();
            });
        }
      });
    }
  }

  getCareers() {
    this.careerService.getCareers().
      subscribe(res => {
        this.careerService.careers = res as Career[];
        console.log(res);
      });
  }

  editStudent(career: Career) {
    this.careerService.selectedCareer = career;
    console.log(career.just);
  }

  deleteStudent(_id: string) {
    this.careerService.deleteCareer(_id)
      .subscribe(res => {
        $.toaster('Career Deleted Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
        this.getCareers();
      });
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.careerService.selectedCareer = new Career();
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
