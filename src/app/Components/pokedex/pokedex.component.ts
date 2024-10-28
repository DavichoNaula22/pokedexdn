import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
selector: 'app-pokedex',
standalone: true,
imports: [],
templateUrl: './pokedex.component.html',
styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  @Input({ required: true }) imageUrl: string = '';

  @Output() clickPokemon = new EventEmitter<number>();




previousPokemon() {

    this.clickPokemon.emit(-1);
    // Lógica para mostrar el Pokémon anterior
}
nextPokemon() {

    this.clickPokemon.emit(+1);
    // Lógica para mostrar el siguiente Pokémon
  }
}

