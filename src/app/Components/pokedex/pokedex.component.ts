// Importa módulos y decoradores necesarios de Angular
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Define una interfaz para la evolución del Pokémon
interface Evolution {
  id: number;        // ID del Pokémon
  name: string;      // Nombre del Pokémon
  sprite: string;    // URL de la imagen del Pokémon
}

// Declara el componente Pokedex
@Component({
  selector: 'app-pokedex',               // Selector del componente
  standalone: true,                       // Indica que el componente es independiente
  imports: [CommonModule],                // Importa CommonModule para usar directivas comunes
  templateUrl: './pokedex.component.html', // Define la URL de la plantilla del componente
  styleUrls: ['./pokedex.component.css']  // Define la URL de los estilos del componente
})
export class PokedexComponent implements OnChanges {
  // Propiedades de entrada que se reciben del componente padre
  @Input({ required: true }) imageUrl: string = ''; // URL de la imagen del Pokémon
  @Input({ required: true }) pokemonId: number = 1; // ID del Pokémon
  @Output() clickPokemon = new EventEmitter<number>(); // Emisor de eventos para interacciones con el Pokémon

  // Propiedades internas del componente
  evolutionChain: Evolution[] = []; // Array para almacenar la cadena de evolución
  pokemonName: string = '';         // Nombre del Pokémon
  pokemonTypes: string[] = [];      // Tipos del Pokémon
  pokemonDescription: string = '';   // Descripción del Pokémon
  isLoading: boolean = false;       // Estado de carga

  // Constructor del componente
  constructor(private http: HttpClient) {} // Inyecta el HttpClient para hacer peticiones HTTP

  // Método que se llama cuando hay cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges) {
    // Verifica si el ID del Pokémon ha cambiado
    if (changes['pokemonId']) {
      this.loadPokemonData();       // Carga los datos del Pokémon
      this.loadEvolutionChain();    // Carga la cadena de evolución
    }
  }

  // Método para ir al Pokémon anterior
  previousPokemon() {
    this.clickPokemon.emit(-1); // Emite -1 para indicar que se quiere el Pokémon anterior
  }

  // Método para ir al siguiente Pokémon
  nextPokemon() {
    this.clickPokemon.emit(1); // Emite 1 para indicar que se quiere el siguiente Pokémon
  }

  // Método para seleccionar una evolución específica
  selectEvolution(id: number) {
    this.clickPokemon.emit(id - this.pokemonId); // Calcula la diferencia y emite el evento
  }

  // Método privado para cargar los datos del Pokémon
  private loadPokemonData() {
    this.isLoading = true; // Cambia el estado a cargando
    // Realiza una petición para obtener datos del Pokémon
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`)
      .subscribe({
        next: (data: any) => { // Maneja la respuesta exitosa
          this.pokemonName = data.name; // Asigna el nombre del Pokémon
          // Asigna los tipos del Pokémon
          this.pokemonTypes = data.types.map((type: any) => type.type.name);
          this.isLoading = false; // Cambia el estado a no cargando
        },
        error: (error) => { // Maneja errores de la petición
          console.error('Error loading Pokemon data:', error);
          this.isLoading = false; // Cambia el estado a no cargando
        }
      });

    // Realiza una petición para obtener la especie del Pokémon
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}/`)
      .subscribe({
        next: (data: any) => { // Maneja la respuesta exitosa
          const description = data.flavor_text_entries.find( // Busca la descripción en español
            (entry: any) => entry.language.name === 'es'
          );
          this.pokemonDescription = description ? description.flavor_text : ''; // Asigna la descripción
        },
        error: (error) => { // Maneja errores de la petición
          console.error('Error loading Pokemon description:', error);
        }
      });
  }

  // Método privado para cargar la cadena de evolución del Pokémon
  private loadEvolutionChain() {
    // Realiza una petición para obtener la especie del Pokémon
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}/`)
      .subscribe({
        next: (speciesData: any) => { // Maneja la respuesta exitosa
          // Realiza una petición para obtener la cadena de evolución
          this.http.get(speciesData.evolution_chain.url)
            .subscribe({
              next: (evolutionData: any) => { // Maneja la respuesta exitosa
                this.evolutionChain = this.extractEvolutionChain(evolutionData.chain); // Extrae la cadena de evolución
              },
              error: (error) => { // Maneja errores de la petición
                console.error('Error loading evolution chain:', error);
              }
            });
        },
        error: (error) => { // Maneja errores de la petición
          console.error('Error loading Pokemon species:', error);
        }
      });
  }

  // Método privado para extraer la cadena de evolución
  private extractEvolutionChain(chain: any): Evolution[] {
    let evolutions: Evolution[] = []; // Array para almacenar evoluciones

    // Función auxiliar para añadir evoluciones al array
    const addEvolution = (evolutionData: any) => {
      const id = this.getIdFromUrl(evolutionData.species.url); // Obtiene el ID de la especie
      evolutions.push({
        id: id,
        name: evolutionData.species.name, // Añade el nombre de la especie
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` // Añade la URL de la imagen
      });

      // Verifica si hay más evoluciones y las añade recursivamente
      if (evolutionData.evolves_to && evolutionData.evolves_to.length > 0) {
        evolutionData.evolves_to.forEach((evo: any) => {
          addEvolution(evo); // Llama a la función para añadir evoluciones
        });
      }
    };

    addEvolution(chain); // Inicia el proceso de extracción
    return evolutions; // Devuelve el array de evoluciones
  }

  // Método privado para obtener el ID de una URL
  private getIdFromUrl(url: string): number {
    const parts = url.split('/'); // Divide la URL en partes
    return parseInt(parts[parts.length - 2]); // Devuelve el penúltimo elemento como número (ID)
  }

  // Método para obtener el color asociado a un tipo de Pokémon
  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = { // Mapa de tipos a colores
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
    return typeColors[type] || '#777777'; // Devuelve el color correspondiente o un color por defecto
  }
}
