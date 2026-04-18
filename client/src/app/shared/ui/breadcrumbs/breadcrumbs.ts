import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  name: string;
  href?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumbs.html',
})
export class Breadcrumbs {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() isWhite: boolean = false;
  @Input() class: string = '';
}
