import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Link } from '../../ui/link/link';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Carousel } from '../../ui/carousel/carousel';
import { ProductCard } from '../../ui/product-card/product-card';
import { register } from 'swiper/element';
import { products } from '../../../../data/mock';
import { PATHS } from '../../../../core/configs/paths.config';

register();

@Component({
  selector: 'app-bestsellers',
  imports: [Carousel, Link, CommonModule, RouterLink, ProductCard],
  templateUrl: './bestsellers.html',
  styleUrl: './bestsellers.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bestsellers {
  link = PATHS.SHOP.ROOT;
  products = products;
}
