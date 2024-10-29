import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  @Input() imageUrl: string = '';
  @Input() currentPokemonId: number = 1;
  @Output() clickPokemon = new EventEmitter<number>();

  previousPokemon() {
    this.clickPokemon.emit(-1);
  }

  nextPokemon() {
    this.clickPokemon.emit(+1);
  }
}