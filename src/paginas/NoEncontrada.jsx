import { Link } from 'react-router'
import { imagenPokemon } from '../datos/iniciales.js'

// Se muestra cuando la URL no coincide con ninguna ruta. Ya está hecha.
function NoEncontrada() {
  return (
    <section className="no-encontrada">
      <img src={imagenPokemon(143)} alt="Snorlax durmiendo" width="160" height="160" />
      <h1 className="titulo">404 · Ruta bloqueada</h1>
      <p className="subtitulo">Un Snorlax se durmió en el medio del camino. Esta página no existe.</p>
      <Link to="/" className="boton">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrada
