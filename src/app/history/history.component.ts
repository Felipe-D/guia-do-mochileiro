import { Component, OnInit } from '@angular/core';
import { BackApiService } from '../services/back-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  private list:Array<object>;
  
  constructor(private back: BackApiService) { }

  ngOnInit() {
    this.getHistory();
  }
  getHistory(){
    this.back.getFilteredHistories().subscribe(
      res => { 
        console.log(res)
        this.list = res;
      }
    )
  }
}
