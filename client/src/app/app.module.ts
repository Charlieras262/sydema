import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidateService } from './services/validate/validate.service';
import { AuthService } from './services/auth/auth.service';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InstitutionComponent } from './components/institutions/institution.component';
import { AsignationsComponent } from './components/asignations/asignations.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CoursesAsignedComponent } from './components/courses-asigned/courses-asigned.component';
import { UserAdminGuard } from './guards/admin/user-admin.guard';
import { LoginGuard } from './guards/login/login.guard';
import { NoLoginGuard } from './guards/no-login/no-login.guard';
import { UserStudentGuard } from './guards/student/user-student.guard';
import { CoursesAsignedTeacherComponent } from './components/courses-asigned-teacher/courses-asigned-teacher.component';
import { UserTeacherGuard } from './guards/teacher/user-teacher.guard';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { HomeworkComponent } from './components/homework/homework.component';
import { InformationComponent } from './components/information/information.component';
import { ChatComponent } from './components/chat/chat.component';
import { RespasswordComponent } from './components/respassword/respassword.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'students', component: StudentComponent, canActivate: [UserAdminGuard]},
  {path: 'teachers', component: TeachersComponent, canActivate: [UserAdminGuard]},
  {path: 'courses', component: CoursesComponent, canActivate: [UserAdminGuard]},
  {path: 'careers', component: InstitutionComponent, canActivate: [UserAdminGuard]},
  {path: 'asignations', component: AsignationsComponent, canActivate: [UserAdminGuard]},
  {path: 'coursesasigned', component: CoursesAsignedComponent, canActivate: [UserStudentGuard]},
  {path: 'coursesasignedteacher', component: CoursesAsignedTeacherComponent, canActivate: [UserTeacherGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [UserAdminGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: 'restore/password', component: RespasswordComponent, canActivate: [NoLoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoLoginGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},
  {path: ':id/chat', component: ChatComponent, canActivate: [LoginGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [UserAdminGuard]},
  {path: 'coursesasigned/:id', component: CourseDetailComponent, canActivate: [UserStudentGuard]},
  {path: 'coursesasigned/:id/information', component: CourseDetailComponent, canActivate: [UserStudentGuard]},
  {path: 'coursesasigned/:id/activities', component: CourseDetailComponent, canActivate: [UserStudentGuard]},
  {path: 'coursesasigned/:id/homework', component: CourseDetailComponent, canActivate: [UserStudentGuard]},
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    StudentComponent,
    TeachersComponent,
    CoursesComponent,
    InstitutionComponent,
    AsignationsComponent,
    ReportsComponent,
    CoursesAsignedComponent,
    CoursesAsignedTeacherComponent,
    ActivitiesComponent,
    CourseDetailComponent,
    HomeworkComponent,
    InformationComponent,
    ChatComponent,
    RespasswordComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard, ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  ngOnInit(){
  }
 }
