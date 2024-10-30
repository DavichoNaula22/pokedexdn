// Importación de módulos y componentes necesarios
import { Component } from '@angular/core'; // Importa el decorador Component de Angular, necesario para crear un componente
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet para gestionar las rutas en la aplicación
import { PokedexViewComponent } from './Components/pokedex-view/pokedex-view.component'; // Importa el componente de la Pokédex principal
import { WelcomeComponent } from './Components/welcome/welcome.component'; // Importa el componente de bienvenida
import { CommonModule } from '@angular/common'; // Importa CommonModule para el uso de directivas comunes en Angular

// Decorador del componente
@Component({
  selector: 'app-root', // Define el selector del componente, que se usará en el HTML como <app-root>
  standalone: true, // Declara el componente como autónomo (no necesita un módulo específico para funcionar)
  imports: [RouterOutlet, PokedexViewComponent, WelcomeComponent, CommonModule], // Lista de otros módulos y componentes utilizados en el template
  template: `
    <!-- Template HTML del componente, mostrando el componente de bienvenida o el de Pokédex -->
    <app-welcome *ngIf="showWelcome" (close)="closeWelcome()"></app-welcome>
    <app-pokedex-view *ngIf="!showWelcome"></app-pokedex-view>
  `,
  styleUrls: ['./app.component.css'] // Hoja de estilos específica para este componente
})
export class AppComponent {
  title = 'myapp'; // Título de la aplicación que puede usarse en el template o lógica futura
  showWelcome = true; // Controla la visualización del componente de bienvenida: verdadero al inicio para mostrarlo

  // Método que se llama cuando se recibe el evento de cierre desde el componente de bienvenida
  closeWelcome() {
    this.showWelcome = false; // Cambia showWelcome a falso, ocultando el componente de bienvenida y mostrando el de Pokédex
  }
}
