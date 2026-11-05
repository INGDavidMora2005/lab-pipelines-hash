import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the DevHub brand linking to /inicio', () => {
    const brand = compiled.querySelector('a.brand');
    expect(brand?.textContent?.trim()).toBe('DevHub');
    expect(brand?.getAttribute('href')).toBe('/inicio');
  });

  it('should render 3 navigation links with routerLink', () => {
    const links = Array.from(compiled.querySelectorAll('.nav-links a'));
    expect(links.length).toBe(3);
    expect(links.map((a) => a.textContent?.trim())).toEqual(['Inicio', 'Proyectos', 'Contacto']);
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/inicio',
      '/proyectos',
      '/contacto',
    ]);
  });
});
