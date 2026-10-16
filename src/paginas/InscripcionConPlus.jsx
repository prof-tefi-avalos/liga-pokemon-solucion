import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router'
import ErrorCampo from '../components/ErrorCampo.jsx'
import { INICIALES, imagenPokemon } from '../datos/iniciales.js'
import { esquemaInscripcionConPlus } from '../esquemas/inscripcion.js'
import { inscribirEntrenador } from '../servicios/inscripciones.js'

// ➕ Versión con el PLUS: confirmar email (ref) y validar al salir del campo (mode).
// Lo que cambia respecto de Inscripcion.jsx está marcado con ➕.
function InscripcionConPlus() {
  // ══════════════════════════════════════════════════════════════════════════
  // PASO 4 · CONECTAR EL FORMULARIO
  //
  // useForm reemplaza a todos los useState del formulario controlado:
  //   register      → conecta cada input con el formulario (por su name)
  //   handleSubmit  → hace el preventDefault, valida y, si todo está bien,
  //                   llama a NUESTRA función con los datos ya validados
  //   formState     → errors (por campo) e isSubmitting (true mientras se envía)
  //   setError      → para cargar a mano un error que no es de un campo (el de la API)
  //
  // resolver: yupResolver(esquema) → "validá con este esquema de yup en vez de
  // con las reglas de react-hook-form". Las reglas viven en el esquema, no acá.
  // ══════════════════════════════════════════════════════════════════════════
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(esquemaInscripcionConPlus), // ➕ el esquema con confirmarEmail
    defaultValues: { nombre: '', email: '', confirmarEmail: '', edad: '', inicial: '', reglas: false },
    // ➕ mode: CUÁNDO valida. Por defecto es 'onSubmit' (recién al enviar).
    //    'onTouched' valida cuando salís de un campo por primera vez (blur) y,
    //    desde ahí, en cada cambio: el error aparece y desaparece mientras escribís.
    mode: 'onTouched',
  })

  // PASO 5 · useNavigate devuelve una función para navegar DESDE EL CÓDIGO
  // (no hay un link que el usuario toque: navegamos cuando termina el POST).
  const navigate = useNavigate()

  // onSubmit SOLO se ejecuta si el esquema dio todo OK. Los datos llegan ya
  // validados y transformados por yup: nombre sin espacios, edad como NÚMERO.
  async function onSubmit(datos) {
    try {
      // Mientras esta promesa no termina, isSubmitting es true (botón deshabilitado).
      const entrenador = await inscribirEntrenador(datos)

      // URLSearchParams arma el query string y "escapa" los caracteres raros:
      // { nombre: 'Ash Ketchum' } → "nombre=Ash+Ketchum"
      const params = new URLSearchParams({
        nombre: entrenador.nombre,
        inicial: entrenador.inicial,
        carnet: entrenador.id,
      })
      navigate(`/bienvenida?${params}`)
    } catch (err) {
      // Error de la API (no de un campo): lo guardamos en "root" y se muestra abajo.
      setError('root', { message: err.message })
    }
  }

  return (
    <>
      <h1 className="titulo">Inscripción a la Liga</h1>

      {/* handleSubmit(onSubmit): primero valida; si hay errores, NO llama a onSubmit.
          noValidate apaga los globitos de validación del navegador: los errores
          los mostramos nosotros, con los mensajes del esquema. */}
      <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Ejemplo que ya venía hecho: label + input con register + error */}
        <div className="campo">
          <label htmlFor="nombre">Nombre de entrenador</label>
          {/* {...register('nombre')} le pone al input: name, onChange, onBlur y ref.
              El input NO tiene value ni onChange nuestros: react-hook-form lee el
              valor directo del DOM (input no controlado), y por eso escribir
              no vuelve a renderizar el componente en cada tecla. */}
          <input id="nombre" type="text" {...register('nombre')} />
          <ErrorCampo mensaje={errors.nombre?.message} />
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          <ErrorCampo mensaje={errors.email?.message} />
        </div>

        {/* ➕ El campo nuevo. El nombre en register tiene que ser IGUAL a la clave del esquema. */}
        <div className="campo">
          <label htmlFor="confirmarEmail">Repetí el email</label>
          <input id="confirmarEmail" type="email" {...register('confirmarEmail')} />
          <ErrorCampo mensaje={errors.confirmarEmail?.message} />
        </div>

        <div className="campo">
          <label htmlFor="edad">Edad</label>
          <input id="edad" type="number" {...register('edad')} />
          <ErrorCampo mensaje={errors.edad?.message} />
        </div>

        {/* Radios: los tres llevan el MISMO register('inicial'); cada uno con su value.
            El valor del campo es el value del radio elegido. */}
        <fieldset className="campo">
          <legend>Elegí tu inicial</legend>
          <div className="opciones">
            {INICIALES.map((inicial) => (
              <label key={inicial.id} className="opcion">
                <img src={imagenPokemon(inicial.id)} alt="" width="72" height="72" />
                <input type="radio" value={inicial.nombre} {...register('inicial')} />
                {inicial.nombre}
              </label>
            ))}
          </div>
          <ErrorCampo mensaje={errors.inicial?.message} />
        </fieldset>

        {/* Un checkbox SIN value entrega true o false. */}
        <div className="campo">
          <label className="check">
            <input type="checkbox" {...register('reglas')} />
            Acepto las reglas de la Liga (nada de Rare Candies)
          </label>
          <ErrorCampo mensaje={errors.reglas?.message} />
        </div>

        {/* El error de la API, el que cargamos con setError('root', …) */}
        {errors.root && <p className="error-envio">😵 {errors.root.message}</p>}

        {/* isSubmitting: deshabilitado mientras se envía, para no mandar tres POST
            si el usuario hace triple click (lo mismo que hacíamos a mano con
            un estado "enviando" en la clase 12, pero gratis). */}
        <button type="submit" className="boton" disabled={isSubmitting}>
          {isSubmitting ? 'Inscribiendo…' : 'Inscribirme'}
        </button>
      </form>
    </>
  )
}

export default InscripcionConPlus
