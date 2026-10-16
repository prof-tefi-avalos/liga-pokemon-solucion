import { Link, NavLink, Outlet } from 'react-router'

// ════════════════════════════════════════════════════════════════════════════
// PASO 2 · EL LAYOUT: lo que se repite en todas las páginas
// ════════════════════════════════════════════════════════════════════════════
function Layout() {
  return (
    <>
      <header className="cabecera">
        <div className="cabecera-interior">
          <Link to="/" className="logo">
            <img src="/pokeball.svg" alt="" width="28" height="28" />
            Liga Pokémon
          </Link>

          {/* Cambiamos <a href> por <NavLink to>:
              1. Navega SIN recargar la página (como Link): no se pierde el estado
                 y no se vuelve a descargar la app.
              2. Le agrega la clase "active" al link de la ruta actual, y el CSS
                 (.nav a.active) lo pinta de blanco.
              "end" en el de Inicio: sin él, "/" estaría activo en TODAS las rutas,
              porque todas las URLs empiezan con "/". Con end, solo cuando la URL
              es exactamente "/". */}
          <nav className="nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/inscripcion">Inscripción</NavLink>
          </nav>
        </div>
      </header>

      <main className="contenido">
        {/* El Outlet es el "hueco" donde React Router dibuja la ruta HIJA que
            coincide con la URL (Inicio, Inscripcion, Bienvenida o el 404).
            Sin él, el Layout se ve pero las páginas no aparecen nunca. */}
        <Outlet />
      </main>

      <footer className="pie">Ejercicio clase 13 · React Router + react-hook-form + yup</footer>
    </>
  )
}

export default Layout
