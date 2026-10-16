// Los tres Pokémon iniciales de Kanto. El id sirve para armar la URL de la imagen.
export const INICIALES = [
  { nombre: 'bulbasaur', id: 1, tipo: 'planta' },
  { nombre: 'charmander', id: 4, tipo: 'fuego' },
  { nombre: 'squirtle', id: 7, tipo: 'agua' },
]

export function imagenPokemon(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

// Busca un inicial por nombre: 'charmander' → { nombre: 'charmander', id: 4, ... }
export function buscarInicial(nombre) {
  return INICIALES.find((inicial) => inicial.nombre === nombre)
}
