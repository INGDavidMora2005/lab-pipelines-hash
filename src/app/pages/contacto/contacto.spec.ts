import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contacto } from './contacto';

describe('Contacto', () => {
  let component: Contacto;
  let fixture: ComponentFixture<Contacto>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contacto],
    }).compileComponents();

    fixture = TestBed.createComponent(Contacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Contacto" heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Contacto');
  });

  it('should not show "Mensaje enviado" before submitting', () => {
    expect(compiled.textContent).not.toContain('Mensaje enviado');
    expect(compiled.querySelector('.tag')).toBeNull();
  });

  it('should show "Mensaje enviado" after submitting the form', () => {
    const form = compiled.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();

    const tag = compiled.querySelector('.tag');
    expect(tag?.textContent?.trim()).toBe('Mensaje enviado');
  });
});
