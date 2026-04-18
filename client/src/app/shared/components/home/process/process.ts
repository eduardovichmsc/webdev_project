import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Link } from '../../ui/link/link';
import { PATHS } from '../../../../core/configs/paths.config';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, Link],
  templateUrl: './process.html',
})
export class Process {
  link = PATHS.ABOUT;

  leftImage = 'images/2113652-800w.jpg';
  centerRingImage = 'blueprint/FARO-BLU-GD_Simuero-2.webp';
}
