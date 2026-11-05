import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-contacto',
  styleUrl: './contacto.scss',
  templateUrl: './contacto.html',
})
export class Contacto {
  protected readonly enviado = signal(false);

  protected enviar(event: Event): void {
    event.preventDefault();
    this.enviado.set(true);
  }
}
