# Ejercicios para Usuarios JIRA

---

## Ejercicio Básico 1: Familiarizándose con la Interfaz de JIRA

**Subtítulo:**  
Ejercicio Básico 1

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

## Ejercicio Básico-Intermedio 2: Creación y Gestión de un Issue para Reportar un Bug

**Subtítulo:**  
Ejercicio Básico-Intermedio 2

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

## Ejercicio Intermedio 3: Búsqueda Avanzada de Issues con JQL

**Subtítulo:**  
Ejercicio Intermedio 3

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

## Ejercicio Intermedio-Avanzado 4: Configuración de un Workflow Personalizado para Proceso de Aprobación

**Subtítulo:**  
Ejercicio Intermedio-Avanzado 4

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

## Ejercicio Avanzado 5: Automatización para Gestión Proactiva de Tareas

**Subtítulo:**  
Ejercicio Avanzado 5

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

## Ejercicio Avanzado-Experto 6: Integración Compleja de JIRA con Sistemas Externos Mediante API y Webhooks

**Subtítulo:**  
Ejercicio Avanzado-Experto 6

**Título:**  
Automatización de Flujos de Trabajo en JIRA Integrando CI/CD mediante Webhooks y la API REST – Ejemplo Real en Sandbox sin Costos

**Caso Hipotético:**  
El equipo de DevOps de “Innovatech” utiliza un sistema de CI/CD (por ejemplo, Jenkins) para compilar y probar aplicaciones. Al finalizar una build, se debe notificar a JIRA para actualizar el estado de un issue: en caso de build exitosa, el issue pasa a `En Revisión`, y en caso de fallo, a `Error en Build`. Esta integración se realiza mediante un webhook y un script intermedio que utiliza la API REST de JIRA.

**Objetivos:**  
- Configurar webhooks en una instancia sandbox gratuita de Atlassian Cloud.  
- Desarrollar un script intermedio (por ejemplo, en Python con Flask) que reciba el payload y actúe según el resultado.  
- Invocar la API REST de JIRA para actualizar el estado del issue.  
- Realizar pruebas sin incurrir en costos adicionales.

**Plan de Acción:**  
1. Configurar una instancia sandbox gratuita de Atlassian Cloud y crear un proyecto de prueba.  
2. Configurar un webhook en JIRA que apunte a un endpoint de prueba.  
3. Desarrollar y ejecutar un script en Python (Flask) que reciba el payload y llame a la API REST de JIRA.  
4. Simular el envío de payloads desde el sistema CI/CD (usando herramientas como Postman o cURL).  
5. Verificar la actualización del issue en JIRA y ajustar la integración si es necesario.

**Resolución Paso a Paso:**

1. **Configuración de la Instancia Sandbox:**  
   - Visita [JIRA Software Free](https://www.atlassian.com/software/jira/free) y regístrate para obtener una cuenta gratuita.  
   - Durante el proceso, elige un nombre para la instancia (por ejemplo, `tusandbox.atlassian.net`).  
   - Crea un nuevo proyecto de prueba y anota el **Issue Key** de un issue de ejemplo (por ejemplo, `SANDBOX-1`).

2. **Creación y Configuración del Webhook en JIRA:**  
   - Inicia sesión como administrador y haz clic en el ícono de **Configuración** > **Sistema**.  
   - En el menú lateral, selecciona **Webhooks** y haz clic en **Crear Webhook**.  
   - Asigna el nombre “CI/CD Sandbox Webhook”.  
   - En el campo **URL**, ingresa el endpoint de prueba (por ejemplo, utilizando [Webhook.site](https://webhook.site) o una URL pública obtenida con ngrok).  
   - Selecciona los eventos necesarios o configura el webhook para que reciba llamadas desde el sistema CI/CD.  
   - Guarda el webhook.

3. **Desarrollo del Script Intermedio con Flask:**  
   - Instala Python (3.7 o superior) y ejecuta:
     ```bash
     pip install flask requests
     ```
   - Crea un archivo llamado `app.py` y copia el siguiente código (reemplaza las variables con tus datos):
     ```python
     from flask import Flask, request, jsonify
     import requests

     app = Flask(__name__)

     # Configuración de la instancia JIRA Sandbox
     JIRA_DOMAIN = "tusandbox.atlassian.net"
     JIRA_USER = "tu_email@dominio.com"  # Tu email de Atlassian
     API_TOKEN = "tu_api_token"          # API Token generado en Atlassian

     def transition_issue(issue_key, transition_id):
         url = f"https://{JIRA_DOMAIN}/rest/api/3/issue/{issue_key}/transitions"
         headers = {"Content-Type": "application/json"}
         auth = (JIRA_USER, API_TOKEN)
         payload = {"transition": {"id": transition_id}}
         response = requests.post(url, json=payload, headers=headers, auth=auth)
         return response.status_code, response.json()

     @app.route('/webhook', methods=['POST'])
     def webhook_handler():
         data = request.get_json()
         if not data:
             return jsonify({"error": "No se recibió payload JSON"}), 400

         issue_key = data.get('issue_key')
         build_result = data.get('build_result')

         if not issue_key or not build_result:
             return jsonify({"error": "Faltan campos obligatorios"}), 400

         # Ejemplo de IDs de transición:
         # "31" para "En Revisión" (build exitosa) y "41" para "Error en Build" (build fallida)
         transition_id = "31" if build_result.lower() == "success" else "41"

         status, resp = transition_issue(issue_key, transition_id)
         return jsonify({"status": status, "response": resp})

     if __name__ == '__main__':
         app.run(port=5000, debug=True)
     ```
   - Ejecuta el script:
     ```bash
     python app.py
     ```
   - Si necesitas exponer el servidor local, utiliza ngrok:
     ```bash
     ngrok http 5000
     ```

4. **Simulación del Evento CI/CD:**  
   - Utiliza cURL o Postman para enviar un payload de prueba. Ejemplo con cURL para un build exitoso:
     ```bash
     curl -X POST <TU_ENDPOINT_PUBLICO>/webhook \
     -H "Content-Type: application/json" \
     -d '{"issue_key": "SANDBOX-1", "build_result": "success"}'
     ```
   - Para simular un fallo, cambia `"build_result": "failure"`.

5. **Verificación en JIRA y Ajustes:**  
   - Inicia sesión en tu instancia sandbox y verifica que el issue `SANDBOX-1` haya transitado al estado `En Revisión` (si el build fue exitoso) o a `Error en Build` (si falló).  
   - Revisa los logs del script Flask para asegurarte de que no existan errores y realiza ajustes si es necesario.

---

## Ejercicio Experto 7: Desarrollo y Despliegue de un Plugin Personalizado para JIRA con Atlassian Connect

**Subtítulo:**  
Ejercicio Experto 7

**Título:**  
Creación de un Plugin Personalizado para Extender Funcionalidades de JIRA

**Caso Hipotético:**  
El equipo de innovación de la empresa “TechForward” necesita agregar funcionalidades específicas a JIRA que no están disponibles por defecto. Se requiere desarrollar un plugin personalizado que, por ejemplo, permita visualizar métricas avanzadas de gestión de issues en un panel integrado. La solución se desarrollará utilizando Atlassian Connect en una instancia sandbox sin costos.

**Objetivos:**  
- Comprender el desarrollo de aplicaciones complementarias (add-ons) para JIRA mediante Atlassian Connect.  
- Crear y configurar el archivo de manifiesto (descriptor) del plugin.  
- Desarrollar una aplicación web sencilla (por ejemplo, en Node.js) que se integre en JIRA.  
- Probar y desplegar la aplicación en un entorno sandbox utilizando herramientas gratuitas como ngrok.

**Plan de Acción:**  
1. Crear una cuenta de desarrollador en Atlassian y configurar una instancia sandbox.  
2. Inicializar un proyecto de Atlassian Connect (usando Node.js y Express).  
3. Configurar el descriptor del plugin (`atlassian-connect.json`).  
4. Desarrollar una página web simple que muestre las métricas (puede ser estática o simulada).  
5. Exponer la aplicación mediante ngrok para integrarla en la instancia de JIRA.  
6. Instalar el plugin en JIRA y verificar su funcionamiento.

**Resolución Paso a Paso:**

1. **Registro y Configuración de la Instancia de Desarrollador:**  
   - Regístrate en el [Portal de Desarrolladores de Atlassian](https://developer.atlassian.com).  
   - Obtén acceso a una instancia sandbox gratuita de JIRA si aún no la tienes.

2. **Inicialización del Proyecto con Atlassian Connect Express:**  
   - Instala Node.js (versión 10 o superior).  
   - Instala Atlassian Connect Express (ACE) globalmente:
     ```bash
     npm install -g atlas-connect
     ```
   - Crea un nuevo proyecto:
     ```bash
     atlas-connect new my-jira-plugin
     cd my-jira-plugin
     npm install
     ```

3. **Configuración del Descriptor del Plugin:**  
   - Abre el archivo `atlassian-connect.json` generado.  
   - Actualiza la información básica (nombre, descripción, URL base, etc.).  
   - Define un módulo para el panel de administración o gadget. Por ejemplo:
     ```json
     {
       "modules": {
         "webPanels": [
           {
             "key": "advanced-metrics-panel",
             "url": "/metrics",
             "location": "atl.jira.view.issue.left.context",
             "weight": 100
           }
         ]
       }
     }
     ```
   - Guarda los cambios.

4. **Desarrollo de la Página de Métricas:**  
   - En el directorio del proyecto, crea una ruta en el servidor Express para atender la URL `/metrics`.  
   - En el archivo de rutas (por ejemplo, `routes/index.js`), añade:
     ```javascript
     router.get('/metrics', function(req, res) {
       res.send('<h1>Métricas Avanzadas de JIRA</h1><p>Aquí se mostrarán las estadísticas de gestión de issues.</p>');
     });
     ```
   - Esto simulará el panel de métricas.

5. **Exposición de la Aplicación con ngrok:**  
   - Inicia el servidor:
     ```bash
     npm start
     ```
   - En otra terminal, ejecuta:
     ```bash
     ngrok http 3000
     ```
   - Copia la URL pública que ngrok genera (por ejemplo, `https://abcd1234.ngrok.io`).

6. **Instalación del Plugin en JIRA:**  
   - Modifica el descriptor `atlassian-connect.json` para que la propiedad `baseUrl` apunte a la URL pública de ngrok.  
   - En tu instancia sandbox de JIRA, como administrador, ve a **Manage apps** y selecciona **Upload app**.  
   - Ingresa la URL pública del descriptor (por ejemplo, `https://abcd1234.ngrok.io/atlassian-connect.json`).  
   - JIRA instalará el plugin y el nuevo panel debería aparecer en las páginas de issue (según la configuración del módulo).

7. **Prueba y Verificación:**  
   - Navega a un issue en JIRA y verifica que el panel “Métricas Avanzadas de JIRA” se muestre en la ubicación configurada.  
   - Revisa que el contenido (la página sencilla con las métricas) se cargue correctamente.  
   - Si es necesario, realiza ajustes en el código y reinicia el servidor para validar los cambios.

---
| [Regresar](../README.md) |


### 🙏 ¡Gracias por visitar mi repositorio!

Si quieres invitarme un café por mi trabajo, y asi motivarme a subir más cosas útiles, haz clic en el botón:

<form action="https://www.paypal.com/donate" method="post" target="_blank">
  <!-- Tu hosted_button_id generado en PayPal -->
  <input type="hidden" name="hosted_button_id" value="8CBQUB38L9ESN" />
  
  <!-- Imagen oficial de botón de PayPal Donar -->
  <input type="image" 
         src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" 
         border="0" name="submit" 
         title="PayPal - The safer, easier way to pay online!" 
         alt="Botón Donar con PayPal" />
         
  <!-- Pixel de seguimiento (monitoreo) de PayPal -->
  <img alt="" border="0" 
       src="https://www.paypal.com/es_ES/i/scr/pixel.gif" 
       width="1" height="1" />
</form>


