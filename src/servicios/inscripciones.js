// ════════════════════════════════════════════════════════════════════════════
// SERVICIO DE INSCRIPCIONES (POST con fetch, como en la clase 12)
//
// JSONPlaceholder acepta el POST y contesta 201 Created con lo que le mandamos
// más un id (siempre 11 en /users), aunque no lo guarda de verdad.
// Ya está hecho: no hace falta tocarlo.
// ════════════════════════════════════════════════════════════════════════════
const URL_INSCRIPCIONES = 'https://jsonplaceholder.typicode.com/users'

export async function inscribirEntrenador(entrenador) {
  const respuesta = await fetch(URL_INSCRIPCIONES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entrenador),
  })

  if (!respuesta.ok) {
    throw new Error(`No se pudo completar la inscripción (error ${respuesta.status})`)
  }

  // Devuelve lo que mandamos + el id nuevo: { nombre, email, edad, inicial, reglas, id: 11 }
  return respuesta.json()
}
