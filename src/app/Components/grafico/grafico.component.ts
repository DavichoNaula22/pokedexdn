import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  types: string[] = [];
  stats = {
    hp: 0,
    atk: 0,
    def: 0
  };

  ngOnChanges() {
    this.actualizarStats();
  }

  private actualizarStats() {
    // Simulación de stats basados en el ID
    this.stats.hp = 45 + (this.pokemonId % 100);
    this.stats.atk = 40 + (this.pokemonId % 80);
    this.stats.def = 35 + (this.pokemonId % 90);
    
    // Nombres de ejemplo (podrías conectar con PokeAPI para datos reales)
    const nombres = ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu'];
    this.nombre = nombres[this.pokemonId % nombres.length];
    
    // Tipos de ejemplo
    const tiposDisponibles = ['Fuego', 'Agua', 'Planta', 'Eléctrico'];
    this.types = [tiposDisponibles[this.pokemonId % tiposDisponibles.length]];
  }
}