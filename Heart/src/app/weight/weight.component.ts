import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';  // Router import 추가
import { loadStylesheet } from '../shared/utils/load-styles';
import { removeStylesheet } from '../shared/utils/remove-styles';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit, OnDestroy {
  private stylesheetUrl = 'assets/styles/weight.css';

  // 사용자 입력 저장 변수
  height: number | null = null;
  weight: number | null = null;

  // 저장된 값 표시 변수
  savedHeight: number | null = null;
  savedWeight: number | null = null;

  showData: boolean = false;

  constructor(private router: Router) {}  // Router 주입

  ngOnInit(): void {
    loadStylesheet(this.stylesheetUrl);

    // 화면 클릭 시 데이터 저장 처리
    document.addEventListener('click', this.saveData.bind(this));
  }

  ngOnDestroy(): void {
    removeStylesheet(this.stylesheetUrl);
    document.removeEventListener('click', this.saveData.bind(this));
  }

  goToMain(): void {
    this.router.navigate(['/main']); 
  }

  // 화면 클릭 시 호출되는 메서드
  saveData(event: MouseEvent): void {
    if (this.height !== null && this.weight !== null) {
      this.savedHeight = this.height;
      this.savedWeight = this.weight;

      localStorage.setItem('height', this.savedHeight.toString());
      localStorage.setItem('weight', this.savedWeight.toString());
      
      this.showData = true;
    }
  }

  // 입력 필드에 포커스가 가면 표시된 데이터를 지우기
  clearDisplay(): void {
    this.showData = false;
  }
}