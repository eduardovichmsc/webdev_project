import { Component, computed, input, Input, signal } from '@angular/core';

export interface Tab {
  id: number;
  name: string;
  content: string;
}

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  tabs = input.required<Tab[]>();

  activeTabId = signal<number>(0);

  activeTabContent = computed(() => {
    const currentTabs = this.tabs();
    const currentId = this.activeTabId();
    const found = currentTabs.find((t) => t.id === currentId);
    return found?.content || currentTabs[0]?.content || '';
  });

  activeIndex = computed(() => {
    const index = this.tabs().findIndex((t) => t.id === this.activeTabId());
    return index !== -1 ? index : 0;
  });

  setActiveTab(id: number) {
    this.activeTabId.set(id);
  }
}
