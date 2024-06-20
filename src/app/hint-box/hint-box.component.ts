import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hint-box',
  standalone: true,
  imports: [],
  templateUrl: './hint-box.component.html',
  styleUrl: './hint-box.component.css'
})
export class HintBoxComponent {
  @Input() hintText: string = '';
}
