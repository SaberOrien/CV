import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cv-template2',
  templateUrl: './cv-template2.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./cv-template2.component.css']
})
export class CVTemplate2Component {
  @Input() personalData: any;
  @Input() educationList: any[] | undefined;
  @Input() workExperienceList: any[] | undefined;
  @Input() skillsList: any[] | undefined;
  @Input() languagesList: any[] | undefined;
  @Input() traitsList: any[] | undefined;
}
