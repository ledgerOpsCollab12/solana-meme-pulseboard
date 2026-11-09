# Apertura limpia y video más dinámico

## Qué vamos a corregir
Conservar la versión Cristal flotante aprobada: carretera, título inicial, texto promocional en la esquina superior izquierda, video flotante, botón que se transforma, indicadores y protocolos en su orden actual. Rehacer la presentación como una grabación editada, no una interfaz interactiva.

## Lo que comprobé
- El video actual dura **91 segundos** y tiene pausas entre explicaciones de aproximadamente **5, 8 y hasta 10 segundos**. Eso rompe la continuidad, aunque acelerar toda la voz no lo resolvería.
- La transición centrada del título todavía funciona después de cargar la página, pero antes aparece brevemente el contenido de la escena posterior. Hay que corregir ese primer instante, no sustituir la animación aprobada.
- El video tiene proporción **1920 × 1296**, distinta a la ventana donde se muestra. Parte de las franjas negras laterales proviene de ese desajuste.
- El velo se extiende mucho más allá del texto, es más blanco que el fondo y pierde opacidad donde todavía quedan palabras.

## Estrategia

### 1. Corregir la escena sin cambiar su composición
- Desde el primer instante, mostrar solo el título completo centrado. Después desplazarlo a su posición actual mientras aparecen la carretera, el aviso Livestream y el botón; mantener la transición posterior al deslizar.
- Usar detrás del título/subtítulo del producto una superficie **mate del mismo tono del fondo**, opaca bajo todas las palabras y con un desvanecimiento corto únicamente en los bordes derecho e inferior. Reducir también la extensión del desenfoque.
- Mantener una sombra suave y concentrada debajo del video, sin resplandor, para recuperar la sensación flotante.
- Ajustar la ventana a la proporción real de la nueva edición para eliminar franjas negras vacías. Nunca estirar la interfaz ni recortar columnas, navegación o datos útiles.

### 2. Montar primero el ritmo de la narración
- Conservar la voz masculina madura aprobada, menos enfática y ligeramente rápida, pero grabar las explicaciones como una narración conectada: entonación de continuidad, no frases aisladas.
- Mantener todas las ideas y demostraciones aprobadas. Ajustar conectores y redundancias para que el inglés sea conciso, sin cambiar su significado.
- Buscar una duración de **55–65 segundos**, sujeta a que el guion completo se entienda con una lectura natural. No forzar la voz para alcanzar una cifra.
- Reducir las pausas entre ideas a aproximadamente **0,2–0,4 segundos**. Acortar esperas y desplazamientos redundantes de las grabaciones, conservando el orden y los cambios reales de filtros, wallets e historial.
- Hacer que cada texto aparezca al comenzar su frase, permanezca durante la explicación y dé paso al siguiente sin tiempos muertos. No eliminar pausas internas necesarias para entender la voz.

### 3. Dirigir la atención, no acumular anotaciones
- Mantener la secuencia aprobada: cobertura → filtros y calidad → ejemplos y clasificaciones → seguimiento e historial → alertas → invitación final.
- Alternar las explicaciones entre zonas libres superiores, laterales e inferiores según la escena. Elegirlas después de revisar los fotogramas, no colocarlas al azar ni encima de valores importantes.
- Mostrar un foco principal por explicación. Conectar el texto con una flecha corta, de mayor grosor y contraste, con punta claramente visible.
- Hacer los contornos pulsantes más reconocibles, dejando espacio alrededor del dato para no cubrir letras ni números. El pulso no debe convertirse en un brillo agresivo.

### 4. Acercar los datos pequeños y recuperar el contexto
- Cuando se destaque una clasificación, porcentaje o dato de una transacción, hacer un acercamiento breve hacia esa zona, conservando también su encabezado o identificación de wallet.
- Coordinar acercamiento, contorno, flecha y narración; mantener el dato legible durante la frase y volver suavemente al plano general antes de la siguiente demostración.
- Usar el nivel de acercamiento necesario para cada dato, no un zoom idéntico en toda la secuencia. Nunca inventar ni reconstruir información que no aparece en las grabaciones.

### 5. Comprobar antes de reemplazar
- Revisar cada escena por separado: dato señalado correcto, flecha legible, texto sin superposiciones y sincronización con la voz.
- Escuchar la secuencia completa para comprobar que las ideas se conectan y no quedan pausas artificiales.
- Comprobar la apertura desde una carga nueva y el video en escritorio y móvil: sin franjas vacías, texto legible, sombra leve y misma transformación del botón.
- Mantener el cierre difuminado y la iluminación del aviso y del botón **See live movements**, que seguirá sin abrir el programa.
- Conservar la grabación actual como referencia hasta revisar y validar su reemplazo.

## Detalles técnicos
- Resolver el primer fotograma de la apertura con estados iniciales coherentes entre la página renderizada y la animación, manteniendo la alternativa accesible de movimiento reducido.
- Definir velo, bordes y sombra mediante los colores existentes del sitio.
- Editar desde las grabaciones originales, no añadir nuevas anotaciones encima de las anteriores. Exportar WebM y MP4 y actualizar el instante del cierre según el montaje final.
- Probar las reglas de apertura y reproducción y verificar el recorrido completo en el navegador.