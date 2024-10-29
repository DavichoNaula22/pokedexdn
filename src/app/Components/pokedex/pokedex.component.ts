import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Evolution {
  id: number;
  name: string;
  sprite: string;
}

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnChanges {
  @Input({ required: true }) imageUrl: string = '';
  @Input({ required: true }) pokemonId: number = 1;
  @Output() clickPokemon = new EventEmitter<number>();

  evolutionChain: Evolution[] = [];
  pokemonName: string = '';
  pokemonTypes: string[] = [];
  pokemonDescription: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonId']) {
      this.loadPokemonData();
      this.loadEvolutionChain();
    }
  }

  previousPokemon() {
    this.clickPokemon.emit(-1);
  }

  nextPokemon() {
    this.clickPokemon.emit(1);
  }

  selectEvolution(id: number) {
    this.clickPokemon.emit(id - this.pokemonId);
  }

  private loadPokemonData() {
    this.isLoading = true;
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`)
      .subscribe({
        next: (data: any) => {
          this.pokemonName = data.name;
          this.pokemonTypes = data.types.map((type: any) => type.type.name);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading Pokemon data:', error);
          this.isLoading = false;
        }
      });

    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}/`)
      .subscribe({
        next: (data: any) => {
          const description = data.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          );
          this.pokemonDescription = description ? description.flavor_text : '';
        },
        error: (error) => {
          console.error('Error loading Pokemon description:', error);
        }
      });
  }

  private loadEvolutionChain() {
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}/`)
      .subscribe({
        next: (speciesData: any) => {
          this.http.get(speciesData.evolution_chain.url)
            .subscribe({
              next: (evolutionData: any) => {
                this.evolutionChain = this.extractEvolutionChain(evolutionData.chain);
              },
              error: (error) => {
                console.error('Error loading evolution chain:', error);
              }
            });
        },
        error: (error) => {
          console.error('Error loading Pokemon species:', error);
        }
      });
  }

  private extractEvolutionChain(chain: any): Evolution[] {
    let evolutions: Evolution[] = [];
    
    const addEvolution = (evolutionData: any) => {
      const id = this.getIdFromUrl(evolutionData.species.url);
      evolutions.push({
        id: id,
        name: evolutionData.species.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      });

      if (evolutionData.evolves_to && evolutionData.evolves_to.length > 0) {
        evolutionData.evolves_to.forEach((evo: any) => {
          addEvolution(evo);
        });
      }
    };

    addEvolution(chain);
    return evolutions;
  }

  private getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#777777';
  }
}