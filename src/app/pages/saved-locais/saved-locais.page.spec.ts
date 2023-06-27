import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedLocaisPage } from './saved-locais.page';

describe('SavedLocaisPage', () => {
  let component: SavedLocaisPage;
  let fixture: ComponentFixture<SavedLocaisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavedLocaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
