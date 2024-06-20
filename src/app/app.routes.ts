import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDataComponent } from './Pages/personal-data/personal-data.component';
import { CVComponent } from './CV/cv.component';
import { EducationComponent } from './Pages/education/education.component';
import {WorkExperienceComponent} from "./Pages/work-experience/work-experience.component";
import {SkillsComponent} from "./Pages/skills/skills.component";
import {LanguagesComponent} from "./Pages/languages/languages.component";
import {TraitsComponent} from "./Pages/traits/traits.component";

export const routes: Routes = [
  { path: '', redirectTo: '/personal-data', pathMatch: 'full' },
  { path: 'personal-data', component: PersonalDataComponent },
  { path: 'cv', component: CVComponent },
  { path: 'education', component: EducationComponent },
  { path: 'work-experience', component: WorkExperienceComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'traits', component: TraitsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
