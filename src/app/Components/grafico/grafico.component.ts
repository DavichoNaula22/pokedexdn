import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

/**
 * Componente para mostrar el gráfico de estadísticas de un Pokémon.
 */
@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnChanges {
  /** ID del Pokémon a mostrar. Recibido del componente padre. */
  @Input() pokemonId: number = 1;
  
  /** Nombre del Pokémon. */
  nombre: string = '';
  /** Tipos del Pokémon. */
  tipos: string[] = [];
  /** Arreglo de estadísticas del Pokémon para el gráfico. */
  statsArray: {name: string, value: number}[] = [];

  /**
   * Constructor del componente.
   * @param http Servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Se ejecuta cuando cambia el valor de algún Input.
   * En este caso, cuando cambia el `pokemonId`, se cargan los datos del nuevo Pokémon.
   */
  ngOnChanges() {
    if (this.pokemonId) {
      this.cargarDatosPokemon();
    }
  }

  /**
   * Carga los datos del Pokémon desde la PokéAPI.
   */
  private cargarDatosPokemon() {
    // Realiza una petición GET a la API de Pokémon con el ID del Pokémon.
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`)
      .subscribe({
        // Si la petición es exitosa:
        next: (data: any) => {
          // Asigna el nombre del Pokémon.
          this.nombre = data.name;
          // Asigna los tipos del Pokémon.
          this.tipos = data.types.map((t: any) => t.type.name);
          // Asigna las estadísticas del Pokémon al arreglo `statsArray`.
          this.statsArray = [
            // Crea un objeto para cada estadística con su nombre y valor.
            {name: 'HP', value: data.stats[0].base_stat},
            {name: 'Ataque', value: data.stats[1].base_stat},
            {name: 'Defensa', value: data.stats[2].base_stat},
            {name: 'Ataque Esp.', value: data.stats[3].base_stat},
            {name: 'Defensa Esp.', value: data.stats[4].base_stat},
            {name: 'Velocidad', value: data.stats[5].base_stat}
          ];
        },
        // Si la petición falla:
        error: (error) => {
          // Imprime un mensaje de error en la consola.
          console.error('Error cargando datos del Pokémon:', error);
        }
      });
  }
}