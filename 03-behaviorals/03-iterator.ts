/**
 * ! Iterator Pattern
 * This pattern allows traversing the elements of a collection without exposing
 * the internal structure of the collection.
 *
 * * It is useful when you need to traverse a collection of elements regardless
 * * of how the elements are stored.
 *
 * https://refactoring.guru/design-patterns/iterator
 */

interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index < this.pokemons.length) return this.pokemons[index];

    return null;
  }

  getLength(): number {
    return this.pokemons.length;
  }

  //? Create iterator
  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  private collection: PokemonCollection;
  private position: number = 0;

  constructor(collection: PokemonCollection) {
    this.collection = collection;
  }

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++);
    }

    return null;
  }
  hasNext(): boolean {
    return this.position < this.collection.getLength();
  }
  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position);
  }
}


function main(){
    const pokedex = new PokemonCollection();

    pokedex.addPokemon(new Pokemon('Pikachu', 'Electric'));
    pokedex.addPokemon(new Pokemon('Charmander', 'Fire'));
    pokedex.addPokemon(new Pokemon('Squirtle', 'Water'));
    pokedex.addPokemon(new Pokemon('Bulbasaur', 'Grass'));
    pokedex.addPokemon(new Pokemon('Jigglypuff', 'Fairy'));

    const iterator = pokedex.createIterator();

    while( iterator.hasNext()){
        const pokemon = iterator.next();

        if(pokemon){
            console.log(`Pokemon: ${pokemon.name}, Type: ${pokemon.type}`)
        }
    }
}


main();