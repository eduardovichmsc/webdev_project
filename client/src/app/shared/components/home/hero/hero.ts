import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Link } from '../../../ui/link/link';
import { PATHS } from '../../../../core/configs/paths.config';

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, Link],
  templateUrl: './hero.html',
})
export class Hero {
  isImageLoaded = false;

  onImageLoad() {
    this.isImageLoaded = true;
  }

  heroLink = PATHS.SHOP.ROOT;
}
