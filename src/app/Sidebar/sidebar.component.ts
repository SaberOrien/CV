import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CvDataService } from '../CV/cv-data.service';
import { ChangeDetectorRef } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  sectionCompletion: any = {};
  currentRoute: string = '';

  constructor(
    private cvDataService: CvDataService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cvDataService.getSectionCompletion().subscribe(completion => {
      this.sectionCompletion = completion;
      this.cdr.detectChanges();
    });

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      this.cdr.detectChanges();
    });
  }

  onNavigate(route: string) {
    console.log(`Navigating to ${route}`);
  }

  getImage(section: string, type: string): string {
    if (type === 'icon') {
      return this.sectionCompletion[section] ? `/assets/external/${section}_on.svg` : `/assets/external/${section}_off.svg`;
    } else if (type === 'line') {
      return this.sectionCompletion[section] ? `/assets/external/line_on.svg` : `/assets/external/line_off.svg`;
    }
    return '';
  }

  getClass(section: string): string {
    const isActive = this.currentRoute.includes(section);
    const isCompleted = this.sectionCompletion[section];
    if (isActive) {
      return 'active';
    } else if (isCompleted) {
      return 'completed';
    } else {
      return 'not-completed';
    }
  }
}
