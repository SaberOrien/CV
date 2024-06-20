import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cv-template3',
  templateUrl: './cv-template3.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./cv-template3.component.css']
})
export class CVTemplate3Component {
  @Input() personalData: any;
  @Input() educationList: any[] | undefined;
  @Input() workExperienceList: any[] | undefined;
  @Input() skillsList: any[] | undefined;
  @Input() languagesList: any[] | undefined;
  @Input() traitsList: any[] | undefined;
}
