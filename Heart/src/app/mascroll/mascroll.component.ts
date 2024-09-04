import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { loadStylesheet } from '../shared/utils/load-styles';
import { removeStylesheet } from '../shared/utils/remove-styles';

@Component({
  selector: 'app-mascroll',
  templateUrl: './mascroll.component.html',
  styleUrls: ['./mascroll.component.scss']
})
export class MascrollComponent implements OnInit, OnDestroy {
  private stylesheetUrl = 'assets/styles/mascroll.css';

   // 사용자 입력 데이터를 저장할 프로퍼티들
   systolicPressure: number | null = null;  // 수축기 혈압
   diastolicPressure: number | null = null;  // 이완기 혈압
   bloodPressureResult: string | null = null;  // 결과를 저장할 변수

  constructor(private router: Router) {}

  ngOnInit(): void {
    loadStylesheet(this.stylesheetUrl);
  }

  ngOnDestroy(): void {
    removeStylesheet(this.stylesheetUrl);
  }

  goToManagement(): void {
    this.router.navigate(['/management']);  
  }

  // 혈압 데이터를 저장하고 결과를 표시하는 메서드
  saveBloodPressure(): void {
    if (this.systolicPressure !== null && this.diastolicPressure !== null) {
      this.bloodPressureResult = `수축기: ${this.systolicPressure} mmHg <br> 이완기: ${this.diastolicPressure} mmHg`;
    }
  }
}
