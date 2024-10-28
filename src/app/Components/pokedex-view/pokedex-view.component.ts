import { Component } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { CommonModule } from '@angular/common'; // Importa el módulo común

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraficoComponent], // Asegúrate de incluir CommonModule
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css'],
})
export class PokedexViewComponent {
  pokemonId: number = 0;
  pokemonImagen: string = '';

  changePokemon(event: number) {
    this.pokemonId = this.pokemonId + event;
    this.pokemonImagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
  }
}
