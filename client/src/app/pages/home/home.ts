import { Component } from '@angular/core';
import { Bestsellers } from '../../shared/components/home/bestsellers/bestsellers';
import { Campaign } from '../../shared/components/home/campaign/campaign';
import { Categories } from '../../shared/components/home/categories/categories';
import { Process } from '../../shared/components/home/process/process';
import { Hero } from '../../shared/components/home/hero/hero';
import { Social } from '../../shared/components/social/social';

@Component({
  selector: 'app-home',
  imports: [Hero, Bestsellers, Campaign, Categories, Process, Social],
  templateUrl: './home.html',
})
export class Home {}
