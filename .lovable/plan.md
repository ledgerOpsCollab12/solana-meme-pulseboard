# Réplica animada de la interfaz — Cristal integrado

## Resultado
Reemplazar **solo el video principal** por una interfaz animada dentro de la página. Conservar la apariencia y los datos de la grabación, con círculos y flechas que atraviesen el marco hacia textos translúcidos externos. Construir primero esta secuencia para que puedas revisarla; el segundo panel queda pendiente de tu próxima grabación.

## Estrategia paso a paso

### 1. Fijar la referencia antes de reproducirla
- Extraer imágenes de la grabación original: vista completa, contadores superiores, lista de wallets y cada tramo del desplazamiento horizontal.
- Registrar literalmente los contadores, direcciones, clasificaciones, encabezados y valores visibles, incluyendo decimales, signos, separadores y orden de filas.
- Usar esas imágenes para comparar la réplica. **No reutilizar los datos de la maqueta anterior ni completar valores por suposición.** Si algún dato no se puede leer, identificarlo y pedir una captura nítida antes de dar la réplica por exacta.

### 2. Construir una copia estática y comprobarla
- Reproducir el panel como elementos reales de la página, no como otro video ni una imagen animada: navegación visible dentro del panel, contadores, filtros, tabla, etiquetas y barras.
- Mantener colores, proporciones, tipografía, anchos de columnas, alineaciones y datos de la referencia. La propuesta «Cristal integrado» cambia el marco y las explicaciones exteriores, **no rediseña la interfaz interna**.
- Comparar capturas de la copia con los momentos correspondientes del original antes de añadir movimiento.

### 3. Aplicar Cristal integrado alrededor de la copia
- Alinear el conjunto con los márgenes del resto del landing, con contorno fino y título promocional en una esquina del marco.
- Mantener la descripción y las explicaciones sobre superficies translúcidas fuera del área de datos.
- Reservar espacio real para las flechas y textos: no comprimir la tabla para hacer caber todo, ni tapar columnas o valores.

### 4. Animar la primera explicación: cobertura
- Mostrar los contadores superiores y rodear **Active wallets** y **Classified wallets**.
- Desde **Active wallets**, trazar una flecha que salga del marco hasta el texto:
  **“We collect all token transactions in real time from all active wallets.”**
- Mantener la escena unos seis segundos, con tiempo para leer y sin alterar los contadores.

### 5. Animar la segunda explicación: selección de wallets
- Mostrar la interfaz completa con la lista y sus metadatos.
- Rodear el área completa de la tabla y conectar una flecha exterior al texto:
  **“You can select a period of time and view the wallets with the highest PnL.”**
- Conservar los filtros y el período que aparecen en la referencia; no cambiar ni reordenar los datos. Mantener la explicación unos ocho segundos.

### 6. Animar la tercera explicación: calidad de cada wallet
- Marcar una wallet de la grabación y mantener su identificación mientras se desplaza horizontalmente la tabla.
- Mostrar fuera del marco:
  **“View data to measure the quality of each wallet, such as”**
- Señalar sucesivamente **cada encabezado y el valor correspondiente de esa misma fila**, respetando el orden original. Mostrar el nombre de la métrica junto a la explicación.
- Desplazar la tabla suavemente para descubrir las columnas siguientes, sin sustituir datos ni cambiar la wallet seleccionada. Dar aproximadamente tres segundos a cada métrica.

### 7. Revisar la secuencia sin afectar el resto del landing
- Añadir pausa, reproducción y reinicio discretos para poder revisar y corregir cada escena.
- Iniciar la secuencia cuando el panel sea visible y suspenderla al salir de pantalla o cambiar de pestaña.
- En móvil, colocar las explicaciones debajo del marco, conectadas a los elementos señalados, con una tabla desplazable y texto legible.
- Con movimiento reducido, mostrar una escena estática y permitir avanzar manualmente entre explicaciones.
- Verificar contadores y filas frente a la referencia, orden de anotaciones, seguimiento de la misma wallet y ausencia de textos superpuestos en escritorio y móvil.

## Lo que se conserva
La apertura con el horizonte, el título completo, «Livestream from Solana blockchain», la transición de scroll y el mismo botón inerte que se transforma en el aviso completo. También se conservan las franjas de indicadores y AMMs, la navegación, los formularios y el video de la primera solución.

## Detalles técnicos
- Datos de referencia en un módulo independiente e inmutable; sin consultas de mercado ni actividad de wallets reales.
- Componente de presentación seguro para navegador, separado de la apertura; progresión temporal y selección de columnas en una función probada.
- Anotaciones ancladas a los elementos reales del panel para que los círculos y las flechas acompañen el desplazamiento horizontal.
- Colores internos de la referencia definidos como tokens dedicados; marco y explicaciones con los tokens actuales del landing.
- Pruebas de las etapas y del seguimiento de la wallet, más comprobación de la secuencia completa en el navegador.