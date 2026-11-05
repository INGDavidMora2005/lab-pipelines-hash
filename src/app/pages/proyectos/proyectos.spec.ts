import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Proyectos } from './proyectos';

describe('Proyectos', () => {
  let component: Proyectos;
  let fixture: ComponentFixture<Proyectos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyectos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Proyectos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el título "Proyectos"', () => {
    const titulo = fixture.nativeElement.querySelector('h1') as HTMLElement | null;

    expect(titulo?.textContent?.trim()).toBe('Proyectos');
  });

  it('debe renderizar una tarjeta por cada proyecto del arreglo', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll('article.tarjeta');

    expect(component.proyectos.length).toBeGreaterThan(0);
    expect(tarjetas.length).toBe(component.proyectos.length);
  });

  it('debe mostrar el enlace "Hablemos" apuntando a /contacto', () => {
    const enlace = fixture.nativeElement.querySelector(
      'a.proyectos__boton',
    ) as HTMLAnchorElement | null;

    expect(enlace?.textContent?.trim()).toBe('Hablemos');
    expect(enlace?.getAttribute('href')).toBe('/contacto');
  });
});
