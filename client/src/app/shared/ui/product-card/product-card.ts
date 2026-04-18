import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() item!: any;
  @Input() href!: (string | number)[];

  protected readonly Array = Array;
}
