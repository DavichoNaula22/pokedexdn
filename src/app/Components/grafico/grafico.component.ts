import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnChanges {
  @Input() pokemonId: number = 1;
  
  nombre: string = '';
  tipos: string[] = [];
  stats = {
    hp: 0,
    ataque: 0,
    defensa: 0,
    ataqueEspecial: 0,
    defensaEspecial: 0,
    velocidad: 0
  };

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    if (this.pokemonId) {
      this.cargarDatosPokemon();
    }
  }

  private cargarDatosPokemon() {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`)
      .subscribe({
        next: (data: any) => {
          this.nombre = data.name;
          this.tipos = data.types.map((t: any) => t.type.name);
          this.stats = {
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            ataqueEspecial: data.stats[3].base_stat,
            defensaEspecial: data.stats[4].base_stat,
            velocidad: data.stats[5].base_stat
          };
        },
        error: (error) => {
          console.error('Error cargando datos del Pokémon:', error);
        }
      });
  }
}