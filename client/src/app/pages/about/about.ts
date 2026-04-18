import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Social } from '../../shared/components/social/social';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { PATHS } from '../../core/configs/paths.config';
import { Title } from '@angular/platform-browser';

interface InfoBlock {
  label: string;
  content: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, Social, Breadcrumbs],
  templateUrl: './about.html',
})
export class About {
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('About Us: Simuero');
  }

  breadcrumbs = [
    {
      name: 'Home',
      href: PATHS.HOME,
    },
    {
      name: 'About us',
      href: PATHS.ABOUT,
    },
  ];

  portraitImage =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1500&auto=format&fit=crop';

  infoBlocks: InfoBlock[] = [
    {
      label: 'Origin',
      content:
        'Born by the sea and shaped by sunlight, our jewelry reflects the quiet elegance of nature — raw, imperfect, and eternal.',
    },
    {
      label: 'Values',
      content:
        'Each piece is hand-sculpted to capture the warmth of touch and the softness of organic forms. Inspired by the rhythm of waves, the texture of sand, and the calm of golden afternoons, our creations are made to be lived in, not just worn.',
    },
  ];

  items = [
    {
      title: ['About', 'Simuero'],
      image: 'images/ShannonBond-LaurevanHijfte-HRWEB-33_1500x2250_crop_center.jpg.webp',
      blocks: [
        {
          label: 'Origin',
          content:
            'Born by the sea and shaped by sunlight, our jewelry reflects the quiet elegance of nature — raw, imperfect, and eternal.',
        },
        {
          label: 'Values',
          content:
            'Each piece is hand-sculpted to capture the warmth of touch and the softness of organic forms. Inspired by the rhythm of waves, the texture of sand, and the calm of golden afternoons, our creations are made to be lived in, not just worn.',
        },
      ],
    },
    {
      title: ['Our', 'Philosophy'],
      image: 'images/e20bacba4040fb59fc1273ea6093a32b.jpg',
      blocks: [
        {
          label: 'Philosophy',
          content:
            'We believe in slow design - in taking time to shape each curve, to let the material guide the form. Every imperfection become part of the story, turning metal into memory. All pieces are crafted in small batche from sustainable materials, designed to last beyond trends and seasons.',
        },
        {
          label: 'Essence',
          content:
            "Our jewelry carries more than shine - it holds emotion, intention, and the trace of human hands. It's an ode to sunlight, skin, and stillness. A reflection of who you are and everything you become.",
        },
      ],
    },
  ];
}
