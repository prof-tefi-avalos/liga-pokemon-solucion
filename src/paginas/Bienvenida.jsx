import { Link, Navigate, useSearchParams } from 'react-router'
import { buscarInicial, imagenPokemon } from '../datos/iniciales.js'

// Página de bienvenida: lee los datos del entrenador DESDE LA URL. Ya está hecha.
//
//   /bienvenida?nombre=Ash&inicial=charmander&carnet=11
//
// useSearchParams lee el query string (lo que va después del "?"). Como los datos
// viven en la URL, si recargás la página o compartís el link, el carnet sigue ahí.
function Bienvenida() {
  const [searchParams] = useSearchParams()
  const nombre = searchParams.get('nombre')
  const inicial = buscarInicial(searchParams.get('inicial'))
  const carnet = searchParams.get('carnet')

  // Si alguien entra a /bienvenida sin datos, lo mandamos al formulario.
  // "replace" reemplaza la entrada del historial: con "Atrás" no vuelve acá.
  if (!nombre || !inicial) {
    return <Navigate to="/inscripcion" replace />
  }

  return (
    <>
      <h1 className="titulo">¡Bienvenido/a a la Liga!</h1>
      <article className="carnet">
        <img src={imagenPokemon(inicial.id)} alt={inicial.nombre} width="140" height="140" />
        <div>
          <p className="numero">Carnet de entrenador #{carnet}</p>
          <h2>{nombre}</h2>
          <p className="subtitulo">
            Tu compañero de aventura es <b>{inicial.nombre}</b>, tipo {inicial.tipo}.
          </p>
        </div>
      </article>
      <Link to="/inscripcion" className="boton">Inscribir a otro entrenador</Link>
    </>
  )
}

export default Bienvenida
