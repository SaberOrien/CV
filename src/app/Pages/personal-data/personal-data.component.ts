import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CvDataService } from "../../CV/cv-data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent implements OnInit {
  personalData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
  isCompleted = false;
  validationErrors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(private router: Router, private cvDataService: CvDataService) { }

  ngOnInit() {
    this.cvDataService.getPersonalData().subscribe(data => {
      if (data) {
        this.personalData = data;
      }
    });

    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.isCompleted = completion.personalData;
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      this.cvDataService.setPersonalData(this.personalData, this.isCompleted);
      this.navigateTo("education");
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  validateForm() {
    this.resetValidationErrors();
    let valid = true;

    if (!this.personalData.firstName) {
      this.validationErrors.firstName = 'First name is required.';
      valid = false;
    } else {
      this.personalData.firstName = this.capitalize(this.personalData.firstName);
    }

    if (!this.personalData.lastName) {
      this.validationErrors.lastName = 'Last name is required.';
      valid = false;
    } else {
      this.personalData.lastName = this.capitalize(this.personalData.lastName);
    }

    if (!this.personalData.email) {
      this.validationErrors.email = 'Email is required.';
      valid = false;
    } else if (!this.validateEmail(this.personalData.email)) {
      this.validationErrors.email = 'Invalid email format.';
      valid = false;
    }

    if (!this.personalData.phone) {
      this.validationErrors.phone = 'Phone number is required.';
      valid = false;
    } else if (!this.validatePhone(this.personalData.phone)) {
      this.validationErrors.phone = 'Invalid phone number.';
      valid = false;
    }

    this.isCompleted = valid;
    return valid;
  }

  resetValidationErrors() {
    this.validationErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  }

  capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePhone(phone: string) {
    return phone.length === 9;
  }
}
