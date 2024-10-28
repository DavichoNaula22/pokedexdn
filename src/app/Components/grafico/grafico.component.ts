import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [NgIf],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {

  // Atributos del Pokémon
  nombre: string = 'Pikachu';
  id: number = 25;
  tipo: string = 'Messi';
  ataques: number = 3;
  ataque: number = 55;
  defensa: number = 40;
  vidaPokemon: number = 100;

 
}
