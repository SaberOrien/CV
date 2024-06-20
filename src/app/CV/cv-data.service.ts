import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {
  private personalData = new BehaviorSubject<any>({});
  private educationList = new BehaviorSubject<any[]>([]);
  private workExperienceList = new BehaviorSubject<any[]>([]);
  private skillsList = new BehaviorSubject<any[]>([]);
  private languagesList = new BehaviorSubject<any[]>([]);
  private traitsList = new BehaviorSubject<any[]>([]);
  private sectionCompletion = new BehaviorSubject<any>({
    personalData: false,
    education: false,
    workExperience: false,
    skills: false,
    languages: false,
    traits: false
  });

  // Personal Data
  setPersonalData(data: any, isCompleted: boolean) {
    this.personalData.next(data);
    this.updateSectionCompletion('personalData', isCompleted);
  }

  getPersonalData() {
    return this.personalData.asObservable();
  }

  getCurrentPersonalData() {
    return this.personalData.value;
  }


  // Education List
  setEducationList(data: any[], isCompleted: boolean) {
    this.educationList.next(data);
    this.updateSectionCompletion('education', isCompleted);
  }

  getEducationList() {
    return this.educationList.asObservable();
  }

  // Work Experience List
  setWorkExperienceList(data: any[], isCompleted: boolean) {
    this.workExperienceList.next(data);
    this.updateSectionCompletion('workExperience', isCompleted);
  }

  getWorkExperienceList() {
    return this.workExperienceList.asObservable();
  }

  // Skills List
  setSkillsList(data: any[], isCompleted: boolean) {
    this.skillsList.next(data);
    this.updateSectionCompletion('skills', isCompleted);
  }

  getSkillsList() {
    return this.skillsList.asObservable();
  }

  // Languages List
  setLanguagesList(data: any[], isCompleted: boolean) {
    this.languagesList.next(data);
    this.updateSectionCompletion('languages', isCompleted);
  }

  getLanguagesList() {
    return this.languagesList.asObservable();
  }

  // Traits List
  setTraitsList(data: any[], isCompleted: boolean) {
    this.traitsList.next(data);
    this.updateSectionCompletion('traits', isCompleted);
  }

  getTraitsList() {
    return this.traitsList.asObservable();
  }

  // Section Completion
  updateSectionCompletion(section: string, isCompleted: boolean) {
    const currentCompletion = this.sectionCompletion.value;
    currentCompletion[section] = isCompleted;
    this.sectionCompletion.next(currentCompletion);
  }

  getSectionCompletion() {
    return this.sectionCompletion.asObservable();
  }
}
