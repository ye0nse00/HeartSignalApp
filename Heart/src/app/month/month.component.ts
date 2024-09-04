import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { loadStylesheet } from '../shared/utils/load-styles';
import { removeStylesheet } from '../shared/utils/remove-styles';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit, OnDestroy {
  private stylesheetUrl = 'assets/styles/month.css';

  constructor(private router: Router) {}

  ngOnInit(): void {
    loadStylesheet(this.stylesheetUrl);
  }

  ngOnDestroy(): void {
    removeStylesheet(this.stylesheetUrl);
  }

  goToWeek(): void {
    this.router.navigate(['/week']);
}
  goToDay(): void {
    this.router.navigate(['/day']);

}

  goToMain(): void {
  this.router.navigate(['/main']);

}

}