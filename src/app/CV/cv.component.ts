import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvDataService } from './cv-data.service';
import {CVTemplate1Component} from "./cv-template1.component";
import {CVTemplate2Component} from "./cv-template2.component";
import {CVTemplate3Component} from "./cv-template3.component";

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, CVTemplate1Component, CVTemplate2Component, CVTemplate3Component], // Import CommonModule here
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CVComponent implements OnInit {
  personalData: any = {};
  educationList: any[] = [];
  workExperienceList: any[] = [];
  skillsList: any[] = [];
  languagesList: any[] = [];
  traitsList: any[] = [];
  selectedTemplate: string = 'template1';

  constructor(private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getPersonalData().subscribe(data => this.personalData = data);
    this.cvDataService.getEducationList().subscribe(data => this.educationList = data);
    this.cvDataService.getWorkExperienceList().subscribe(data => this.workExperienceList = data);
    this.cvDataService.getSkillsList().subscribe(data => this.skillsList = data);
    this.cvDataService.getLanguagesList().subscribe(data => this.languagesList = data);
    this.cvDataService.getTraitsList().subscribe(data => this.traitsList = data);
  }
}
