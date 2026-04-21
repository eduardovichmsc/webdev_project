import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PATHS } from '../../core/configs/paths.config';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit, OnDestroy {
  shopPath = `/${PATHS.SHOP.ROOT}`;
  homePath = '/';

  /** Анимированный счётчик — считает от 0 до 404 */
  counter = signal(0);

  private animFrame: number | null = null;
  private startTime: number | null = null;
  private readonly DURATION = 900; // ms
  private readonly TARGET = 404;

  constructor(private title: Title) {
    this.title.setTitle('404 — Page Not Found | Simuero');
  }

  ngOnInit(): void {
    const animate = (timestamp: number) => {
      if (!this.startTime) this.startTime = timestamp;
      const elapsed = timestamp - this.startTime;
      const progress = Math.min(elapsed / this.DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      this.counter.set(Math.round(eased * this.TARGET));
      if (progress < 1) {
        this.animFrame = requestAnimationFrame(animate);
      }
    };
    this.animFrame = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    if (this.animFrame !== null) cancelAnimationFrame(this.animFrame);
  }
}
