import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViagensCriadasPage } from './viagens-criadas.page';

describe('ViagensCriadasPage', () => {
  let component: ViagensCriadasPage;
  let fixture: ComponentFixture<ViagensCriadasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViagensCriadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
