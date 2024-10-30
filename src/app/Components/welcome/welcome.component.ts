// Importa las dependencias necesarias de Angular.
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define el decorador @Component para configurar los metadatos del componente.
@Component({
  selector: 'app-welcome', // Nombre del selector para incluir el componente en una plantilla.
  standalone: true, // Permite que el componente sea independiente y usado en otras aplicaciones sin un módulo principal.
  imports: [CommonModule], // Importa módulos necesarios, en este caso, CommonModule para funciones básicas de Angular.
  templateUrl: './welcome.component.html', // Ubicación del archivo de plantilla HTML.
  styleUrls: ['./welcome.component.css'] // Ubicación del archivo de estilos CSS.
})
export class WelcomeComponent {
  // Declara un Output llamado "close" para emitir eventos al componente padre.
  @Output() close = new EventEmitter<void>();

  // Método llamado onClose que emite un evento cuando se cierra el componente.
  onClose() {
    this.close.emit(); // Emite el evento "close" sin ningún valor.
  }
}
