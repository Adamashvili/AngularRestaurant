import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToolsService } from '../tools.service';
import { Subject, finalize } from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    standalone: false
})
export class ProductsComponent implements OnInit {

  constructor(private service: ApiService, public route: Router, public tools: ToolsService) {}
  ngOnInit(): void {
    this.showCategories();
    this.showAllProducts();
    this.getCartNum()
  }

  public categories: any;
  public foodList: any;
  public activeCategory: number = 0
  public isPopuped: boolean = false
  public itemQuantity: string = "1";
  public dataToPost:any;
  public cartNum: any
  public isMiniCategoryShown = false

  miniCategoryToggle () {
    this.tools.openMiniNav()
    this.tools.miniNavToggle.subscribe((toggle) => {
      this.isMiniCategoryShown = toggle
      
    })
  }



  showCategories() {
    this.service.getCategories().subscribe((items) => {
      this.categories = items;
      this.tools.categoriesSubj.next(items)
      
    });
  }

  showAllProducts() {
    this.service.getAllProducts().subscribe((data) => {
      this.foodList = data;
      this.activeCategory = 0
    });
  }

  showProductsByCategory(itemID: number) {
    this.service.getProductsByCategory(itemID).subscribe((data:any) => {
        this.foodList = data.products
        this.activeCategory = itemID
    })
  }

  showProductsByMINI(list:any) {

    this.foodList = list.products
    
  }

  getFilteredData(filterData: any) {
    this.service.filterProducts(filterData.vegeterian, filterData.nuts, filterData.spiciness).subscribe(data => {
      this.foodList = data
      this.activeCategory = -1
      
    })
    
  }

  openModal(item:any) {
    this.isPopuped = true
    this.dataToPost = item
    
    
  }

  getCartNum() {
    this.service.getCartItems().subscribe(num => {
      this.cartNum = num
      this.tools.cartItemNumber.next(this.cartNum.length)
    })
  }

  addToCart(){
    this.service.addToCart({
      "quantity": this.itemQuantity,
      "price": this.dataToPost.price,
      "productId": this.dataToPost.id
    }).subscribe({
      next: () => {
        alert("Product added to cart successfully")
        this.isPopuped = false;
        this.getCartNum()
      },
      error: () => alert("Try again...")
    })
    
    
  }

  closeModal(){
    this.isPopuped = false
    this.itemQuantity = "1";
  }

  gotoDetails(item: any) {
      this.route.navigate(["/foodDetails"], {queryParams: item})
    }
}
