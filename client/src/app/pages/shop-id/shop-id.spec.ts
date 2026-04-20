import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopId } from './shop-id';

describe('ShopId', () => {
  let component: ShopId;
  let fixture: ComponentFixture<ShopId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
