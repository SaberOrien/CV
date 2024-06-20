import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HintBoxComponent } from '../../hint-box/hint-box.component';
import { CvDataService } from "../../CV/cv-data.service";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HintBoxComponent
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillLevels = ['Podstawowy', 'Średnio zaawansowany', 'Zaawansowany', 'Ekspert'];

  skillsList = [
    {
      skillName: '',
      skillLevel: ''
    }
  ];
  isCompleted = false;
  validationErrors = [
    {
      skillName: '',
      skillLevel: ''
    }
  ];

  constructor(private router: Router, private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getSkillsList().subscribe(data => {
      if (data && data.length > 0) {
        this.skillsList = data;
      }
    });

    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.isCompleted = completion.skills;
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Skills Details:', this.skillsList);
      this.cvDataService.setSkillsList(this.skillsList, this.isCompleted);
      this.navigateTo('languages'); // Navigate to the next route after submission
    }
  }

  addSkill() {
    this.skillsList.push({
      skillName: '',
      skillLevel: ''
    });
    this.validationErrors.push({
      skillName: '',
      skillLevel: ''
    });
  }

  removeSkill(index: number) {
    this.skillsList.splice(index, 1);
    this.validationErrors.splice(index, 1);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  validateForm() {
    let valid = true;

    this.validationErrors.forEach((error, index) => {
      error.skillName = '';
      error.skillLevel = '';

      if (!this.skillsList[index].skillName) {
        error.skillName = 'Skill name is required.';
        valid = false;
      }

      if (!this.skillsList[index].skillLevel) {
        error.skillLevel = 'Skill level is required.';
        valid = false;
      }
    });

    this.isCompleted = valid;
    return valid;
  }
}
