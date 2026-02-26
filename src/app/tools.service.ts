import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  public cartItemNumber: Subject<any> = new Subject()
  public categoriesSubj: Subject<any> = new Subject()
  public categoryList: Subject<any> = new Subject()
  public miniNavToggle:  BehaviorSubject<boolean> = new BehaviorSubject(false)
  public loadingSub: BehaviorSubject<boolean> = new BehaviorSubject(false)
  

  startLoading() {
    this.loadingSub.next(true)
  }

  stopLoading() {
    this.loadingSub.next(false)
  }

  openMiniNav() {
    this.miniNavToggle.next(true)
  }

  closeMiniNav() {
    this.miniNavToggle.next(false)
  }
}
