import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  id: number;
  thumb: string;
  main: string;
  title?: string;
}

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign.html',
})
export class Campaign {
  activeIndex = 0;

  gallery: GalleryItem[] = [
    {
      id: 1,
      thumb: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
      main: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
    },
    {
      id: 2,
      thumb: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
      main: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
    },
    {
      id: 3,
      thumb: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
      main: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
    },
    {
      id: 4,
      thumb: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
      main: 'images/Arms_of_Eve_Jayde_Cuff_Bracelet-_Gold.webp',
    },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }
}
