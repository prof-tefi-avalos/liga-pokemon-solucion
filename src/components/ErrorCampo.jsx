// Muestra el mensaje de error de un campo, si hay. Ya está hecho.
// Uso: <ErrorCampo mensaje={errors.email?.message} />
function ErrorCampo({ mensaje }) {
  if (!mensaje) return null
  return <p className="error-campo" role="alert">⚠️ {mensaje}</p>
}

export default ErrorCampo
