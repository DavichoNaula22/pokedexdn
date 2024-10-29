import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraficoComponent } from '../grafico/grafico.component';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraficoComponent],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent {
  pokemonId: number = 1;
  pokemonImagen: string = '';

  constructor() {
    this.actualizarImagen();
  }

  changePokemon(event: number) {
    this.pokemonId += event;
    if (this.pokemonId < 1) this.pokemonId = 1;
    this.actualizarImagen();
  }

  private actualizarImagen() {
    this.pokemonImagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
  }
}