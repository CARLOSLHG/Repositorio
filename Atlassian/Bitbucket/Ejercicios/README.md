# Ejercicios para Bitbucket

Este documento contiene 7 ejercicios para Bitbucket. Cada ejercicio sigue la siguiente estructura:

- **Subtítulo**
- **Título**
- **Caso Hipotético**
- **Objetivos**
- **Plan de Acción**
- **Resolución Paso a Paso**

---

## Ejercicio 1: Exploración de la Interfaz de Bitbucket

**Subtítulo:**  
Nivel Básico

**Título:**  
Navegación e Interfaz de Bitbucket

**Caso Hipotético:**  
Juan, un nuevo desarrollador, acaba de recibir acceso a Bitbucket. Su primer reto es explorar la interfaz, identificar dónde se encuentran los repositorios, la barra de navegación, y otros elementos clave para familiarizarse con la plataforma.

**Objetivos:**  
- Familiarizarse con la interfaz y el diseño de Bitbucket.  
- Identificar los elementos principales (dashboard, lista de repositorios, menús de navegación).  
- Comprender la ubicación de las funciones básicas.

**Plan de Acción:**  
1. Iniciar sesión en Bitbucket.  
2. Navegar por el dashboard y revisar la lista de repositorios.  
3. Explorar el menú lateral y superior para identificar funcionalidades (buscar, crear repositorio, configuración, etc.).  
4. Documentar brevemente las secciones principales.

**Resolución Paso a Paso:**

1. **Inicio de Sesión:**  
   - Accede a la URL de Bitbucket (por ejemplo, `https://bitbucket.org`) e inicia sesión con tus credenciales.

2. **Exploración del Dashboard:**  
   - Observa la página principal (dashboard) donde se listan los repositorios recientes y notificaciones.  
   - Identifica secciones como "Repositorios", "Proyectos" y "Notificaciones".

3. **Navegación por Menús:**  
   - Revisa el menú lateral y superior para identificar opciones como "Crear repositorio", "Buscar" y "Configuración de cuenta".  
   - Toma nota de la ubicación de cada función para un uso futuro.

4. **Documentación:**  
   - Anota en un documento o en una nota digital las secciones identificadas y sus respectivas funciones.

---

## Ejercicio 2: Creación y Configuración de un Repositorio

**Subtítulo:**  
Nivel Básico-Intermedio

**Título:**  
Creación y Configuración Inicial de un Repositorio en Bitbucket

**Caso Hipotético:**  
María debe iniciar un nuevo proyecto y, para ello, crear un repositorio en Bitbucket. Necesita configurar la visibilidad (público o privado), añadir una descripción y establecer algunas opciones básicas.

**Objetivos:**  
- Aprender a crear un repositorio nuevo.  
- Configurar parámetros básicos como nombre, descripción y visibilidad.  
- Familiarizarse con las opciones de configuración inicial.

**Plan de Acción:**  
1. Iniciar sesión en Bitbucket y acceder a la opción "Crear repositorio".  
2. Introducir el nombre, descripción y seleccionar la visibilidad deseada.  
3. Configurar opciones adicionales como lenguaje predeterminado y plantillas.  
4. Crear el repositorio y verificar su aparición en el dashboard.

**Resolución Paso a Paso:**

1. **Acceso y Creación:**  
   - Inicia sesión y haz clic en el botón **Crear repositorio** o usa el menú desplegable en el dashboard.

2. **Configuración del Repositorio:**  
   - Ingresa el nombre del repositorio (por ejemplo, `proyecto-nuevo`).  
   - Escribe una breve descripción del proyecto.  
   - Selecciona si el repositorio será **Público** o **Privado** según las necesidades del equipo.

3. **Opciones Adicionales:**  
   - Selecciona el lenguaje o configuración inicial (por ejemplo, Git o Mercurial, según la opción disponible).  
   - Revisa las opciones adicionales y marca aquellas que sean relevantes.

4. **Finalización y Verificación:**  
   - Haz clic en **Crear** y luego revisa el dashboard para confirmar que el nuevo repositorio aparece en la lista.

---

## Ejercicio 3: Gestión de Ramas y Pull Requests

**Subtítulo:**  
Nivel Intermedio

**Título:**  
Creación y Gestión de Ramas y Pull Requests

**Caso Hipotético:**  
Carlos está trabajando en una nueva funcionalidad para un proyecto. Debe crear una rama para desarrollar la funcionalidad, realizar algunos commits y, una vez terminado, generar un Pull Request para que sus compañeros revisen y aprueben los cambios.

**Objetivos:**  
- Aprender a crear y gestionar ramas en Bitbucket.  
- Realizar commits en una rama específica.  
- Crear un Pull Request y gestionar el proceso de revisión.

**Plan de Acción:**  
1. Crear una rama nueva a partir de la rama principal (por ejemplo, `master` o `main`).  
2. Realizar cambios en el código y hacer commits en la nueva rama.  
3. Abrir un Pull Request para fusionar los cambios en la rama principal.  
4. Revisar y gestionar comentarios o aprobaciones en el Pull Request.

**Resolución Paso a Paso:**

1. **Creación de la Rama:**  
   - Desde el repositorio, selecciona la opción para crear una nueva rama.  
   - Asigna un nombre descriptivo a la rama (por ejemplo, `feature/nueva-funcionalidad`).

2. **Realización de Commits:**  
   - Clona el repositorio o usa la interfaz web para editar archivos en la nueva rama.  
   - Realiza cambios y haz commits con mensajes claros que describan las modificaciones.

3. **Creación del Pull Request:**  
   - Una vez completados los cambios, dirígete a la sección de Pull Requests.  
   - Haz clic en **Crear Pull Request**, selecciona la rama de origen y la rama destino.  
   - Añade una descripción detallada y solicita revisiones a los compañeros de equipo.

4. **Gestión del Pull Request:**  
   - Revisa comentarios y realiza ajustes en el código si es necesario.  
   - Una vez aprobados los cambios, fusiona el Pull Request en la rama principal.

---

## Ejercicio 4: Configuración de Bitbucket Pipelines

**Subtítulo:**  
Nivel Intermedio-Avanzado

**Título:**  
Implementación de Bitbucket Pipelines para Integración Continua

**Caso Hipotético:**  
El equipo de DevOps requiere automatizar la ejecución de pruebas y despliegues cada vez que se realizan cambios en el código. Para ello, se debe configurar Bitbucket Pipelines, creando un archivo de configuración y probando su funcionamiento en un repositorio de prueba.

**Objetivos:**  
- Comprender la función de Bitbucket Pipelines para CI/CD.  
- Crear y configurar el archivo `bitbucket-pipelines.yml`.  
- Ejecutar una build y verificar los resultados.

**Plan de Acción:**  
1. Iniciar sesión en Bitbucket y seleccionar el repositorio de prueba.  
2. Crear un archivo `bitbucket-pipelines.yml` en la raíz del repositorio.  
3. Definir en el archivo los pasos para ejecutar pruebas o builds.  
4. Realizar un commit para activar la pipeline.  
5. Verificar el estado de la pipeline en la interfaz de Bitbucket.

**Resolución Paso a Paso:**

1. **Acceso y Selección del Repositorio:**  
   - Inicia sesión y navega hasta el repositorio en el que se implementará la pipeline.

2. **Creación del Archivo de Configuración:**  
   - En la raíz del repositorio, crea un archivo llamado `bitbucket-pipelines.yml`.
   - Escribe una configuración básica, por ejemplo:
     ```yaml
     pipelines:
       default:
         - step:
             name: "Ejecutar Pruebas"
             image: node:14
             script:
               - npm install
               - npm test
     ```

3. **Commit y Activación:**  
   - Realiza un commit y push del archivo a la rama principal.
   - Observa en la sección de Pipelines que la ejecución se inicie.

4. **Verificación:**  
   - Revisa los logs de la ejecución para confirmar que los comandos se ejecutaron correctamente.  
   - Ajusta la configuración si se presentan errores.

---

## Ejercicio 5: Automatización y Uso de Webhooks en Bitbucket

**Subtítulo:**  
Nivel Avanzado

**Título:**  
Configuración de Webhooks para Automatización Externa

**Caso Hipotético:**  
El administrador del repositorio necesita configurar un webhook que notifique a un sistema de integración externa cada vez que se realiza un push. Esto permitirá disparar acciones automáticas (por ejemplo, despliegues o pruebas adicionales).

**Objetivos:**  
- Configurar un webhook en un repositorio de Bitbucket.  
- Establecer el endpoint al que se enviarán las notificaciones.  
- Verificar la recepción del webhook en el sistema externo.

**Plan de Acción:**  
1. Acceder a la configuración del repositorio y dirigirse a la sección de Webhooks.  
2. Crear un nuevo webhook especificando la URL del endpoint externo.  
3. Seleccionar los eventos que activarán el webhook (por ejemplo, push events).  
4. Guardar la configuración y probar el webhook enviando un push de prueba.  
5. Verificar que el endpoint reciba y procese la información correctamente.

**Resolución Paso a Paso:**

1. **Acceso a la Configuración del Repositorio:**  
   - Inicia sesión en Bitbucket y abre el repositorio en el que se configurará el webhook.

2. **Creación del Webhook:**  
   - Ve a **Settings** > **Webhooks** y haz clic en **Add webhook**.  
   - Introduce un nombre descriptivo y la URL del endpoint (por ejemplo, un servicio de prueba como [Webhook.site](https://webhook.site)).

3. **Selección de Eventos:**  
   - Selecciona el evento **Push** (y otros que sean necesarios).

4. **Prueba y Verificación:**  
   - Realiza un push de prueba al repositorio.  
   - Verifica en el endpoint que se haya recibido el payload del webhook.

---

## Ejercicio 6: Integración de Bitbucket con Jira

**Subtítulo:**  
Nivel Avanzado-Experto

**Título:**  
Vinculación de Commits y Pull Requests con Issues en Jira

**Caso Hipotético:**  
El equipo de desarrollo necesita que cada commit y Pull Request en Bitbucket se vincule automáticamente con los issues correspondientes en Jira. Esto permitirá un seguimiento integrado del progreso del proyecto.

**Objetivos:**  
- Configurar la integración entre Bitbucket y Jira.  
- Utilizar "smart commits" para asociar cambios de código con issues.  
- Verificar que los commits y Pull Requests aparezcan vinculados en Jira.

**Plan de Acción:**  
1. Asegurarse de que Bitbucket y Jira estén conectados mediante la integración de Atlassian.  
2. Configurar la vinculación de issues mediante smart commits (por ejemplo, usando claves de issue en los mensajes de commit).  
3. Realizar un commit de prueba incluyendo la clave del issue (ej. `PROJ-123 #comment Implementada nueva función #time 2h`).  
4. Crear un Pull Request que mencione el issue asociado.  
5. Verificar en Jira que los cambios se reflejen correctamente en el issue.

**Resolución Paso a Paso:**

1. **Verificación de la Integración:**  
   - Confirma que la integración entre Bitbucket y Jira esté habilitada en la configuración global de Atlassian.

2. **Uso de Smart Commits:**  
   - Realiza un commit en una rama incluyendo la clave del issue y un comentario en el mensaje.

3. **Creación del Pull Request:**  
   - Abre un Pull Request que incluya en la descripción la referencia al issue.

4. **Verificación en Jira:**  
   - Accede a Jira y comprueba que el issue referenciado muestre los commits y el Pull Request vinculado.

---

## Ejercicio 7: Configuración Avanzada y Seguridad en Bitbucket

**Subtítulo:**  
Nivel Experto

**Título:**  
Implementación de Configuraciones Avanzadas y Medidas de Seguridad

**Caso Hipotético:**  
El administrador de Bitbucket debe asegurar la integridad y seguridad de los repositorios. Esto incluye configurar permisos avanzados, protección de ramas, autenticación de dos factores (2FA) y auditoría de actividades.

**Objetivos:**  
- Configurar reglas de permisos y protección de ramas a nivel de repositorio.  
- Implementar medidas de seguridad avanzadas, como 2FA y limitación de accesos por IP.  
- Revisar y auditar la actividad en los repositorios para detectar accesos no autorizados.

**Plan de Acción:**  
1. Acceder a la configuración de seguridad de la instancia de Bitbucket.  
2. Configurar permisos avanzados para repositorios y protección de ramas (branch permissions).  
3. Habilitar la autenticación de dos factores (2FA) para todos los usuarios.  
4. Establecer reglas de acceso basadas en IP o grupos de usuarios.  
5. Revisar los logs y auditorías para confirmar la correcta aplicación de las políticas de seguridad.

**Resolución Paso a Paso:**

1. **Configuración de Permisos y Protección de Ramas:**  
   - En el repositorio, accede a **Settings** > **Branch permissions**.  
   - Define reglas para evitar que ramas críticas (por ejemplo, `master` o `main`) sean modificadas sin revisión.

2. **Habilitación de 2FA:**  
   - Dirígete a la configuración de seguridad de la cuenta y activa la autenticación de dos factores para aumentar la protección.

3. **Restricción de Accesos:**  
   - Configura reglas de acceso, por ejemplo, limitando el acceso a ciertos rangos de IP o mediante la integración con proveedores de identidad.

4. **Auditoría y Monitoreo:**  
   - Revisa la sección de logs y auditorías de Bitbucket para monitorear actividades inusuales.  
   - Realiza pruebas para asegurarte de que los accesos se limiten según la configuración.

5. **Verificación Final:**  
   - Confirma que las medidas de seguridad estén funcionando correctamente realizando pruebas de acceso y revisando la documentación de auditoría.

---

[Regresar el Menú del Repositorio](../README.md)

---

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