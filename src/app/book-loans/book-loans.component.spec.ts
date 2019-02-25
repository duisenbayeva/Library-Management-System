import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLoansComponent } from './book-loans.component';

describe('BookLoansComponent', () => {
  let component: BookLoansComponent;
  let fixture: ComponentFixture<BookLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
