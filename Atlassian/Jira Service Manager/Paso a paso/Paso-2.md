# Paso 2: Creación del Proyecto

El objetivo de este paso es guiarte en la creación de un nuevo proyecto en **Jira Service Management (JSM)**. 
Este proyecto se configurará como el Help Center de **Anonymous Help Center (AHC)** y será el punto de entrada 
para gestionar incidencias internas y externas.

---

## 2.1 Acceso a la Sección de Creación de Proyectos

1. **Inicia sesión en Jira Service Management** (consulta el **Paso 1** si necesitas ayuda).
2. **Navega a la Sección de Proyectos**:
   - Desde el panel principal de Jira, selecciona **Projects** (Proyectos) en el menú de la izquierda.
   - Haz clic en **View all projects** (Ver todos los proyectos) si ya tienes otros proyectos y necesitas 
     encontrar la opción de crear uno nuevo.
3. **Iniciar la Creación de un Nuevo Proyecto**:
   - Haz clic en **Create project** (Crear proyecto) en la parte superior derecha.

---

## 2.2 Selección de Tipo de Proyecto

1. **Elegir Jira Service Management (JSM)**:
   - Verás varias opciones de productos (Jira Software, Jira Service Management, etc.). Selecciona 
     **Jira Service Management**.
   - Esto garantiza que el proyecto esté optimizado para gestionar incidencias de soporte.

2. **Seleccionar una Plantilla**:
   - En Jira Service Management, puedes seleccionar una plantilla para tu proyecto.
   - **Selección Recomendada**: Selecciona la plantilla **Atención al Cliente** para adaptarse a solicitudes 
     tanto internas (empleados) como externas (clientes).
   - **Descripción**: La plantilla de Atención al Cliente incluye configuraciones predeterminadas para gestionar 
     solicitudes y responder a usuarios internos y externos, ideal para un Help Center como AHC.

---

## 2.3 Configuración del Proyecto

1. **Definir el Nombre y la Clave del Proyecto**:
   - **Nombre del Proyecto**: Asigna un nombre claro y descriptivo. Ejemplo: “AHC Help Center”.
   - **Clave del Proyecto**: La clave se utiliza para crear identificadores únicos para las incidencias 
     (por ejemplo, AHC-123). Elige una clave corta, como “AHC”.

2. **Configurar el Tipo de Equipo**:
   - **Tipo de Equipo**: Selecciona **Atención al Cliente** para asegurar una configuración óptima 
     para solicitudes de soporte.

3. **Configurar Acceso al Proyecto**:
   - Aquí debes seleccionar el acceso al canal, que puede ser:
     - **Abierto**: Todo usuario registrado en Jira puede acceder al Help Center y ver todas las incidencias abiertas.
     - **Restringido**: Solo los usuarios asignados y con permisos específicos pueden acceder y gestionar 
       incidencias en el Help Center.
   - **Recomendación**: Para un Help Center que maneja tanto incidencias internas como externas, lo mejor es 
     seleccionar **Restringido**. Esto permitirá asignar roles específicos para gestionar y responder a incidencias 
     internas (empleados) y externas (clientes), evitando que usuarios no autorizados accedan a información que 
     podría ser sensible.

4. **Configurar Gestión del Proyecto**:
   - Al elegir “Gestionado por la Empresa” podrás administrar mejor las configuraciones del proyecto.
   - Después de crear el proyecto, puedes verificar esta configuración desde **Project settings > Details** 
     (Configuración del Proyecto > Detalles).

5. **Seleccionar Tipos de Solicitud**:
   - Tras hacer clic en **Create** (Crear), verás una pantalla para seleccionar los tipos de solicitud más relevantes. 
   **Tipos recomendados**:
     - **Informar de un Error**
     - **Otras Preguntas**
     - **Proponer Mejoras**
     - **Soporte Técnico**
   - **Sugerencia**: Estos tipos de solicitud cubrirán la mayoría de las necesidades de soporte interno y externo. 
   Puedes añadir o personalizar otros tipos más adelante si es necesario.

6. **Confirmación de Tipos de Solicitud**:
   - Una vez creada la configuración inicial, Jira te mostrará el mensaje **"Hemos añadido tus tipos de solicitud"**.
   - **Edición recomendada**: No es necesario editar estos tipos en este momento; es mejor avanzar en la configuración 
     general del proyecto y ajustar los tipos de solicitud más adelante, si los requerimientos específicos de AHC lo exigen.

---

## 2.4 Revisión Inicial del Proyecto

1. **Acceder al Nuevo Proyecto**:
   - Una vez creado, serás redirigido automáticamente al panel principal del nuevo proyecto.
   - Desde aquí, puedes comenzar a configurar aspectos avanzados, como la personalización de flujos de trabajo y pantallas.

2. **Verificación de Configuración Básica**:
   - Confirma que el nombre, la clave y el tipo de proyecto son correctos.
   - Asegúrate de que el proyecto esté configurado como **Jira Service Management** y que tenga acceso al **Help Center**.

---

### Puntos Importantes

- **Uso de la Plantilla Correcta**: Asegúrate de seleccionar la plantilla **Atención al Cliente** para garantizar que el 
  proyecto tenga configuraciones de soporte adecuadas para usuarios internos y externos.
- **Configurar Notificaciones**: Puedes ajustar las notificaciones más adelante, pero configúralas de manera inicial 
  para mantener informados a clientes y agentes.
- **Acceso al Proyecto**: Revisa la configuración de privacidad del proyecto para evitar accesos no autorizados.

---

### Paginación

- **Paso Anterior**: [Acceso a Jira](Paso-1.md)
- **Siguiente Paso**: [Configuración Inicial del Help Center](Paso-3.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/Repositorio)
