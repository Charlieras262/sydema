import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Asignation } from 'src/app/models/asignation';
import { AsignationService } from 'src/app/services/asignations/asignation.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ProjectVariable } from 'src/app/variables/project-variables';
declare var jQuery: any;
declare var $: any;
var input;

@Component({
  selector: 'app-asignations',
  templateUrl: './asignations.component.html',
  styleUrls: ['./asignations.component.css'],
  providers: [AsignationService]
})
export class AsignationsComponent implements OnInit {
  a: Asignation;
  constructor(public asignationService: AsignationService, public validateService: ValidateService) { }

  ngOnInit() {
    input = $('.validate-input .input100');
    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        var thisAlert = $(this).parent();
        $(thisAlert).removeClass('alert-validate');
      });
    });
    this.getAsignations();
    this.animImage();
  }

  addAsignation(form: NgForm) {
    this.asignationService.authAsignationInfo(form.value)
      .subscribe(res => {
        var asignation = JSON.parse(JSON.stringify(res));
        this.valComp(input[0], asignation.carne);
        this.valComp(input[1], asignation.code);
        this.valComp(input[2], asignation.section);
        if (asignation.success) {
          this.asignationService.addAsignation(form.value)
            .subscribe(res => {
              var asignation = JSON.parse(JSON.stringify(res));
              if (asignation.success) {
                this.asignationService.postAsignation(form.value)
                  .subscribe(res => {
                    ProjectVariable.socket.emit('getCourse', form.value.carne_stud);
                    $.toaster('Asignation Saved Successfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
                    this.getAsignations();
                    this.cleanForm(form);
                  });
              } else {
                $.toaster(asignation.msg + ' <i class="fa fa-check-circle"></i>', 'Notice', 'success');
              }
            });
        }
      });
  }

  getAsignations() {
    this.asignationService.getAsignations().
      subscribe(res => {
        this.asignationService.asignations = res as Asignation[];
      });
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.asignationService.selectedAsignation = new Asignation();
    }
  }

  deleteAsignation() {
    this.asignationService.delAsignation(this.a)
      .subscribe(res => {
        var asignation = JSON.parse(JSON.stringify(res));
        if (asignation.success) {
          this.asignationService.deleteAsignation(this.a._id)
            .subscribe(res => {
              $.toaster('Student Deleted Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
              this.getAsignations();
              ProjectVariable.socket.emit('getCourse', this.a.carne_stud);
            });
        } else {
          $.toaster('Error while the asignation was deleting. <i class="fa fa-times"></i>', 'Notice', 'danger');
        }
      })
  }

  showModal(asignation: Asignation) {
    this.a = asignation;
    $('#alert').modal('show');
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
}
