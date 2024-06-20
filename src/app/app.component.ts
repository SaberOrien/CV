import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./Sidebar/sidebar.component";
import {PersonalDataComponent} from "./Pages/personal-data/personal-data.component";
import {CVComponent} from "./CV/cv.component";
import {EducationComponent} from "./Pages/education/education.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, PersonalDataComponent, CVComponent, EducationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cvMaker';
}
