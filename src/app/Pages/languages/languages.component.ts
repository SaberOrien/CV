import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HintBoxComponent } from '../../hint-box/hint-box.component';
import { CvDataService } from "../../CV/cv-data.service";

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HintBoxComponent
  ],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  languageProficiencies = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Ojczysty'];

  languagesList = [
    {
      languageName: '',
      languageProficiency: ''
    }
  ];
  isCompleted = false;
  validationErrors = [
    {
      languageName: '',
      languageProficiency: ''
    }
  ];

  constructor(private router: Router, private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getLanguagesList().subscribe(data => {
      if (data && data.length > 0) {
        this.languagesList = data;
      }
    });

    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.isCompleted = completion.languages;
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Languages Details:', this.languagesList);
      this.cvDataService.setLanguagesList(this.languagesList, this.isCompleted);
      this.navigateTo('traits'); // Navigate to the next route after submission
    }
  }

  addLanguage() {
    this.languagesList.push({
      languageName: '',
      languageProficiency: ''
    });
    this.validationErrors.push({
      languageName: '',
      languageProficiency: ''
    });
  }

  removeLanguage(index: number) {
    this.languagesList.splice(index, 1);
    this.validationErrors.splice(index, 1);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  validateForm() {
    let valid = true;

    this.validationErrors.forEach((error, index) => {
      error.languageName = '';
      error.languageProficiency = '';

      if (!this.languagesList[index].languageName) {
        error.languageName = 'Language name is required.';
        valid = false;
      }

      if (!this.languagesList[index].languageProficiency) {
        error.languageProficiency = 'Language proficiency is required.';
        valid = false;
      }
    });

    this.isCompleted = valid;
    return valid;
  }
}
