import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';  // Router import 추가
import { loadStylesheet } from '../shared/utils/load-styles';
import { removeStylesheet } from '../shared/utils/remove-styles';
import { FormsModule } from '@angular/forms'; // FormsModule import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private stylesheetUrl = 'assets/styles/login.css';

  // 사용자 입력 필드
  userName: string = '';
  userAge: number | null = null;
  userHeight: number | null = null;
  userWeight: number | null = null;

  constructor(private router: Router) {}  // Router 주입

  ngOnInit(): void {
    loadStylesheet(this.stylesheetUrl);
  }

  ngOnDestroy(): void {
    removeStylesheet(this.stylesheetUrl);
  }

  goToMain(): void {
    this.router.navigate(['/main']);  
  }

  submitData(): void {
    // 사용자 입력 데이터 처리
    console.log('성함:', this.userName);
    console.log('나이:', this.userAge);
    console.log('키:', this.userHeight);
    console.log('몸무게:', this.userWeight);
    this.goToMain();
  }
}
