import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HintBoxComponent } from '../../hint-box/hint-box.component';
import { CvDataService } from "../../CV/cv-data.service";

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HintBoxComponent
  ],
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  workExperienceList = [
    {
      company: '',
      position: '',
      city: '',
      responsibilities: '',
      startDate: '',
      currentlyWorking: false,
      endDate: ''
    }
  ];
  isCompleted = false;
  validationErrors = [
    {
      company: '',
      position: '',
      city: '',
      responsibilities: '',
      startDate: '',
      endDate: ''
    }
  ];

  constructor(private router: Router, private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getWorkExperienceList().subscribe(data => {
      if (data && data.length > 0) {
        this.workExperienceList = data;
      }
    });

    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.isCompleted = completion.workExperience;
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Work Experience Details:', this.workExperienceList);
      this.cvDataService.setWorkExperienceList(this.workExperienceList, this.isCompleted);
      this.navigateTo('skills'); // Navigate to the next route after submission
    }
  }

  addWorkExperience() {
    this.workExperienceList.push({
      company: '',
      position: '',
      city: '',
      responsibilities: '',
      startDate: '',
      currentlyWorking: false,
      endDate: ''
    });
    this.validationErrors.push({
      company: '',
      position: '',
      city: '',
      responsibilities: '',
      startDate: '',
      endDate: ''
    });
  }

  removeWorkExperience(index: number) {
    this.workExperienceList.splice(index, 1);
    this.validationErrors.splice(index, 1);
  }

  onCurrentlyWorkingChange(index: number) {
    if (this.workExperienceList[index].currentlyWorking) {
      this.workExperienceList[index].endDate = '';
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  validateForm() {
    let valid = true;

    this.validationErrors.forEach((error, index) => {
      error.company = '';
      error.position = '';
      error.city = '';
      error.responsibilities = '';
      error.startDate = '';
      error.endDate = '';

      if (!this.workExperienceList[index].company) {
        error.company = 'Company name is required.';
        valid = false;
      }

      if (!this.workExperienceList[index].position) {
        error.position = 'Position is required.';
        valid = false;
      }

      if (!this.workExperienceList[index].city) {
        error.city = 'City is required.';
        valid = false;
      }

      if (!this.workExperienceList[index].responsibilities) {
        error.responsibilities = 'Responsibilities are required.';
        valid = false;
      }

      if (!this.workExperienceList[index].startDate) {
        error.startDate = 'Start date is required.';
        valid = false;
      }

      if (!this.workExperienceList[index].currentlyWorking && !this.workExperienceList[index].endDate) {
        error.endDate = 'End date is required if not currently working.';
        valid = false;
      }
    });

    this.isCompleted = valid;
    return valid;
  }
}
