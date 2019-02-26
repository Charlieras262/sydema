import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { CareerService } from 'src/app/services/careers/career.service';
import { CourseService } from 'src/app/services/courses/course.service';
import { AsignationService } from 'src/app/services/asignations/asignation.service';
import { Student } from 'src/app/models/student';

declare var jsPDF: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [StudentService, TeacherService, CareerService, CourseService, AsignationService]
})
export class ReportsComponent implements OnInit {

  constructor(
    public studentService: StudentService,
    public teacherService: TeacherService,
    public careerService: CareerService,
    public courseService: CourseService,
    public asignationService: AsignationService
  ) { }

  ngOnInit() {
  }

  generateStudent() {
    this.studentService.getStudents().
      subscribe(res => {
        var columns = ["Carné", "Name", "Last Name", "Date Born", "CUI", "Telephone", "Address", "Courses Asigned"];
        var data = this.getDataAsArrayCareer(res);
        this.generateReport(columns, data, "Students", "1");
      });
  }

  generateCareer() {
    this.careerService.getCareers().
      subscribe(res => {
        var columns = ["Code", "Name"];
        var data = this.getDataAsArray(res);
        this.generateReport(columns, data, "Career", "1");
      });
  }

  generateCourse() {
    this.courseService.getCourses().
      subscribe(res => {
        var columns = ["Code Career", "Name", "Code Course", "Cycle", "Section", "Start Time", "End Time", "Code Teacher"];
        var data = this.getDataAsArray(res);
        this.generateReport(columns, data, "Course", "p");
      });
  }

  generateTeacher() {
    this.teacherService.getTeachers()
      .subscribe(res => {
        var columns = ["Code", "Name", "Last Name", "Date Born", "CUI", "Speciality", "Master", "Collegiate Code", "School Code"];
        var data = this.getDataAsArray(res);
        this.generateReport(columns, data, "Teachers", "1");
      });
  }

  generateAsignation() {
    this.asignationService.getAsignations()
      .subscribe(res => {
        var columns = ["Student ID", "Course Code", "Start Time", "End Time", "Section"];
        var data1 = this.getDataAsArray(res);
        this.courseService.getCourses().
          subscribe(res => {
            var data2 = this.getDataAsArray(res);
            var aux = data1[0][2];
            data1[0].pop();
            data1[0].push(data2[0][5]);
            data1[0].push(data2[0][6]);
            data1[0].push(aux);
            this.generateReport(columns, data1, "Asignation", "p");
          });
      });
  }

  generateReport(columns, data, name, pos) {
    const doc = new jsPDF(pos, "mm", [297, 210]);
    doc.text(name + ' Report', 20, 20);
    doc.autoTable(columns, data,
      {
        margin: { top: 25 }
      }
    );
    doc.save(name + '.pdf');
  }

  getDataAsArrayCareer(res) {
    var data = [];
    var a = Object.values(res);
    //console.log(a);
    for (let i = 0; i < a.length; i++) {
      data[i] = [];
      var student = JSON.parse(JSON.stringify(a[i]));
      data[i][0] = student.carne;
      data[i][1] = student.name;
      data[i][2] = student.lastName;
      data[i][3] = student.fnac;
      data[i][4] = student.cui;
      data[i][5] = student.tel;
      data[i][6] = student.address;
      data[i][7] = "";
      for (let j = 0; j < student.course_asigned.length; j++) {
        if (j == student.course_asigned.length - 1) {
          data[i][7] += student.course_asigned[j].name + ".";
        } else {
          data[i][7] += student.course_asigned[j].name + ", ";
        }
      }
    }
    return data;
  }

  getDataAsArray(res) {
    var data = [];
    var a = Object.values(res);
    //console.log(a);
    for (let i = 0; i < a.length; i++) {
      data[i] = Object.values(a[i]);
      data[i].pop();
      data[i].shift();
    }
    return data;
  }
}
