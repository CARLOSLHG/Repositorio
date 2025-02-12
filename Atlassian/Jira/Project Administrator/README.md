# Ejercicios para Administradores de Proyectos en JIRA

Este documento contiene 5 ejercicios diseñados específicamente para administradores de proyectos en JIRA. Cada ejercicio sigue la siguiente estructura:

- **Subtítulo**
- **Título**
- **Caso Hipotético**
- **Objetivos**
- **Plan de Acción**
- **Resolución Paso a Paso**

---

## Ejercicio 1: Creación y Configuración Inicial de un Proyecto en JIRA

**Subtítulo:**  
Ejercicio Básico 1 para Administradores de Proyectos

**Título:**  
Creación y Configuración Inicial de un Proyecto

**Caso Hipotético:**  
Laura, administradora de proyectos, ha recibido la tarea de crear un nuevo proyecto para un cliente importante. Debe configurar el proyecto desde cero, estableciendo los parámetros básicos y personalizando algunos aspectos esenciales como el tipo de proyecto, esquemas de incidencias y permisos iniciales.

**Objetivos:**  
- Crear un nuevo proyecto en JIRA desde la interfaz de administración.  
- Configurar los parámetros básicos, tales como el tipo de proyecto (Scrum, Kanban u otro), los tipos de issue y el esquema de permisos inicial.  
- Familiarizarse con la interfaz de administración de proyectos.

**Plan de Acción:**  
1. Iniciar sesión en JIRA como administrador global.  
2. Acceder a la sección de administración de proyectos.  
3. Crear un nuevo proyecto y elegir el tipo adecuado.  
4. Configurar los parámetros básicos: tipos de issues, esquema de permisos y notificaciones.  
5. Guardar y verificar la configuración inicial del proyecto.

**Resolución Paso a Paso:**

1. **Inicio de Sesión y Acceso a Administración:**  
   - Inicia sesión en JIRA con una cuenta de administrador.  
   - Haz clic en el ícono de **Configuración** (engranaje) y selecciona **Proyectos**.

2. **Creación del Nuevo Proyecto:**  
   - Haz clic en **Crear Proyecto**.  
   - Selecciona la plantilla adecuada (por ejemplo, Scrum o Kanban) según las necesidades del cliente.  
   - Asigna un nombre y una clave para el proyecto.

3. **Configuración de Parámetros Básicos:**  
   - Selecciona los **Tipos de Issue** que se utilizarán en el proyecto (Bug, Tarea, Historia, etc.).  
   - Configura el **Esquema de Permisos** para definir quién podrá ver, editar o administrar el proyecto.  
   - Establece las notificaciones básicas para informar a los usuarios sobre cambios importantes.

4. **Revisión y Guardado:**  
   - Revisa todos los parámetros configurados en el resumen del proyecto.  
   - Haz clic en **Crear** para finalizar la creación del proyecto.  
   - Verifica en la lista de proyectos que el nuevo proyecto se haya creado correctamente.

---

## Ejercicio 2: Gestión de Usuarios y Roles en un Proyecto

**Subtítulo:**  
Ejercicio Básico-Intermedio 2 para Administradores de Proyectos

**Título:**  
Gestión de Usuarios y Asignación de Roles

**Caso Hipotético:**  
Carlos, administrador de proyectos, debe configurar el acceso a un proyecto asignado. Su tarea es agregar nuevos usuarios, crear grupos y asignarles roles específicos para garantizar que solo el personal autorizado pueda modificar ciertos elementos del proyecto.

**Objetivos:**  
- Aprender a agregar y gestionar usuarios en un proyecto.  
- Configurar grupos y asignar roles específicos (por ejemplo, Desarrollador, Probador, Líder de Proyecto).  
- Verificar que la asignación de permisos permita el acceso correcto a las funcionalidades del proyecto.

**Plan de Acción:**  
1. Iniciar sesión en JIRA con permisos de administrador.  
2. Acceder a la sección de **Administración de Usuarios y Grupos**.  
3. Agregar nuevos usuarios y organizarlos en grupos.  
4. Asignar roles específicos a los grupos o usuarios dentro del proyecto.  
5. Revisar y confirmar los cambios realizados.

**Resolución Paso a Paso:**

1. **Acceso a la Administración de Usuarios:**  
   - Inicia sesión en JIRA como administrador global.  
   - Ve a **Configuración** > **Usuarios y Grupos**.

2. **Agregar y Organizar Usuarios:**  
   - Haz clic en **Agregar Usuario** para invitar a nuevos miembros al proyecto.  
   - Completa la información necesaria (correo electrónico, nombre, etc.).  
   - Organiza los usuarios en grupos predefinidos (por ejemplo, "Equipo de Desarrollo", "QA", "Gestión").

3. **Asignación de Roles:**  
   - Accede a la configuración del proyecto y selecciona **Roles del Proyecto**.  
   - Asigna a cada grupo o usuario el rol correspondiente (por ejemplo, asigna el grupo “Equipo de Desarrollo” al rol de **Desarrollador** y el grupo “Gestión” al rol de **Líder de Proyecto**).

4. **Verificación:**  
   - Revisa la sección de **Permisos del Proyecto** para confirmar que cada usuario o grupo tenga los accesos correspondientes.  
   - Comunica a los usuarios las nuevas asignaciones y verifica que puedan acceder a sus funciones.

---

## Ejercicio 3: Configuración de Permisos y Esquemas de Seguridad

**Subtítulo:**  
Ejercicio Intermedio 3 para Administradores de Proyectos

**Título:**  
Personalización de Permisos y Esquemas de Seguridad

**Caso Hipotético:**  
David, administrador de proyectos, debe asegurar que la información sensible del proyecto sea visible y editable solo por ciertos usuarios. Para ello, necesita personalizar el esquema de permisos del proyecto y ajustar las configuraciones de seguridad.

**Objetivos:**  
- Comprender la estructura de los esquemas de permisos en JIRA.  
- Personalizar el esquema de permisos para restringir el acceso a información crítica.  
- Verificar que solo los usuarios autorizados puedan realizar acciones específicas.

**Plan de Acción:**  
1. Iniciar sesión en JIRA con una cuenta de administrador.  
2. Acceder a la sección de **Esquemas de Permisos** en la administración.  
3. Clonar un esquema de permisos existente y modificarlo según las necesidades del proyecto.  
4. Asignar el nuevo esquema al proyecto.  
5. Probar los cambios con usuarios de diferentes roles.

**Resolución Paso a Paso:**

1. **Acceso a la Administración de Esquemas de Permisos:**  
   - Inicia sesión en JIRA como administrador.  
   - Dirígete a **Configuración** > **Issues** > **Esquemas de Permisos**.

2. **Clonación y Modificación del Esquema:**  
   - Selecciona un esquema de permisos existente que se acerque a tus necesidades y haz clic en **Clonar**.  
   - Edita el esquema clonado para ajustar permisos específicos, como quién puede ver o editar ciertos issues.

3. **Asignación del Esquema al Proyecto:**  
   - Accede a la configuración del proyecto y selecciona **Esquema de Permisos**.  
   - Asigna el esquema modificado al proyecto en cuestión.

4. **Prueba y Verificación:**  
   - Simula acciones en el proyecto con usuarios de distintos roles para confirmar que solo los autorizados puedan realizar cambios.  
   - Ajusta el esquema si es necesario según el feedback recibido.

---

## Ejercicio 4: Creación y Configuración de Dashboards y Reportes Personalizados

**Subtítulo:**  
Ejercicio Intermedio-Avanzado 4 para Administradores de Proyectos

**Título:**  
Diseño de Dashboards y Reportes para Monitoreo del Proyecto

**Caso Hipotético:**  
María, administradora de proyectos, necesita crear un dashboard que permita monitorear el rendimiento y progreso del proyecto. El dashboard debe incluir gadgets que muestren filtros personalizados, gráficos y estadísticas relevantes.

**Objetivos:**  
- Configurar dashboards personalizados en JIRA.  
- Añadir y configurar gadgets que muestren datos de interés (gráficos, listas de issues, etc.).  
- Compartir el dashboard con el equipo de proyecto.

**Plan de Acción:**  
1. Iniciar sesión en JIRA y acceder a la sección de dashboards.  
2. Crear un nuevo dashboard y configurarlo según las necesidades del proyecto.  
3. Añadir gadgets y configurar filtros para visualizar datos relevantes.  
4. Compartir el dashboard con los miembros del proyecto.  
5. Revisar y ajustar el dashboard basado en el feedback del equipo.

**Resolución Paso a Paso:**

1. **Acceso a la Sección de Dashboards:**  
   - Inicia sesión en JIRA y haz clic en **Dashboards** en la barra superior.  
   - Selecciona **Crear Dashboard**.

2. **Creación del Nuevo Dashboard:**  
   - Asigna un nombre descriptivo (por ejemplo, “Dashboard de Monitoreo del Proyecto”).  
   - Establece los permisos de visualización (público o restringido a ciertos grupos).

3. **Añadir y Configurar Gadgets:**  
   - Haz clic en **Añadir Gadget**.  
   - Selecciona gadgets como “Filtro de Issues”, “Gráfico de Barras” o “Pie Chart”.  
   - Configura cada gadget estableciendo los filtros necesarios (por ejemplo, issues por estado, prioridad o asignado).

4. **Compartir y Verificar:**  
   - Utiliza la opción de **Compartir** para dar acceso a otros miembros del proyecto.  
   - Revisa el dashboard para asegurarte de que los datos se muestren correctamente y realiza ajustes si es necesario.

---

## Ejercicio 5: Automatización y Configuración de Notificaciones Avanzadas

**Subtítulo:**  
Ejercicio Avanzado 5 para Administradores de Proyectos

**Título:**  
Implementación de Notificaciones y Reglas de Automatización Avanzadas

**Caso Hipotético:**  
Juan, administrador de proyectos, necesita configurar notificaciones avanzadas para alertar al equipo sobre cambios críticos en el proyecto. Además, debe implementar reglas de automatización que envíen recordatorios y escalaciones en función de ciertos criterios (por ejemplo, issues sin actualización o cambios en el estado).

**Objetivos:**  
- Configurar notificaciones avanzadas en JIRA.  
- Crear reglas de automatización para gestionar alertas y recordatorios.  
- Asegurar que las notificaciones se envíen solo a los usuarios pertinentes.

**Plan de Acción:**  
1. Iniciar sesión en JIRA con permisos de administrador.  
2. Acceder a la sección de **Notificaciones** y **Automatización**.  
3. Configurar reglas de automatización basadas en disparadores (por ejemplo, cambios en el estado o inactividad).  
4. Personalizar las notificaciones (correo electrónico, mensajes en la aplicación, etc.) según los criterios definidos.  
5. Probar y ajustar las reglas para confirmar su correcto funcionamiento.

**Resolución Paso a Paso:**

1. **Acceso a Notificaciones y Automatización:**  
   - Inicia sesión en JIRA y ve a **Project Settings**.  
   - Selecciona **Notifications** para revisar la configuración actual y **Automation** para crear nuevas reglas.

2. **Configuración de la Regla de Automatización:**  
   - Haz clic en **Create Rule** y selecciona un disparador (por ejemplo, "Issue Updated" o "Scheduled").  
   - Añade condiciones que identifiquen situaciones críticas, como issues sin actualización durante X días.

3. **Definición de Acciones de Notificación:**  
   - Agrega una acción para **Enviar Notificación** o **Enviar Correo Electrónico**.  
   - Configura el mensaje, incluyendo detalles del issue y el motivo de la alerta.  
   - Si es necesario, crea ramas condicionales para escalaciones a supervisores.

4. **Guardar y Probar la Regla:**  
   - Guarda la regla y activa la automatización.  
   - Realiza pruebas simulando condiciones que activen la regla (por ejemplo, deja un issue sin actualización para ver si se envía el recordatorio).  
   - Revisa los logs de la automatización para confirmar que las notificaciones se envíen correctamente.

---

## Fe Errata

debido a que la plataforma de Atlassian cambia constantemente, algunos menus y accesos podrian estar cambiados.


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