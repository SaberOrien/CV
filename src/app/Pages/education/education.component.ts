import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HintBoxComponent } from '../../hint-box/hint-box.component';
import { CvDataService } from "../../CV/cv-data.service";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HintBoxComponent
  ],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationList = [
    {
      institution: '',
      degree: '',
      city: '',
      fieldOfStudy: '',
      startDate: '',
      currentlyStudying: false,
      endDate: ''
    }
  ];
  isCompleted = false;
  validationErrors = [
    {
      institution: '',
      degree: '',
      city: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: ''
    }
  ];

  constructor(private router: Router, private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getEducationList().subscribe(data => {
      if (data && data.length > 0) {
        this.educationList = data;
      }
    });

    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.isCompleted = completion.education;
    });
  }
  onSubmit() {
    if (this.validateForm()) {
      console.log('Education Details:', this.educationList);
      this.cvDataService.setEducationList(this.educationList, this.isCompleted);
      this.navigateTo('work-experience'); // Navigate to the next route after submission
    }
  }


  onInputChange() {
    this.cvDataService.setEducationList(this.educationList, this.isCompleted);
    this.validateForm();
  }

  addEducation() {
    this.educationList.push({
      institution: '',
      degree: '',
      city: '',
      fieldOfStudy: '',
      startDate: '',
      currentlyStudying: false,
      endDate: ''
    });
    this.validationErrors.push({
      institution: '',
      degree: '',
      city: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: ''
    });
    this.onInputChange(); // Update service on adding new entry
  }

  removeEducation(index: number) {
    this.educationList.splice(index, 1);
    this.validationErrors.splice(index, 1);
    this.onInputChange(); // Update service on removing entry
  }

  onCurrentlyStudyingChange(index: number) {
    if (this.educationList[index].currentlyStudying) {
      this.educationList[index].endDate = '';
    }
    this.onInputChange(); // Update service on change
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  validateForm() {
    let valid = true;

    this.validationErrors.forEach((error, index) => {
      error.institution = '';
      error.degree = '';
      error.city = '';
      error.fieldOfStudy = '';
      error.startDate = '';
      error.endDate = '';

      if (!this.educationList[index].institution) {
        error.institution = 'Institution is required.';
        valid = false;
      }

      if (!this.educationList[index].degree) {
        error.degree = 'Degree is required.';
        valid = false;
      }

      if (!this.educationList[index].city) {
        error.city = 'City is required.';
        valid = false;
      }

      if (!this.educationList[index].fieldOfStudy) {
        error.fieldOfStudy = 'Field of study is required.';
        valid = false;
      }

      if (!this.educationList[index].startDate) {
        error.startDate = 'Start date is required.';
        valid = false;
      }

      if (!this.educationList[index].currentlyStudying && !this.educationList[index].endDate) {
        error.endDate = 'End date is required if not currently studying.';
        valid = false;
      }
    });

    this.isCompleted = valid;
    return valid;
  }
}


