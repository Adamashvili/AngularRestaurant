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

  constructor(private service: ApiService, public route: Router, public tools: ToolsService) { }
  ngOnInit(): void {
    this.showCategories();
    this.showAllProducts();
    this.getCartNum()
  }

  public categories: any;
  public foodList: any;
  public activeCategory: any = 0
  public isDetailsPopuped: boolean = false
  public itemQuantity: string = "1";
  public dataToPost: any;
  public cartNum: any
  public currentCategory: string = ""
  public currentItem: any;
  public isFilterShown: boolean = false
  



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
    this.service.getProductsByCategory(itemID).subscribe((data: any) => {
      this.foodList = data.products
      this.activeCategory = itemID
      this.currentCategory = data.name
    })
  }


  getFilteredData(filterData: any) {
    if (this.activeCategory == 0) {
      this.activeCategory = ""
    }

    if (filterData) {
      this.service.filterProducts(filterData.vegeterian, filterData.nuts, filterData.spiciness, this.activeCategory).subscribe(data => this.foodList = data)
    }else{
      this.showAllProducts()
    }
  }

  close(e: boolean) {
    this.isFilterShown = e


  }

  closeArea(e:any) {
    if(e.target.className == "details") {
      this.isDetailsPopuped = false
    }
  }

  getCartNum() {
    this.service.getCartItems().subscribe(num => {
      this.cartNum = num
      this.tools.cartItemNumber.next(this.cartNum.length)
    })
  }

  getDetails(item:any) {
    this.currentItem = item
    this.isDetailsPopuped = true
  }

  addToCart() {
    this.service.getCartItems().subscribe((cartData: any) => {
      let isProdAtCart = cartData.find((cartItem: any) => cartItem.product.id == this.dataToPost.id)
      if (!isProdAtCart) {
        this.service.addToCart({
          "quantity": this.itemQuantity,
          "price": this.dataToPost.price,
          "productId": this.dataToPost.id
        }).subscribe({
          next: () => {
            alert("Product added to cart successfully")
            this.isDetailsPopuped = false;
            this.getCartNum()
          },
          error: () => alert("Try again...")
        })
      }
      else {

        this.service.updateCartItem({
          "quantity": this.itemQuantity + isProdAtCart.quantity,
          "price": this.dataToPost.price,
          "productId": this.dataToPost.id
        }).subscribe({
          next: () => {
            alert("Product Increased")
            this.isDetailsPopuped = false;
            this.getCartNum()
          },
          error: () => alert("Try again...")
        })
      }

    })
  }

 
}
