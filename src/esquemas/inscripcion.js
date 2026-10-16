import { boolean, number, object, ref, string } from 'yup'
import { INICIALES } from '../datos/iniciales.js'

// ════════════════════════════════════════════════════════════════════════════
// PASO 3 · EL ESQUEMA: todas las reglas del formulario, en un solo lugar
//
// Un esquema describe la FORMA que tienen que tener los datos y sus REGLAS.
// No sabe nada de React: es un objeto de JavaScript que se puede usar para
// validar en el front… y el mismo archivo podría usarse en un backend con Node.
//
// Cada regla recibe el mensaje que ve el usuario si no se cumple. yup revisa
// las reglas en orden, y para cada campo nos llega el PRIMER error.
// ════════════════════════════════════════════════════════════════════════════

// ['bulbasaur', 'charmander', 'squirtle'], sacado de los datos (no lo escribimos dos veces)
const NOMBRES_INICIALES = INICIALES.map((inicial) => inicial.nombre)

export const esquemaInscripcion = object({
  // Ejemplo que ya venía hecho.
  // trim() saca los espacios de los costados ANTES de validar: "   " no pasa el required.
  nombre: string()
    .trim()
    .required('Poné tu nombre de entrenador')
    .min(3, 'Mínimo 3 letras')
    .max(20, 'Máximo 20 letras'),

  // email() revisa el formato (algo@algo.algo). required va antes: si está vacío,
  // el mensaje que tiene sentido es "obligatorio", no "inválido".
  email: string()
    .trim()
    .required('El email es obligatorio')
    .email('Ese email no es válido'),

  // Ojo con los números: un <input type="number"> siempre entrega TEXTO ("12").
  // number() lo convierte a número (12). Si no se puede convertir ("" o "abc"),
  // el resultado es NaN y salta typeError: por eso el input vacío muestra ESTE mensaje.
  edad: number()
    .typeError('Poné tu edad (un número)')
    .integer('Sin decimales')
    .min(10, 'Para la Liga hay que tener 10 años o más')
    .max(99, 'Máximo 99'),

  // oneOf: el valor tiene que ser uno de la lista. Así nadie se inscribe con
  // "mewtwo" aunque edite el HTML desde DevTools.
  inicial: string()
    .required('Elegí tu Pokémon inicial')
    .oneOf(NOMBRES_INICIALES, 'Ese no es un inicial de Kanto'),

  // Un checkbox entrega true o false. oneOf([true]) = "tiene que estar tildado".
  reglas: boolean().oneOf([true], 'Tenés que aceptar las reglas de la Liga'),
})

// ➕ PLUS · Confirmar el email.
// shape() devuelve un esquema NUEVO con los campos de antes + los que agregamos.
// ref('email') apunta al valor del campo email: oneOf([ref('email')]) se lee
// "tiene que ser igual a lo que se escribió en email".
export const esquemaInscripcionConPlus = esquemaInscripcion.shape({
  confirmarEmail: string()
    .trim()
    .required('Repetí el email')
    .oneOf([ref('email')], 'Los emails no coinciden'),
})
