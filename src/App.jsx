import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import Inscripcion from './paginas/Inscripcion.jsx'
import Bienvenida from './paginas/Bienvenida.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'

// ════════════════════════════════════════════════════════════════════════════
// PASO 1 · RUTAS ANIDADAS
//
// Antes, las tres rutas estaban sueltas: cada página tenía que repetir la
// cabecera y el pie. Ahora hay una RUTA DE LAYOUT (sin path) que envuelve a las
// demás: Layout se dibuja siempre, y en su <Outlet /> aparece la ruta hija que
// coincide con la URL.
//
//   URL              Layout +  Outlet
//   /                Layout +  <Inicio />        ← ruta index
//   /inscripcion     Layout +  <Inscripcion />
//   /bienvenida      Layout +  <Bienvenida />
//   /lo-que-sea      Layout +  <NoEncontrada />  ← path="*"
// ════════════════════════════════════════════════════════════════════════════
function App() {
  return (
    <Routes>
      {/* Ruta de layout: NO tiene path, solo element. Envuelve a sus hijas. */}
      <Route element={<Layout />}>
        {/* index = "la hija que se muestra cuando la URL es exactamente la del padre" (/).
            Lleva "index" en lugar de path. */}
        <Route index element={<Inicio />} />

        {/* Las rutas hijas se escriben SIN la barra inicial: son relativas al padre. */}
        <Route path="inscripcion" element={<Inscripcion />} />
        <Route path="bienvenida" element={<Bienvenida />} />

        {/* path="*" coincide con cualquier URL que no coincidió con las anteriores.
            Al estar adentro del Layout, el 404 también tiene cabecera y pie. */}
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
