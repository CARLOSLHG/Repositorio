# Ejercicios para Administradores de JIRA (Menor a Mayor Complejidad)

Este documento contiene 5 ejercicios para administradores de JIRA, organizados de menor a mayor complejidad. Cada ejercicio sigue la estructura:

- **Subtítulo**
- **Título**
- **Caso Hipotético**
- **Objetivos**
- **Plan de Acción**
- **Resolución Paso a Paso**

---

## Ejercicio 1: Creación y Configuración Inicial de un Proyecto en JIRA

**Subtítulo:**  
Ejercicio Básico 1 para Administradores de JIRA

**Título:**  
Creación y Configuración Inicial de un Proyecto

**Caso Hipotético:**  
Laura, administradora de proyectos, recibe la tarea de crear un nuevo proyecto para un cliente. Debe iniciar el proyecto desde cero, eligiendo la plantilla adecuada y configurando parámetros básicos como el tipo de proyecto, los tipos de issues y el esquema de notificaciones.

**Objetivos:**  
- Crear un proyecto nuevo desde la interfaz de administración.  
- Seleccionar la plantilla adecuada (Scrum, Kanban, etc.).  
- Configurar los parámetros básicos: tipos de issue, esquema de notificaciones y permisos iniciales.

**Plan de Acción:**  
1. Iniciar sesión en JIRA como administrador global.  
2. Acceder a la sección de administración de proyectos.  
3. Crear un nuevo proyecto y seleccionar la plantilla correspondiente.  
4. Configurar los parámetros básicos (nombre, clave, tipos de issue, notificaciones y permisos).  
5. Verificar la correcta creación del proyecto.

**Resolución Paso a Paso:**

1. **Inicio de Sesión y Acceso a Administración:**  
   - Inicia sesión en JIRA con una cuenta de administrador.  
   - Haz clic en el ícono de **Configuración** (engranaje) y selecciona **Proyectos**.

2. **Creación del Nuevo Proyecto:**  
   - Haz clic en **Crear Proyecto**.  
   - Selecciona la plantilla adecuada (por ejemplo, Scrum).  
   - Ingresa el nombre y la clave del proyecto y confirma la creación.

3. **Configuración Básica:**  
   - Revisa y ajusta los **Tipos de Issue** (Bug, Tarea, Historia, etc.).  
   - Configura el **Esquema de Notificaciones** para que el equipo reciba alertas importantes.  
   - Establece los permisos iniciales según la política del cliente.

4. **Verificación:**  
   - Dirígete a la lista de proyectos y confirma que el nuevo proyecto aparece correctamente.

---

## Ejercicio 2: Gestión de Usuarios y Roles en un Proyecto

**Subtítulo:**  
Ejercicio Básico-Intermedio 2 para Administradores de JIRA

**Título:**  
Gestión de Usuarios y Asignación de Roles

**Caso Hipotético:**  
Carlos, administrador de proyectos, debe garantizar que solo los usuarios autorizados accedan a ciertas funciones. Su tarea es agregar nuevos usuarios, organizarlos en grupos y asignar roles específicos para controlar el acceso en el proyecto.

**Objetivos:**  
- Agregar nuevos usuarios al sistema.  
- Crear y gestionar grupos de usuarios.  
- Asignar roles específicos dentro del proyecto (por ejemplo, Desarrollador, Tester, Líder de Proyecto).

**Plan de Acción:**  
1. Iniciar sesión en JIRA con permisos de administrador.  
2. Acceder a la sección de **Administración de Usuarios y Grupos**.  
3. Invitar a nuevos usuarios y organizarlos en grupos.  
4. Asignar roles a estos grupos o a usuarios individuales desde la configuración del proyecto.  
5. Verificar la correcta asignación y funcionamiento de los roles.

**Resolución Paso a Paso:**

1. **Acceso a la Administración de Usuarios:**  
   - Inicia sesión en JIRA y ve a **Configuración** > **Usuarios y Grupos**.

2. **Agregar Usuarios y Organizar en Grupos:**  
   - Haz clic en **Agregar Usuario** y completa los datos solicitados (correo, nombre, etc.).  
   - Crea grupos como “Equipo de Desarrollo”, “QA” y “Gestión” si aún no existen.

3. **Asignación de Roles:**  
   - Dirígete a la configuración del proyecto y selecciona **Roles del Proyecto**.  
   - Asigna los roles correspondientes a los grupos creados (por ejemplo, “Equipo de Desarrollo” al rol de **Desarrollador**).

4. **Verificación:**  
   - Comprueba en la sección de **Permisos del Proyecto** que cada grupo tenga los accesos adecuados.

---

## Ejercicio 3: Configuración de Permisos y Esquemas de Seguridad

**Subtítulo:**  
Ejercicio Intermedio 3 para Administradores de JIRA

**Título:**  
Personalización de Permisos y Esquemas de Seguridad

**Caso Hipotético:**  
David, administrador de proyectos, necesita asegurar que la información sensible sea accesible solo para usuarios autorizados. Debe personalizar el esquema de permisos del proyecto para restringir o conceder accesos específicos.

**Objetivos:**  
- Comprender la estructura de los esquemas de permisos en JIRA.  
- Modificar un esquema de permisos para adaptarlo a las necesidades de seguridad del proyecto.  
- Asignar el esquema modificado al proyecto y probar su funcionamiento.

**Plan de Acción:**  
1. Iniciar sesión en JIRA como administrador.  
2. Acceder a la sección de **Esquemas de Permisos**.  
3. Clonar un esquema existente y editarlo para restringir accesos sensibles.  
4. Asignar el nuevo esquema al proyecto.  
5. Realizar pruebas con usuarios para validar que los permisos sean correctos.

**Resolución Paso a Paso:**

1. **Acceso a Esquemas de Permisos:**  
   - Inicia sesión en JIRA y ve a **Configuración** > **Issues** > **Esquemas de Permisos**.

2. **Clonación y Modificación del Esquema:**  
   - Selecciona un esquema cercano a lo deseado y haz clic en **Clonar**.  
   - Modifica los permisos para que solo usuarios autorizados puedan ver o editar información sensible.

3. **Asignación del Esquema:**  
   - Dirígete a la configuración del proyecto y selecciona **Esquema de Permisos**.  
   - Asigna el esquema modificado al proyecto.

4. **Prueba y Validación:**  
   - Inicia sesión con diferentes usuarios para asegurarte de que los permisos se aplican correctamente.  
   - Ajusta el esquema según el feedback.

---

## Ejercicio 4: Creación y Configuración de Dashboards y Reportes Personalizados

**Subtítulo:**  
Ejercicio Intermedio-Avanzado 4 para Administradores de JIRA

**Título:**  
Diseño y Configuración de Dashboards y Reportes para el Seguimiento del Proyecto

**Caso Hipotético:**  
María, administradora de proyectos, requiere un dashboard personalizado que muestre métricas y reportes clave del proyecto. Este dashboard debe incluir gráficos, listas de issues y otros gadgets para facilitar el seguimiento del progreso.

**Objetivos:**  
- Crear dashboards personalizados en JIRA.  
- Añadir gadgets que muestren información relevante (gráficos, filtros, etc.).  
- Compartir y configurar permisos de visualización para el dashboard.

**Plan de Acción:**  
1. Iniciar sesión en JIRA y acceder a la sección de **Dashboards**.  
2. Crear un nuevo dashboard y definir su configuración de permisos.  
3. Añadir y configurar gadgets (Filtro de Issues, Gráfico de Barras, Pie Chart, etc.).  
4. Establecer filtros personalizados para cada gadget.  
5. Compartir el dashboard con el equipo y verificar que la información se actualice correctamente.

**Resolución Paso a Paso:**

1. **Acceso a Dashboards:**  
   - Inicia sesión en JIRA y haz clic en **Dashboards** en la barra superior.  
   - Selecciona **Crear Dashboard**.

2. **Configuración del Dashboard:**  
   - Asigna un nombre descriptivo (por ejemplo, “Dashboard Seguimiento Proyecto”).  
   - Define los permisos de visualización (público o restringido a determinados grupos).

3. **Añadir Gadgets:**  
   - Haz clic en **Añadir Gadget** y selecciona los gadgets deseados (Filtro de Issues, Gráfico, etc.).  
   - Configura cada gadget definiendo los filtros y parámetros necesarios.

4. **Verificación y Ajustes:**  
   - Revisa el dashboard para confirmar que se muestran los datos correctos.  
   - Realiza ajustes en los filtros o en la disposición de los gadgets según sea necesario.

---

## Ejercicio 5: Automatización y Configuración de Notificaciones Avanzadas

**Subtítulo:**  
Ejercicio Avanzado 5 para Administradores de JIRA

**Título:**  
Implementación de Reglas de Automatización y Notificaciones Personalizadas

**Caso Hipotético:**  
Juan, administrador de proyectos, debe configurar notificaciones avanzadas para alertar a los miembros del equipo sobre eventos críticos, como issues sin actualización o cambios importantes. Además, necesita implementar reglas de automatización para enviar recordatorios y escalaciones automáticamente.

**Objetivos:**  
- Configurar reglas de automatización en JIRA con disparadores y condiciones específicas.  
- Personalizar las notificaciones (correo electrónico, mensajes en la aplicación, etc.).  
- Asegurar que las notificaciones y escalaciones se activen correctamente según los criterios definidos.

**Plan de Acción:**  
1. Iniciar sesión en JIRA con permisos de administrador.  
2. Acceder a la sección de **Project Settings** y luego a **Automation**.  
3. Crear una nueva regla de automatización basada en un disparador (por ejemplo, "Issue Updated" o "Scheduled").  
4. Definir condiciones que detecten issues sin actualización o cambios críticos.  
5. Configurar acciones para enviar notificaciones personalizadas y, si es necesario, escalarlas a supervisores.  
6. Guardar, activar y probar la regla.

**Resolución Paso a Paso:**

1. **Acceso a Automatización:**  
   - Inicia sesión en JIRA y ve a **Project Settings** > **Automation**.

2. **Creación de la Regla:**  
   - Haz clic en **Create Rule**.  
   - Selecciona un disparador, por ejemplo, **Scheduled** para ejecutar la regla diariamente.

3. **Configuración de Condiciones:**  
   - Añade una condición **Issue Fields Condition** para identificar issues en estados específicos o sin actualización durante un período determinado (por ejemplo, 3 o 5 días).

4. **Definición de Acciones:**  
   - Agrega una acción **Send Email** o **Notify User** y configura el mensaje para incluir detalles del issue y un enlace para actualizarlo.  
   - Si se requiere escalación, utiliza ramas condicionales para enviar la notificación a supervisores.

5. **Guardar y Probar:**  
   - Revisa toda la configuración y guarda la regla.  
   - Actívala y realiza pruebas simulando las condiciones definidas.  
   - Verifica en los logs de automatización que las notificaciones se envíen correctamente.

---

## Fe Errata

debido a que la plataforma de Atlassian cambia constantemente, algunos menus y accesos podrian estar cambiados.


---
| [Regresar](./README.md) |


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