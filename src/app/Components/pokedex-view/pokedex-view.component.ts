// Suggested code may be subject to a license. Learn more: ~LicenseLog:2094348324.
import { Component } from '@angular/core'; // Importa el decorador Component desde el núcleo de Angular.
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule para directivas comunes como ngIf y ngFor.
import { PokedexComponent } from '../pokedex/pokedex.component'; // Importa el componente PokedexComponent.
import { GraficoComponent } from '../grafico/grafico.component'; // Importa el componente GraficoComponent.

// Decorador Component que define los metadatos del componente.
@Component({
  selector: 'app-pokedex-view', // Selector del componente, se usa para instanciarlo en el HTML.
  standalone: true, // Indica que el componente es independiente.
  imports: [CommonModule, PokedexComponent, GraficoComponent], // Importa los módulos y componentes necesarios.
  templateUrl: './pokedex-view.component.html', // Ruta a la plantilla HTML del componente.
  styleUrls: ['./pokedex-view.component.css'] // Ruta a la hoja de estilos CSS del componente.
})
// Clase del componente PokedexViewComponent.
export class PokedexViewComponent {
  pokemonId: number = 1; // Variable que almacena el ID del Pokémon actual.
  pokemonImagen: string = ''; // Variable que almacena la URL de la imagen del Pokémon actual.

  // Constructor del componente, se ejecuta al crear una instancia del componente.
  constructor() {
    this.actualizarImagen(); // Llama a la función actualizarImagen al iniciar el componente.
  }

  // Función que se ejecuta cuando se cambia el Pokémon.
  changePokemon(event: number) {
    this.pokemonId += event; // Actualiza el ID del Pokémon sumando o restando el valor del evento.
    if (this.pokemonId < 1) this.pokemonId = 1; // Si el ID es menor que 1, lo establece en 1.
    this.actualizarImagen(); // Llama a la función actualizarImagen para mostrar la imagen del nuevo Pokémon.
  }

  // Función privada que actualiza la URL de la imagen del Pokémon.
  private actualizarImagen() {
    this.pokemonImagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`; // Construye la URL de la imagen usando el ID del Pokémon.
  }
}