# Capítulo 10: Configuración de Seguridad y Acceso

---

## Sección 1: Políticas de Seguridad y Control de Acceso

Implementar políticas de seguridad claras ayuda a controlar quién tiene acceso a la información dentro del proyecto y a proteger datos sensibles.

### Paso 1: Definir Políticas de Acceso a Nivel de Proyecto

1. Dirígete a **Project Settings > Permissions** (Configuración del Proyecto > Permisos) en el proyecto **ANC Help Center**.
2. Define roles con acceso específico:
   - **Administrador**: Tiene acceso completo y puede gestionar configuraciones avanzadas de seguridad y permisos.
   - **Agentes**: Limitado a gestión de incidencias y funciones asignadas en el flujo de trabajo.
   - **Clientes**: Restringido a visualizar solo sus propias incidencias, sin acceso a las de otros clientes ni a incidencias internas.

3. Configura una política de acceso que limite el número de usuarios con acceso de **Administrador** para reducir riesgos de seguridad.

### Paso 2: Configuración de Niveles de Seguridad

Establecer niveles de seguridad en Jira permite definir restricciones adicionales según el tipo de incidencia o información que contenga.

1. En **Project Settings > Issue Security** (Configuración del Proyecto > Seguridad de Incidencias):
   - Crea un nuevo nivel de seguridad llamado `AHC-Confidencial` para proteger incidencias que contienen datos sensibles.
   - Define otros niveles según las necesidades del proyecto, como `Público` para incidencias de clientes que pueden ser vistas por el reportador y los agentes, y `Restringido` para accesos específicos.

2. Asigna roles de la siguiente manera:
   - **AHC-Confidencial**: Solo accesible para **Administrador** y **Agente Interno**.
   - **Restringido**: Accesible para **Administrador**, **Agente Interno** y **Agente de Cliente**.
   - **Público**: Accesible para **Administrador**, **Agente Interno**, **Agente de Cliente** y el **Cliente** que reportó la incidencia.

3. Configura el esquema de seguridad para que cada incidencia creada en el proyecto se asocie automáticamente con el nivel de seguridad adecuado.

---

## Sección 2: Configuración de Permisos de Seguridad

Configurar permisos específicos es esencial para definir qué acciones puede realizar cada rol dentro del proyecto. Esta sección explica cómo asignar permisos adecuados para evitar accesos no autorizados.

### Paso 1: Configurar Permisos para Roles Específicos

1. En **Permissions** (Permisos), asigna los siguientes permisos clave para cada rol en el proyecto:

   - **Administrador**:
     - `Browse Projects` (Ver Proyectos): Permite ver todas las incidencias y configuraciones.
     - `Manage Security Levels` (Gestionar Niveles de Seguridad): Permite cambiar y asignar niveles de seguridad en incidencias confidenciales.
     - `Delete Issues` (Eliminar Incidencias): Permiso exclusivo para eliminar incidencias según sea necesario.

   - **Agente Interno**:
     - `Create Issues` (Crear Incidencias): Puede crear incidencias en el proyecto.
     - `Edit Issues` (Editar Incidencias): Permiso para modificar las incidencias internas.
     - `Transition Issues` (Transicionar Incidencias): Permiso para avanzar las incidencias en el flujo de trabajo.

   - **Agente de Cliente**:
     - `Browse Projects` (Ver Proyectos): Acceso limitado solo a incidencias de clientes.
     - `Transition Issues` (Transicionar Incidencias): Puede mover las incidencias a través de ciertos estados en el flujo de trabajo.

   - **Clientes**:
     - `Browse Projects` (Ver Proyectos): Limitado a visualizar solo sus propias incidencias.
     - `Comment on Issues` (Comentar en Incidencias): Permiso para agregar comentarios en sus incidencias.

2. Guarda la configuración de permisos y revisa que cada rol tenga acceso solo a las funciones necesarias.

### Paso 2: Asignar Permisos de Seguridad por Tipo de Incidencia

1. Dirígete a **Project Settings > Issue Security Schemes** (Configuración del Proyecto > Esquemas de Seguridad de Incidencias).
2. Crea un esquema de seguridad llamado `AHC-Seguridad de Incidencias` y asigna los niveles de seguridad definidos:

   - **Incidencias Internas**: Solo pueden ser visualizadas por **Administrador** y **Agente Interno**.
   - **Incidencias de Clientes**: Acceso permitido para **Agente de Cliente** y el **Cliente** que reportó la incidencia.
   - **Incidencias Confidenciales**: Restringido a **Administrador** y **Agente Interno** únicamente.

3. Asocia el esquema de seguridad con el proyecto **ANC Help Center**.

---

## Sección 3: Seguridad de Datos y Control de Visibilidad

Configurar la visibilidad de datos es crucial para proteger la información y evitar que usuarios sin permisos accedan a datos no autorizados.

### Paso 1: Definir Restricciones de Visibilidad

1. En **Project Settings > Permissions**, establece restricciones de visibilidad para los diferentes tipos de incidencias:
   - **Incidencias Internas**: Solo accesibles por **Agente Interno** y **Administrador**.
   - **Incidencias de Clientes**: Acceso para **Agente de Cliente** y el **Cliente** que reportó la incidencia.
   - **Incidencias Confidenciales**: Limitadas a **Administrador** y **Agente Interno**.

2. Ajusta los permisos de visualización para cada tipo de incidencia, de modo que solo los usuarios correspondientes puedan acceder a las incidencias designadas como **Confidenciales**.

### Paso 2: Configurar Permisos de Edición Basados en Tipo de Incidencia

1. En **Permissions**, asigna los permisos de **Edit Issues** (Editar Incidencias) según el tipo de incidencia:
   - **Incidencias de Clientes**: Solo pueden ser editadas por **Agente de Cliente** y **Administrador**.
   - **Incidencias Internas**: Permiso de edición solo para **Agente Interno** y **Administrador**.
   - **Incidencias Confidenciales**: Solo **Administrador** puede editar estas incidencias.

2. Guarda y revisa que cada rol tenga el permiso adecuado, reduciendo riesgos de ediciones accidentales o no autorizadas.

---

## Sección 4: Monitoreo y Auditoría de Acceso

El monitoreo de accesos es fundamental para mantener la seguridad y verificar que los usuarios solo realicen acciones permitidas.

### Paso 1: Configurar Auditoría en el Proyecto

1. En **Project Settings > Audit Log** (Registro de Auditoría), activa la auditoría para registrar eventos críticos.
2. Configura los siguientes eventos para que se registren en el log de auditoría:
   - Creación y eliminación de incidencias.
   - Cambios en permisos y niveles de seguridad de incidencias.
   - Acceso de usuarios a incidencias confidenciales y modificaciones en sus estados.

3. Asegúrate de que todos los accesos y cambios en incidencias de nivel `AHC-Confidencial` sean auditados.

### Paso 2: Revisar el Registro de Auditoría

1. Accede a **Audit Log** para revisar las actividades registradas en el proyecto.
2. Monitorea actividades sospechosas, como accesos repetidos a incidencias confidenciales por usuarios que normalmente no necesitan acceder a ellas.

### Paso 3: Realizar Ajustes Basados en los Reportes de Auditoría

1. Si detectas actividades inusuales o sospechosas en el **Audit Log**, ajusta permisos o roles según sea necesario.
2. Realiza auditorías periódicas en el proyecto para identificar posibles brechas de seguridad y hacer los ajustes correspondientes.

---

### Paginación

- **Capítulo Anterior**: [Optimización de Flujos de Trabajo y Mejores Prácticas](09_ANC_Help_Center_Capitulo_9.md)
- **Siguiente Capítulo**: [Diseño de Interfaz y Configuración UX/UI del Help Center](11_ANC_Help_Center_Capitulo_11.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/repositorio)
