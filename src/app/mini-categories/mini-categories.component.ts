import {
  AfterContentInit,
  ApplicationInitStatus,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { ToolsService } from '../tools.service';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-mini-categories',
    templateUrl: './mini-categories.component.html',
    styleUrl: './mini-categories.component.css',
    standalone: false
})
export class MiniCategoriesComponent implements OnInit {
  constructor(public tools: ToolsService, public apiServ: ApiService) {}
  ngOnInit(): void {
    this.getCategories();
  }

  public categories: any;
  @Output() dataTransfer: EventEmitter<any> = new EventEmitter();
 
  public activeCategory: number = 0;

  getCategories() {
    this.tools.categoriesSubj.subscribe((data) => {
      this.categories = data;
      this.activeCategory = 0
      console.log(data);
      
    });
  }

  showByCategory(id: any) {
    this.activeCategory = id
    this.apiServ.getProductsByCategory(id).subscribe((data) => {
      this.dataTransfer.emit(data);
    });
  }

  closeNav() {
     this.tools.closeMiniNav()
  }
}
