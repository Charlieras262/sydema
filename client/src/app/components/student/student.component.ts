import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { ValidateService } from 'src/app/services/validate/validate.service';

declare var jQuery: any;
declare var $: any;
var input;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, ValidateService]
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService, private validateService: ValidateService) { }

  ngOnInit() {
    input = input = $('.validate-input .input100');
    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        const thisAlert = $(this).parent();
        $(thisAlert).removeClass('alert-validate');
      });
    });
    this.animImage();
    this.getStudents();
  }

  addStudent(form: NgForm) {
    if (form.value._id) {
      $('input[name=carne]').prop('disabled', false);
      this.studentService.putStudent(form.value)
        .subscribe(res => {
          this.cleanForm(form);
          $.toaster('Student Updated Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
          this.getStudents();
        });
    } else {
      if (form.value.fnac) {
        var a = form.value.fnac.split("/");
        var fnac = this.replace(a, "-")
        form.value.fnac = fnac;
      }
      this.studentService.authInformation(JSON.stringify(form.value))
        .subscribe(res => {
          var r = JSON.parse(JSON.stringify(res));
          this.valComp(input[0], r.carne.success, r.carne.msg);
          this.valComp(input[1], r.name.success, r.name.msg);
          this.valComp(input[2], r.lastName.success, r.lastName.msg);
          this.valComp(input[3], r.fnac.success, r.fnac.msg);
          this.valComp(input[4], r.cui.success, r.cui.msg);
          this.valComp(input[5], r.tel.success, r.tel.msg);
          this.valComp(input[6], r.address.success, r.address.msg);
          if (r.carne.success && r.name.success && r.lastName.success && r.fnac.success
            && r.cui.success && r.tel.success && r.address.success) {
            var a = form.value.fnac.split("-");
            var fnac = this.replace(a, "/")
            form.value.fnac = fnac;
            this.studentService.postStudent(form.value)
              .subscribe(res => {
                this.cleanForm(form);
                $.toaster('Student Created Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
                this.getStudents();
              });
          }
        });
    }
    this.removeValidate();
  }

  getStudents() {
    this.studentService.getStudents().
      subscribe(res => {
        this.studentService.students = res as Student[];
      });
  }

  editStudent(student: Student) {
    $('input[name=carne]').prop('disabled', true);
    this.studentService.selectedStudent = student;
  }

  deleteStudent(_id: string) {
    this.studentService.deleteStudent(_id)
      .subscribe(res => {
        $.toaster('Student Deleted Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
        this.getStudents();
      });
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.studentService.selectedStudent = new Student();
    }
  }

  valComp(input, isValid, msg) {
    if (isValid) {
      this.validateService.hideValidate(input);
    } else {
      $.toaster(msg + ' <i class="fa fa-times"></i>', 'Notice', 'danger');
      this.validateService.showValidate(input);
      return false;
    }
  }

  replace(a, b) {
    var fnac = "";
    for (let i = 0; i < a.length; i++) {
      if (i != (a.length - 1)) {
        fnac += a[i] + b;
      } else {
        fnac += a[i];
      }
    }
    return fnac;
  }

  removeValidate() {
    for (let i = 0; i < input.length; i++) {
      this.validateService.hideValidate(input[i]);
    }
  }

  animImage() {
    $('.js-tilt').tilt({
      scale: 1.1
    })
  }

  coursesNames(student) {
    var courses = "";
    for(let i = 0; i < student.course_asigned.length; i++){
      if(i != student.course_asigned.length - 1){
        courses += student.course_asigned[i].name+', ';
      }else{
        courses += student.course_asigned[i].name+'.';
      }
    }
    return courses;
  }
}
