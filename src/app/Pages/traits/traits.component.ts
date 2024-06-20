import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HintBoxComponent } from '../../hint-box/hint-box.component';
import { CvDataService } from "../../CV/cv-data.service";

@Component({
  selector: 'app-traits',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HintBoxComponent
  ],
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.css']
})
export class TraitsComponent implements OnInit {
  predefinedTraits = [
    { name: 'Kreatywny', selected: false },
    { name: 'Cierpliwy', selected: false },
    { name: 'Komunikatywny', selected: false },
    { name: 'Otwarty', selected: false },
    { name: 'Zaradny', selected: false },
    { name: 'Team-player', selected: false }
  ];

  traitsList = [
    {
      trait: ''
    }
  ];
  isCompleted = false;
  validationErrors = [
    {
      trait: ''
    }
  ];

  constructor(private router: Router, private cvDataService: CvDataService) {}

  ngOnInit() {
    this.cvDataService.getTraitsList().subscribe(data => {
      if (data && data.length > 0) {
        this.traitsList = data;
        this.updatePredefinedTraits();
      }
    });

    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.isCompleted = completion.traits;
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Traits Details:', this.traitsList);
      this.cvDataService.setTraitsList(this.traitsList, this.isCompleted);
      this.navigateTo('languages');
    }
  }

  addTrait() {
    this.traitsList.push({
      trait: ''
    });
    this.validationErrors.push({
      trait: ''
    });
  }

  togglePredefinedTrait(trait: any) {
    trait.selected = !trait.selected;
    if (trait.selected) {
      this.traitsList.push({ trait: trait.name });
    } else {
      this.traitsList = this.traitsList.filter(t => t.trait !== trait.name);
    }
    this.updateValidationErrors();
  }

  removeTrait(index: number) {
    const traitName = this.traitsList[index].trait;
    this.traitsList.splice(index, 1);
    this.validationErrors.splice(index, 1);

    const predefinedTrait = this.predefinedTraits.find(t => t.name === traitName);
    if (predefinedTrait) {
      predefinedTrait.selected = false;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  validateForm() {
    let valid = true;
    this.updateValidationErrors();

    this.validationErrors.forEach((error, index) => {
      if (!this.traitsList[index].trait) {
        error.trait = 'Trait is required.';
        valid = false;
      }
    });

    this.isCompleted = valid;
    return valid;
  }

  updateValidationErrors() {
    this.validationErrors = this.traitsList.map(() => ({ trait: '' }));
  }

  updatePredefinedTraits() {
    this.predefinedTraits.forEach(trait => {
      trait.selected = this.traitsList.some(t => t.trait === trait.name);
    });
  }
}
