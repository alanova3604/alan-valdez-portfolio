# Pendientes por revisar

Cosas que no urgen ahora, para ver después.

## Animación del mensaje enviado

- **Por qué motion no funcionó.** Con `animate()` de motion la animación se veía instantánea, y se resolvió usando `element.animate` del navegador en `components/molecules/SentMessage.tsx`. Nunca se confirmó la causa. Sospechas: se pisaban `style.transform` puesto a mano y los `x`/`y` de motion; el fade iba en una animación aparte; o era código viejo en el navegador.
- **Burbuja sobre el perfil (escritorio).** La burbuja nace arriba a la derecha y puede encimarse un momento con el texto del perfil mientras este se desvanece.
- **Espacio arriba de la respuesta.** `Conversation.tsx` pasa de `pt-16` a `pt-32` después de la primera pregunta para que la respuesta no choque con la burbuja. Ver si la distancia se siente bien, sobre todo en móvil.
- **Saltos de layout.** Al desaparecer el perfil y la bolita, el contenido de abajo sube de golpe. Se puede conservar el espacio si molesta.

## Chat

- **Enviar durante la carga.** Enter y el botón ahora envían aunque haya una respuesta pendiente. Gana siempre la pregunta más reciente y las respuestas viejas se descartan (`ChatProvider.tsx`). Probar que se sienta bien con varias preguntas seguidas.
- **Error en la primera pregunta.** La bolita vuelve cuando el mensaje llega arriba. Si la primera pregunta falla, la burbuja desaparece antes de llegar y la bolita no regresa, así que solo se ve el mensaje de error. Decidir si debe volver.

## Código

- **Errores de eslint en `Presence.tsx`.** Dos errores de `react-hooks/set-state-in-effect` (`setIndex(0)` y `setPulsing(true)` dentro de un `useEffect`). Ya existían antes de los cambios de esta sesión.
- **Nada de esto se ha visto en el navegador.** Todo se verificó solo con `tsc --noEmit`.
