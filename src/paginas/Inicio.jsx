import { Link } from 'react-router'
import { INICIALES, imagenPokemon } from '../datos/iniciales.js'

// Página de inicio. Ya está hecha.
function Inicio() {
  return (
    <>
      <h1 className="titulo">Liga Pokémon de Kanto</h1>
      <p className="subtitulo">Elegí tu inicial, inscribite y recibí tu carnet de entrenador.</p>

      <div className="grilla">
        {INICIALES.map((inicial) => (
          <article key={inicial.id} className="tarjeta">
            <img src={imagenPokemon(inicial.id)} alt={inicial.nombre} width="120" height="120" />
            <h3>{inicial.nombre.charAt(0).toUpperCase() + inicial.nombre.slice(1)}</h3>
            <span className="tipo">Tipo {inicial.tipo}</span>
          </article>
        ))}
      </div>

      {/* Link: navega SIN recargar la página (a diferencia de <a href>). */}
      <Link to="/inscripcion" className="boton">Quiero inscribirme →</Link>
    </>
  )
}

export default Inicio
