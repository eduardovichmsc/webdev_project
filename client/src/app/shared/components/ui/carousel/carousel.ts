import { Component, Input, ContentChild, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element';

register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Carousel {
  @Input() items: any[] = [];

  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;
}
