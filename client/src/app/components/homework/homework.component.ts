import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/project-variables';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  loading: boolean;
  add: boolean;
  fileURL: string;
  fileSelected = null;
  API_URL = new ProjectVariable().serverLocation + 'api/upload/';
  files = [];
  type: string;
  there: boolean;
  curProgress;
  path: string;
  percentDone: number;
  startTime: any;
  endTime: any;
  currTime: any;
  prevTime: any;
  speed: number = 0;
  bytesReceied: number = 0;
  oldbytes: number = 0;
  unit: string = "Mbps";

  constructor(private http: HttpClient) {
    this.loading = true;
    this.add = true;
  }

  ngOnInit() {
    this.getUploadedFiles();
    this.areThereFiles();
  }

  onFileSelected(event) {
    this.fileSelected = event.target.files[0];
    this.path = this.fileSelected;
  }

  onUploadFile() {
    const startingTime = new Date().getTime();
    this.there = true;
    this.loading = true;
    const fd = new FormData();
    fd.append('file', this.fileSelected);
    this.http.post(this.API_URL + 'file', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.curProgress = Math.round(event.loaded / event.total * 100);
          //tracking percent received and how much time has passed
        this.percentDone = Math.round((100 * event.loaded) / event.total);    
        this.currTime = new Date().getTime();

        //setting start time
        if (this.percentDone === 0) {
          this.startTime = new Date().getTime();
          this.prevTime = this.startTime;
        }

        //tracking how much data is received
        this.bytesReceied = event.loaded / 1000000;

        //calculating download speed per percent data received
        this.speed =
          (this.bytesReceied - this.oldbytes) /
          ((this.currTime - this.prevTime) / 1000);
        if (this.speed < 1) {
          this.unit = "Kbps";
          this.speed *= 1000;
        } else this.unit = "Mbps";

        //updating previous values
        this.prevTime = this.currTime;    
        this.oldbytes = this.bytesReceied;

        //calculating avg download speed
        if (this.percentDone === 100) {
          this.endTime = new Date().getTime();
          let duration = (this.endTime - this.startTime) / 1000;
          let mbps = event.total / duration / 1000000;
          if (mbps < 1) {
            this.speed = event.total / duration / 1000;
            this.unit = "Kbps";
          } else {
            this.speed = mbps;
            this.unit = "Mbps";
          }
        }
        if(isNaN(Math.round(this.speed))){
          this.speed = 0;
          this.unit = "Kbps";
        }else{
          this.speed = Math.round(this.speed);
        }
        } else if (event.type === HttpEventType.Response) {
          this.getUploadedFiles();
          $.toaster('File Uploaded Succesfully <i class="fa fa-check-circle"></i>', 'Loaded', 'success');
          this.loading = false;
          this.curProgress = 0;
          this.path = null;
        }
      });
  }

  getUploadedFiles() {
    this.http.get(this.API_URL)
      .subscribe(res => {
        this.files = JSON.parse(JSON.stringify(res)).files;
        this.areThereFiles();
      });
  }

  downloadFile(name) {
    var Response = JSON.parse(JSON.stringify(this.http.get(this.API_URL +'download/'+ name)));
    window.open(Response.source.source.source.value.url);
  }

  deleteUploadedFile(id: string) {
    this.http.delete(this.API_URL + 'file/delete/' + id)
      .subscribe(res => {
        var response = JSON.parse(JSON.stringify(res));
        $.toaster(response.msg + ' <i class="fa fa-check-circle"></i>', 'Loaded', 'success');
        this.getUploadedFiles();
      });
  }

  showUploadedImage(name, type) {
    var Response = JSON.parse(JSON.stringify(this.http.get(this.API_URL + 'image/' + name)));
    var res;
    if (type === 'image/jpeg' || type === 'image/png') {
      this.fileURL = Response.source.source.source.value.url;
      res = true;
    } else {
      if (type.toString() === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.type = 'docx.png';
      } else if (type.toString() === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.type = 'xlsx.png';
      } else if (type.toString() === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        this.type = 'pptx.png';
      } else if (type.toString() === 'application/vnd.oasis.opendocument.text') {
        this.type = 'odt.png'
      } else if (type.toString() === 'application/vnd.oasis.opendocument.spreadsheet') {
        this.type = 'ods.png';
      } else if (type.toString() === 'application/vnd.oasis.opendocument.presentation') {
        this.type = 'odp.png';
      } else if (type.toString() === 'application/pdf') {
        this.type = 'pdf.png'
      } else if (type.toString() === 'text/plain') {
        this.type = 'txt.png';
      } else if (type.toString() === 'audio/mp3') {
        this.type = 'mp3.png';
      } else if (type.toString() === 'audio/wav') {
        this.type = 'wav.png';
      } else if (type.toString() === 'video/mp4') {
        this.type = 'mp4.png';
      } else if (type.toString() === 'application/vnd.rar') {
        this.type = 'rar.png';
      } else if (type.toString() === 'application/zip') {
        this.type = 'zip.png';
      } else {
        this.type = 'unknown.png';
      }
      this.fileURL = name;
      res = false;
    }
    return res;
  }

  sendHomework(id, description) {
    console.log({ id: id, description: description });
  }

  areThereFiles() {
    if (this.files === undefined || this.files.length === 0) {
      this.loading = false;
      this.there = false;
    } else {
      this.loading = false;
      this.there = true;
    }
  }
}
