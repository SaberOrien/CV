import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-template1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-template1.component.html',
  styleUrls: ['./cv-template1.component.css']
})
export class CVTemplate1Component {
  @Input() personalData: any;
  @Input() educationList: any[] | undefined;
  @Input() workExperienceList: any[] | undefined;
  @Input() skillsList: any[] | undefined;
  @Input() languagesList: any[] | undefined;
  @Input() traitsList: any[] | undefined;
}
