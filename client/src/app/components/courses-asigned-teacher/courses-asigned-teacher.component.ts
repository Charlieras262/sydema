import { User } from './../../models/user';
import { Course } from 'src/app/models/course';
import { StudentService } from 'src/app/services/students/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-courses-asigned-teacher',
  templateUrl: './courses-asigned-teacher.component.html',
  styleUrls: ['./courses-asigned-teacher.component.css']
})
export class CoursesAsignedTeacherComponent implements OnInit {

  students;
  target: any;
  userInfo: any;
  id: string;

  constructor(private studentService: StudentService, private chatService: ChatService, private authService: AuthService) {
    this.students = [];
   }

  ngOnInit() {
    this.getStudents();
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.id = this.userInfo.id;
  }

  getStudents() {
    var index = 0;
    var user = JSON.parse(localStorage.getItem('user'));
    this.studentService.students = [];
    this.studentService.getStudents().
      subscribe(res => {
        var students = res as Student[];
        for (let i = 0; i < students.length; i++) {
          var courses = students[i].course_asigned as Course[];
          for (let j = 0; j < courses.length; j++) {
            if (courses[j].cod_teacher.toString() === user.id.toString()) {
              if (!this.addElement(this.students, students[i]._id)) {
                this.students[index] = students[i];
                this.students[index].courses = this.coursesNames(students[i], user.id.toString());
                index++;
              }
            }
          }
        }
      });
  }

  addElement(a: Array<Student>, id) {
    var res = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i]._id.toString() === id.toString()) {
        return true;
      }
    }
    return res;
  }

  coursesNames(student, code) {
    var courses = "";
    for(let i = 0; i < student.course_asigned.length; i++){
      if(student.course_asigned[i].cod_teacher.toString() === code.toString()){
        if(i != student.course_asigned.length - 1){
          courses += student.course_asigned[i].name+', ';
        }else{
          courses += student.course_asigned[i].name+'.';
        }
      }
    }
    return courses;
  }

  createConversation(id) {
    this.authService.getUserById(id)
      .subscribe(res => {
        let user = JSON.parse(JSON.stringify(res));
        this.target = user._id;
    const conv = {
      code: this.userInfo.id + '~' + this.target,
      user_from: this.userInfo.username,
      user_to: user.username
    };
    this.chatService.postConversation(conv)
      .subscribe(res => {
        const r = JSON.parse(JSON.stringify(res));
        this.chatService.addConversation({ id: this.userInfo.id, conID: r.conv._id })
          .subscribe(res => {
            this.chatService.addConversation({ id: this.target, conID: r.conv._id })
              .subscribe(res => {
                console.log('Conversation Created');
              });
          });
      });
      });
  }
}
