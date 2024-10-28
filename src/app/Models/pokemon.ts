export class PokemonModel{
   private Id:number;
   private  name: string ;
   private  image: string;
   private  vida:number;
   private  ataque:number;
   private  defensa: number;
   private  tipo: string;

    constructor(Id:number,name: string,image: string,vida:number,ataque:number,defensa: number,tipo: string){
        this.Id = Id;
        this.name = name;
        this.image = image;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.tipo = tipo;
    }

    /*Getter */

    getId():number{
        return this.Id;
      }
    getName():string{
        return this.name;
    }
    getImage():string{
        return this.image;
    }
    getVida():number{
        return this.vida;
    }
    getAtaque():number{
        return this.ataque;
    }
    getDefensa():number{
        return this.defensa;
    }



    /*Setters*/

    setId(Id:number):void{
        this.Id=Id;

    }
    setName(name:string):void{
        this.name=name;
    }
    setImage(image:string):void{
        this.image=image;
    }
    setVida(vida:number):void{
        this.vida=vida;
    }
    setAtaque(ataque:number):void{
        this.ataque=ataque;
    }
    setDefensa(defensa:number):void{
        this.defensa=defensa;
    }

    /* metodos de clase*/


    mostrarPokemon(): string{
        return "Id: " + this.Id +
               "\nNombre: " + this.name +
               "\nImagen: " + this.image +
               "\nVida: " + this.vida +
               "\nAtaque: " + this.ataque +
               "\nDefensa: " + this.defensa +
               "\nTipo: " + this.tipo;
    }


    calcularDaño(pokemonAtecante:PokemonModel):number{

        if (pokemonAtecante.getAtaque()> this.defensa){
            return pokemonAtecante.getAtaque() - this.defensa;
        }else{
            return 0;
        }
    }
}



