import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Inicio } from './inicio';

describe('Inicio', () => {
  let fixture: ComponentFixture<Inicio>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Inicio);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the main title', () => {
    expect(element.querySelector('h1')?.textContent).toContain('Bienvenido a DevHub');
  });

  it('should have links to proyectos and contacto', () => {
    const links = Array.from(element.querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(links).toContain('/proyectos');
    expect(links).toContain('/contacto');
  });
});