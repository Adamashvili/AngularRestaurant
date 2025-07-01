import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.css',
    standalone: false
})
export class LoadingComponent implements OnInit {
  constructor(public tools: ToolsService) {}
  ngOnInit(): void {
    this.loadingInfo()
  }

  public isLoading: boolean = false

  loadingInfo() {
    this.tools.loadingSub.subscribe(info => {
      this.isLoading = info
      
    })
  }
}
