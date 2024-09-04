import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { loadStylesheet } from '../shared/utils/load-styles';
import { removeStylesheet } from '../shared/utils/remove-styles';
import { interval } from 'rxjs'; // Import RxJS interval
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnDestroy {
  private stylesheetUrl = 'assets/styles/day.css';
  bluetoothData: string = "0"; // 초기값 설정
  private dataFetchInterval: any;

  constructor(private router: Router, private http: HttpClient) {} // Inject HttpClient

  ngOnInit(): void {
    loadStylesheet(this.stylesheetUrl);

    // Set up Bluetooth data handling
    this.setupDataFetch();
  }

  ngOnDestroy(): void {
    removeStylesheet(this.stylesheetUrl);
    if (this.dataFetchInterval) {
      clearInterval(this.dataFetchInterval); // Clear interval on destroy
    }
  }

  goToWeek(): void {
    this.router.navigate(['/week']);  
  }

  goToMonth(): void {
    this.router.navigate(['/month']);  
  }

  goToMain(): void {
    this.router.navigate(['/main']);  
  }

  // Data fetching setup
  setupDataFetch(): void {
    this.dataFetchInterval = setInterval(() => {
      this.fetchBluetoothData();
    }, 3000); // Fetch data every 3 seconds
  }

  fetchBluetoothData(): void {
    this.http.get('http://localhost:8080/bluetooth-data', { responseType: 'text' })
      .subscribe(data => {
        this.bluetoothData = data;
      });
  }
}
