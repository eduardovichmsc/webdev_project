import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type LinkAnimation = 'default' | 'slide-up' | 'scale' | 'none';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link.html',
})
export class Link {
  @Input() class: string = '';
  @Input() href: string = '#';
  @Input() showIcon: boolean = true;
  @Input() isWhite: boolean = false;
  @Input() iconSrc: string = '';

  @Input() animation: LinkAnimation = 'default';
}
