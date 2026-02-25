import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-favourites',
  standalone: false,
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  constructor(private service: ApiService) {
    this.getRandoms()
  }
  public randomProducts: any[] = []
  public specialImage: any;
  getRandoms() {
    this.service.getAllProducts().subscribe((data:any) => {
      let a = Math.round(Math.random() * data.length - 1)
      let b = Math.round(Math.random() * data.length - 1)
      let c = Math.round(Math.random() * data.length - 1)
      this.randomProducts.push(data[a], data[b], data[c])
      this.specialImage = data[b]
      
    })
  }
}
