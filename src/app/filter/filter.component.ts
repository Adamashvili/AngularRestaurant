import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css',
    standalone: false
})
export class FilterComponent {
  constructor() {}

  public spiciness: string = "-1";
  public nuts: string = "";
  public vegeterian: string = ""

  @Output() public filterTransfer: EventEmitter<any> = new EventEmitter()

  

  filterProducts() {
    if(this.spiciness == "-1") {
      this.spiciness = ""
    }
    let filteringInfo = {
      spiciness : this.spiciness,
      nuts: this.nuts,
      vegeterian: this.vegeterian
    }
    this.filterTransfer.emit(filteringInfo)
    
  }

  resetInputs() {
    this.spiciness = "-1",
    this.nuts = "",
    this.vegeterian = ""
  }
}
