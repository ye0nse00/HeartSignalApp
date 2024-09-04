import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { loadStylesheet } from '../shared/utils/load-styles';
import { removeStylesheet } from '../shared/utils/remove-styles';

@Component({
  selector: 'app-exscroll',
  templateUrl: './exscroll.component.html',
  styleUrls: ['./exscroll.component.scss']
})
export class ExscrollComponent implements OnInit, OnDestroy {
  private stylesheetUrl = 'assets/styles/exscroll.css';

  // 사용자 입력 저장 변수
  exerciseNames: string[] = ['', '', '', '', ''];
  exerciseTimes: number[] = [0, 0, 0, 0, 0];

  // 선택된 색상 저장
  selectedColor: string = 'lightblue'; // 기본 색상

  constructor(private router: Router) {}

  ngOnInit(): void {
    loadStylesheet(this.stylesheetUrl);
  }

  ngOnDestroy(): void {
    removeStylesheet(this.stylesheetUrl);
  }

  // 색상 변경 함수
  setColor(index: number, event: Event): void {
    const element = event.target as HTMLElement;
    element.style.backgroundColor = this.selectedColor;
  }

  // 저장 함수
  save(): void {
    console.log('운동 리스트:', this.exerciseNames);
    console.log('운동 시간 리스트:', this.exerciseTimes);
    // 필요시 로컬스토리지나 서버로 전송
  }

  // 페이지 이동 함수
  goToExercise(): void {
    this.router.navigate(['/exercise']); 
  }
}
