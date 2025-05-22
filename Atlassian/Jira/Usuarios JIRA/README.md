# Ejercicios para Usuarios JIRA

---

## Ejercicio 1: Familiarizándose con la Interfaz de JIRA

**Nivel:**  
Básico

**Título:**  
Exploración Inicial y Navegación en la Interfaz de JIRA

**Caso Hipotético:**  
María acaba de unirse al equipo y recibe acceso a JIRA. Su primer reto es conocer la plataforma, identificar los menús, botones y secciones principales para comenzar a trabajar en sus tareas.

**Objetivos:**  
- Conocer la estructura y diseño de la interfaz de JIRA.  
- Identificar los elementos clave: menú lateral, barra superior, proyectos, tableros y lista de issues.  
- Familiarizarse con la ubicación de funciones esenciales.

**Plan de Acción:**  
1. Iniciar sesión en la instancia de JIRA.  
2. Explorar la interfaz principal y reconocer los componentes visuales.  
3. Acceder a un proyecto asignado y revisar sus secciones internas.  
4. Documentar (en papel o digitalmente) las funcionalidades encontradas.

**Resolución Paso a Paso:**

1. **Inicio de Sesión y Acceso:**  
   - Abre tu navegador y navega a la URL de tu instancia de JIRA.  
   - Introduce tus credenciales y haz clic en “Iniciar Sesión”.  
   - Verifica que la pantalla principal cargue correctamente.

2. **Exploración de la Interfaz Principal:**  
   - Observa la **barra superior**: notarás elementos como el buscador global, notificaciones y el acceso a tu perfil.  
   - Revisa el **menú lateral izquierdo**: aquí encontrarás enlaces a “Proyectos”, “Issues”, “Tableros”, “Reportes” y otras herramientas de navegación.

3. **Acceso y Exploración de un Proyecto:**  
   - En el menú lateral, haz clic en “Proyectos” y selecciona uno de los proyectos a los que tienes acceso.  
   - Dentro del proyecto, identifica secciones como el **Tablero (Board)**, el **Backlog** y la lista de **Issues**.  
   - Haz clic en cada sección y observa los detalles que muestra (estado, asignado, fechas, etc.).

4. **Documentación y Reflexión:**  
   - Toma nota (en una diapositiva o documento) de la función de cada área:  
     - **Menú Lateral:** Acceso rápido a funcionalidades y secciones.  
     - **Barra Superior:** Herramientas de búsqueda, notificaciones y ajustes del usuario.  
     - **Tablero/Backlog:** Vista visual de tareas en curso y pendientes.  
   - Reflexiona sobre cómo cada componente puede ayudarte en tu día a día en el equipo.

---

## Ejercicio 2: Creación y Gestión de un Issue para Reportar un Bug

**Nivel:**  
Intermdio

**Título:**  
Registro Detallado de un Bug en JIRA

**Caso Hipotético:**  
Carlos, miembro del equipo de soporte, recibe un reporte de error en la funcionalidad de login. Debe crear un issue en JIRA para documentar el bug, asignarlo a un desarrollador y adjuntar evidencias (capturas de pantalla).

**Objetivos:**  
- Aprender a crear un issue correctamente.  
- Completar campos esenciales: título, descripción, prioridad, etiquetas y asignación.  
- Adjuntar archivos que respalden el reporte.

**Plan de Acción:**  
1. Iniciar sesión y dirigirse a la opción “Crear Issue”.  
2. Seleccionar el tipo “Bug”.  
3. Rellenar los campos obligatorios y adjuntar archivos.  
4. Asignar el issue al desarrollador encargado y guardar la tarea.  
5. Verificar en el tablero que el issue se haya creado correctamente.

**Resolución Paso a Paso:**

1. **Acceso a JIRA y Apertura del Formulario:**  
   - Inicia sesión en JIRA.  
   - Haz clic en el botón “Crear” ubicado en la barra superior.

2. **Selección del Tipo de Issue:**  
   - En la ventana emergente, elige **Bug** como tipo de issue, ya que se trata de un error.

3. **Completar Información del Issue:**  
   - **Título:** Escribe un título descriptivo, por ejemplo, “Error en la Funcionalidad de Login – Validación Incorrecta”.  
   - **Descripción:** Detalla el error, incluyendo pasos para replicarlo.  
     > *Ejemplo:* "Al ingresar credenciales válidas, la aplicación muestra un error de validación. Adjuntar captura de pantalla."  
   - **Prioridad y Etiquetas:** Selecciona una prioridad adecuada (por ejemplo, Alta) y añade etiquetas como `bug` y `login`.  
   - **Adjuntar Evidencias:** Utiliza la opción “Adjuntar archivo” para subir capturas de pantalla o logs.

4. **Asignación y Creación del Issue:**  
   - En el campo “Asignado a”, selecciona el desarrollador encargado o déjalo sin asignar si se asignará posteriormente.  
   - Revisa toda la información y haz clic en “Crear” para guardar el issue.

5. **Verificación en el Tablero:**  
   - Accede a la lista de “Issues” o al tablero del proyecto.  
   - Confirma que el nuevo issue aparece con el estado inicial y la información correcta.

---

## Ejercicio 3: Búsqueda Avanzada de Issues con JQL

**Nivel:**  
Intermedio

**Título:**  
Generación de Reporte Personalizado Utilizando JQL en JIRA

**Caso Hipotético:**  
Sofía, gerente de proyecto, necesita obtener un informe de todos los issues del proyecto "Alpha" que estén en estados “To Do”, “In Progress” o “Done” y que se hayan actualizado en los últimos 7 días para analizar el progreso del equipo.

**Objetivos:**  
- Dominar la búsqueda avanzada con JQL.  
- Construir una consulta que combine filtros por proyecto, estado y fecha de actualización.  
- Guardar y compartir el filtro generado.

**Plan de Acción:**  
1. Acceder a la opción de búsqueda avanzada en JIRA.  
2. Cambiar de la vista básica a la vista JQL.  
3. Construir y ejecutar la consulta JQL.  
4. Revisar y guardar el filtro para usos futuros.

**Resolución Paso a Paso:**

1. **Acceso a la Sección de Búsqueda de Issues:**  
   - Inicia sesión en JIRA y haz clic en **Issues** en la barra superior.  
   - Se mostrará la lista de incidencias asignadas a tu usuario.

2. **Cambio a la Vista JQL:**  
   - Ubica el botón **Búsqueda Avanzada** o **Switch to JQL** en la parte superior derecha de la pantalla de búsqueda.  
   - Haz clic para cambiar al modo de consulta JQL.

3. **Construcción de la Consulta JQL:**  
   - Escribe la siguiente consulta:
     ```jql
     project = "Alpha" AND status in ("To Do", "In Progress", "Done") AND updated >= -7d
     ```
   - Esta consulta filtra los issues del proyecto "Alpha" que estén en los estados indicados y que se hayan actualizado en la última semana.

4. **Ejecución y Revisión:**  
   - Presiona **Enter** o haz clic en **Buscar**.  
   - Revisa la lista de resultados para confirmar que solo se muestran los issues deseados.

5. **Guardado y Compartición del Filtro:**  
   - Una vez verificada la consulta, haz clic en **Guardar Filtro**.  
   - Asigna un nombre descriptivo, por ejemplo, “Reporte Semanal Proyecto Alpha”.  
   - Utiliza la opción de compartir para que otros miembros del equipo puedan acceder al filtro.

---

## Ejercicio 4: Configuración de un Workflow Personalizado para Proceso de Aprobación

**Nivel:**  
Avanzado

**Título:**  
Diseño y Configuración de un Workflow con Estado de Aprobación

**Caso Hipotético:**  
Luis, responsable del área de proyectos, ha detectado que para tareas críticas se necesita un proceso de aprobación intermedio. Se requiere modificar el flujo de trabajo para que, antes de cerrar una tarea, pase por un estado **Aprobación**, en el que solo usuarios autorizados puedan validar el avance.

**Objetivos:**  
- Clonar y modificar un workflow existente en JIRA.  
- Añadir el estado **Aprobación** y definir transiciones específicas.  
- Configurar condiciones para que solo ciertos roles puedan aprobar.

**Plan de Acción:**  
1. Acceder a la configuración de Workflows en JIRA.  
2. Clonar el workflow actual.  
3. Editar el workflow clonado para agregar el estado **Aprobación**.  
4. Crear transiciones de `En Progreso` a `Aprobación` y de `Aprobación` a `Terminado`.  
5. Configurar condiciones y validaciones para cada transición.  
6. Publicar el nuevo workflow y asignarlo al proyecto.

**Resolución Paso a Paso:**

1. **Acceso a la Administración de Workflows:**  
   - Inicia sesión con un usuario administrador.  
   - Haz clic en el ícono de **Configuración** (engranaje) y selecciona **Issues**.  
   - En el menú lateral, haz clic en **Workflows** para ver el listado de flujos de trabajo.

2. **Clonación del Workflow Actual:**  
   - Ubica el workflow asignado al proyecto y haz clic en **Clonar** o **Copy**.  
   - Asigna un nombre descriptivo al nuevo workflow, por ejemplo, `Workflow Aprobación Tareas Críticas`.

3. **Edición del Workflow Clonado:**  
   - Haz clic en **Editar** para abrir el editor visual del workflow.  
   - Identifica el estado que precede al cierre de la tarea (por ejemplo, `En Progreso`).

4. **Agregar el Estado “Aprobación”:**  
   - Utiliza la opción **Agregar Estado** para incluir un nuevo estado llamado `Aprobación`.  
   - Coloca este estado en la secuencia lógica entre `En Progreso` y `Terminado`.

5. **Definir Transiciones y Condiciones:**  
   - **Transición 1:** De `En Progreso` a `Aprobación`  
     - Crea una transición denominada **Enviar para Aprobación**.  
   - **Transición 2:** De `Aprobación` a `Terminado`  
     - Crea una transición denominada **Aprobar**.  
     - Configura una condición que permita ejecutar esta transición solo a usuarios con el rol `Aprobador`.  
   - *(Opcional)* Configura una transición de `Aprobación` de vuelta a `En Progreso` para casos de rechazo.

6. **Guardar, Publicar y Asignar el Workflow:**  
   - Revisa todos los cambios y haz clic en **Guardar**.  
   - Publica el workflow para que los cambios sean efectivos.  
   - Accede a la configuración del proyecto y asigna el nuevo workflow a los tipos de issue correspondientes.

7. **Prueba del Nuevo Flujo:**  
   - Crea un issue de prueba y simula el recorrido: de `En Progreso` a `Aprobación` y luego a `Terminado`.  
   - Verifica que las condiciones (por ejemplo, la restricción de rol) funcionen correctamente.

---

## Ejercicio 5: Automatización para Gestión Proactiva de Tareas

**Nivel:**  
Experto

**Título:**  
Implementación de Reglas de Automatización para Tareas Inactivas

**Caso Hipotético:**  
El equipo de desarrollo ha notado que algunas tareas permanecen sin actualizar durante días, lo que genera cuellos de botella. Se requiere configurar una regla de automatización en JIRA que, diariamente, identifique issues sin actividad, notifique a los responsables y, si la inactividad se prolonga, escale el asunto a un supervisor.

**Objetivos:**  
- Crear reglas de automatización en JIRA con disparadores programados.  
- Definir condiciones basadas en la fecha de actualización de los issues.  
- Configurar acciones de notificación y escalación de tareas.

**Plan de Acción:**  
1. Acceder a la sección de **Automatización** en el proyecto.  
2. Crear una nueva regla con un disparador **Scheduled**.  
3. Configurar condiciones que identifiquen issues en estados `Abierto` o `En Progreso` sin actualización en 3 días.  
4. Establecer una acción para notificar al responsable y, si la inactividad es mayor (por ejemplo, 5 días), escalar a un supervisor.  
5. Guardar, activar y probar la regla.

**Resolución Paso a Paso:**

1. **Acceso a la Sección de Automatización:**  
   - Inicia sesión en JIRA con un usuario con permisos de administrador en el proyecto.  
   - Dirígete a **Project Settings** y selecciona **Automation**.

2. **Creación de la Regla de Automatización:**  
   - Haz clic en **Create Rule**.  
   - Selecciona el disparador **Scheduled** y configura la regla para que se ejecute, por ejemplo, cada día a las 08:00 AM.

3. **Configuración de Condiciones para Detectar Inactividad:**  
   - Agrega una condición **Issue Fields Condition** para filtrar issues en estados `Abierto` o `En Progreso`.  
   - Añade una condición **Date Compare** para identificar issues cuya última actualización sea anterior a `-3d` (3 días atrás).

4. **Acción de Notificación:**  
   - Agrega una acción **Send Email** o **Notify User**.  
   - Configura el mensaje para que incluya detalles del issue, un enlace y un recordatorio para actualizarlo.

5. **Configuración de Escalación (Rama Condicional):**  
   - Añade una condición adicional que verifique si el issue no se ha actualizado en `-5d`.  
   - En caso afirmativo, configura una acción adicional para notificar al supervisor o al equipo de gestión.

6. **Guardar, Activar y Probar la Regla:**  
   - Revisa la configuración de la regla y haz clic en **Guardar**.  
   - Activa la regla y realiza pruebas (puedes actualizar manualmente algunos issues para simular la inactividad).  
   - Revisa los logs de ejecución para confirmar el funcionamiento correcto.

---

## Ejercicio 6: Creación y Optimización de Dashboards Personalizados

**Nivel:**  
Avanzado

**Título:**  
Creación y Optimización de Dashboards Personalizados con Filtros Avanzados

**Caso Hipotético:**  
El gerente de proyecto, Sofía, necesita un dashboard personalizado que muestre un resumen en tiempo real de las incidencias del proyecto. Ella requiere usar filtros avanzados (mediante JQL) para filtrar issues por estado, prioridad y fecha de actualización, y añadir gadgets que presenten gráficos y listas de tareas asignadas. Este dashboard le permitirá monitorear de manera eficiente el progreso del equipo.

**Objetivos:**  
- Dominar la creación de filtros avanzados con JQL.  
- Configurar un dashboard personalizado que incluya gadgets relevantes.  
- Compartir el dashboard con el equipo para mejorar la colaboración y el seguimiento de incidencias.

**Plan de Acción:**  
1. Crear un filtro avanzado utilizando JQL que seleccione incidencias clave.  
2. Guardar el filtro y usarlo como fuente para un gadget.  
3. Crear un dashboard personalizado y añadir gadgets que muestren datos (gráficos, listas de issues, etc.).  
4. Ajustar los parámetros y la disposición de los gadgets para maximizar la claridad de la información.  
5. Compartir el dashboard con el equipo y solicitar feedback para futuras mejoras.

**Resolución Paso a Paso:**

1. **Creación del Filtro Avanzado:**  
   - Inicia sesión en JIRA y accede a la sección de búsqueda de issues.  
   - Cambia a la vista JQL y escribe una consulta avanzada, por ejemplo:
     ```jql
     project = "Innovatech" AND status in ("To Do", "In Progress", "Blocked") AND priority = High AND updated >= -3d
     ```
   - Ejecuta la consulta y, si los resultados son los esperados, guarda el filtro con un nombre descriptivo (por ejemplo, "Incidencias Críticas Recientes").

2. **Creación del Dashboard:**  
   - Navega a la sección **Dashboards** y selecciona **Crear Dashboard**.  
   - Asigna un nombre al dashboard (por ejemplo, "Monitoreo Proyecto Innovatech") y define los permisos de visualización.

3. **Añadir Gadgets al Dashboard:**  
   - Haz clic en **Añadir Gadget**.  
   - Selecciona gadgets como "Filter Results", "Pie Chart" y "Two Dimensional Filter Statistics".  
   - Configura cada gadget seleccionando el filtro previamente guardado y ajustando los parámetros (por ejemplo, campo de agrupación, número de resultados).

4. **Optimización y Personalización:**  
   - Ajusta el diseño del dashboard para que los gadgets se dispongan de manera clara y ordenada.  
   - Prueba diferentes configuraciones hasta que la visualización sea óptima.

5. **Compartir y Revisar:**  
   - Utiliza la opción de **Compartir Dashboard** para dar acceso al equipo.  
   - Solicita feedback a los compañeros y realiza ajustes según sea necesario.

---

## Ejercicio 7: Configuración de Suscripciones y Notificaciones Avanzadas

**Nivel:**  
Experto

**Título:**  
Implementación de Suscripciones y Notificaciones Personalizadas para Incidencias Críticas

**Caso Hipotético:**  
Luis, un analista de soporte en JIRA, necesita estar al tanto de cualquier cambio en incidencias críticas del proyecto. Para ello, debe configurar una suscripción a un filtro avanzado que le envíe notificaciones automáticas cada vez que se actualice una incidencia con prioridad alta y sin actividad reciente. Esto le permitirá responder rápidamente a situaciones urgentes.

**Objetivos:**  
- Configurar un filtro avanzado con JQL que identifique incidencias críticas.  
- Crear una suscripción para recibir notificaciones automáticas por correo electrónico basadas en ese filtro.  
- Personalizar el contenido de las notificaciones para que incluyan información clave de la incidencia.

**Plan de Acción:**  
1. Crear y guardar un filtro avanzado que identifique incidencias críticas (por ejemplo, de alta prioridad y sin actualización en 2 días).  
2. Configurar la suscripción al filtro para que se envíe un correo electrónico con los resultados del filtro en intervalos definidos.  
3. Personalizar el mensaje de notificación, si la plataforma lo permite, para resaltar los detalles críticos.  
4. Realizar una prueba para confirmar que se reciben las notificaciones correctamente.  
5. Ajustar la configuración según el feedback recibido y las necesidades del equipo.

**Resolución Paso a Paso:**

1. **Creación del Filtro Avanzado:**  
   - Inicia sesión en JIRA y dirígete a la sección de búsqueda avanzada.  
   - Cambia a la vista JQL y escribe una consulta similar a:
     ```jql
     project = "Innovatech" AND priority = High AND updated <= -2d
     ```
   - Ejecuta la consulta y, una vez que los resultados sean correctos, guarda el filtro con un nombre identificativo (por ejemplo, "Incidencias Críticas Sin Actualización").

2. **Configuración de la Suscripción:**  
   - Accede al filtro guardado y selecciona la opción **Suscribirse**.  
   - Configura la frecuencia de la suscripción (por ejemplo, diaria o cada pocas horas) y asegúrate de que el correo electrónico asociado sea correcto.

3. **Personalización de Notificaciones:**  
   - Revisa las opciones de personalización disponibles para el correo (si aplica) y configura un asunto y mensaje que resuman la situación (por ejemplo, "Alerta: Incidencias Críticas Pendientes de Actualización").
   - Incluye detalles relevantes como la cantidad de incidencias y enlaces directos al filtro.

4. **Prueba y Validación:**  
   - Realiza una prueba modificando temporalmente una incidencia para activar la condición del filtro.  
   - Confirma que se recibe el correo de notificación y que la información incluida es precisa.

5. **Ajustes Finales:**  
   - Si es necesario, ajusta la consulta, la frecuencia o la personalización del correo.  
   - Comunica a los miembros del equipo el funcionamiento de la suscripción para que puedan aprovechar la herramienta.

---

## Fe Errata

debido a que la plataforma de Atlassian cambia constantemente, algunos menus y accesos podrian estar cambiados.

---

| [Regresar](../README.md) |


### 🙏 ¡Gracias por visitar mi repositorio!



