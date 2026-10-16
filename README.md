# 🔴 Ejercicio Liga Pokémon — Solución (docente)

```bash
npm install
npm run dev     # → http://localhost:5173
```

Los archivos que cambian respecto de `inicio/`, comentados paso a paso (PASO 1 a 5, los mismos de la consigna):

| Paso | Archivo |
|---|---|
| 1 · Rutas anidadas, index y 404 | `src/App.jsx` |
| 2 · NavLink + `end` + Outlet | `src/components/Layout.jsx` |
| 3 · El esquema de yup | `src/esquemas/inscripcion.js` |
| 4 y 5 · useForm + yupResolver, register, errores, isSubmitting y useNavigate | `src/paginas/Inscripcion.jsx` |

**Plus:** `src/paginas/InscripcionConPlus.jsx` (confirmar email con `ref` y `mode: 'onTouched'`) y `esquemaInscripcionConPlus` al final de `src/esquemas/inscripcion.js`. Para verlo, en `src/App.jsx` cambiá `import Inscripcion from './paginas/Inscripcion.jsx'` por `import Inscripcion from './paginas/InscripcionConPlus.jsx'`. Lo que cambia está marcado con ➕.

La explicación completa, con qué decir en cada paso, está en `../guion-resolucion-ejercicio-liga.pdf`.
