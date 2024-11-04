# Capítulo 3: Configuración de Usuarios, Roles y Grupos

---

**Nota**: A partir de este punto, todas las instrucciones y configuraciones están basadas exclusivamente en **Jira Cloud** para el proyecto **ANC Help Center**. Aunque algunos conceptos pueden aplicarse a **Data Center**, esta guía no cubrirá las configuraciones específicas de esa versión.

---

## 1. Campos de Configuración Inicial del Proyecto en Jira Cloud

Al crear un proyecto en Jira Cloud, varios campos clave deben configurarse adecuadamente para definir las características del proyecto. A continuación, se indican las recomendaciones para cada uno de estos campos en el proyecto **ANC Help Center**.

- **Campos en Jira Cloud**:
  1. **Nombre**: Utilizar "**ANC Help Center**".
  2. **Clave**: Usar "**AHC**" como clave.
  3. **Tipo de equipo**: Seleccionar **Operaciones empresariales** como la opción más adecuada.
  4. **Acceso al canal**: Definir como **Privado** para limitar el acceso a los miembros del equipo.
  5. **Plantilla**: Seleccionar la plantilla **Atención al Cliente**.
  6. **Comparte la configuración**: Mantener esta opción **desactivada** para configuraciones exclusivas.
  7. **Tipo de proyecto**: Seleccionar **Service Management**.

Después de completar esta configuración, haz clic en **Crear proyecto** para proceder al siguiente paso.

---

## 2. Selección de Tipos de Solicitud en Jira Cloud

Después de configurar el proyecto, aparece una pantalla donde se eligen los **tipos de solicitud** que serán manejados en el proyecto. Cada tipo de solicitud representa una categoría de problemas comunes, como "Soporte técnico" o "Proponer mejoras". A continuación, se detallan los pasos para configurar esta sección.

### Pantalla de Selección de Tipos de Solicitud en Jira Cloud

- **Descripción**: Los tipos de solicitud permiten clasificar y recopilar detalles sobre las solicitudes entrantes. Estos ayudan a estructurar y organizar mejor las incidencias en el proyecto.

- **Pasos para Configurar los Tipos de Solicitud**:
  1. **Explorar las Plantillas**: En la barra lateral izquierda, verás diferentes categorías, como *Análisis*, *Atención al cliente*, *Finanzas*, *Instalaciones*, *Marketing*, etc. Al seleccionar cada categoría, puedes ver las plantillas disponibles dentro de ella.
  2. **Tipos de Solicitud Añadidos**: Los tipos de solicitud que aparecen en el cuadro central ya están añadidos al proyecto. Estos incluyen opciones como:
     - **Informar de un error**
     - **Otras preguntas**
     - **Preguntas acerca de la prueba del producto**
     - **Preguntas sobre la concesión de licencias y la facturación**
     - **Proponer mejoras**
     - **Soporte técnico**
     - **Sugerir una nueva característica**
  3. **Eliminar Tipos de Solicitud**: Si hay algún tipo de solicitud que no sea relevante para **ANC Help Center**, puedes hacer clic en **Eliminar** debajo de cada tarjeta.
  4. **Añadir Nuevos Tipos de Solicitud**: Si deseas incluir tipos adicionales que se ajusten a necesidades específicas de ANC, puedes buscarlos en la barra lateral, seleccionarlos y hacer clic para añadirlos.

- **Recomendación para ANC Help Center**:
   - **Mantenemos** los tipos de solicitud **"Informar de un error"**, **"Soporte técnico"**, y **"Otras preguntas"** para cubrir una variedad de incidencias comunes.
   - **Opcionalmente**: Podrías añadir o ajustar tipos como **"Proponer mejoras"** y **"Sugerir una nueva característica"** si el enfoque incluye también mejoras y feedback del cliente.

5. **Finalizar**: Una vez seleccionados los tipos de solicitud adecuados, haz clic en **Continuar al proyecto** para proceder a la configuración general y a la asignación de usuarios.

---

## 3. Invitación y Gestión de Usuarios

En este paso, configuraremos el acceso de los usuarios necesarios para el proyecto **ANC Help Center** en Jira Cloud, asegurándonos de que cada miembro tenga el nivel de acceso adecuado para sus responsabilidades.

### Pasos para Invitar Usuarios al Proyecto en Cloud
1. Dirigirse a **Configuración del Proyecto > Acceso al Proyecto**.
2. Hacer clic en **Invitar Usuarios** e ingresar los correos electrónicos de los usuarios a agregar.
3. Asignar roles iniciales (como **Agente de Soporte** o **Administrador**) según las necesidades del proyecto.
4. Enviar la invitación. Los usuarios recibirán un enlace para unirse y acceder al proyecto con los permisos asignados.

---

## 4. Creación y Configuración de Grupos

Para facilitar la organización de usuarios y permisos, configuraremos grupos específicos en Jira. En este caso, crearemos y configuraremos el grupo **Anonymous Networking** para incluir a los usuarios internos de la empresa ANC.

### Pasos para Crear y Configurar el Grupo en Cloud
1. Dirigirse a **Administrator Hub > Administración de Usuarios > Grupos**.
2. Crear un nuevo grupo llamado **Anonymous Networking**.
3. Añadir los usuarios internos de ANC a este grupo, lo cual permitirá una asignación de permisos más rápida en futuras configuraciones.
4. Guardar la configuración del grupo para usarlo en la asignación de roles y permisos en el proyecto.

---

## 5. Definición de Roles y Permisos en el Proyecto ANC Help Center

Se definirán roles específicos para el proyecto y se asignarán permisos detallados para determinar las capacidades de cada rol en el proyecto **ANC Help Center**.

### Roles Definidos
1. **Administrador del Proyecto**: Control total sobre la configuración global del proyecto y la gestión de permisos.
2. **Agente Interno (Atención a Empleados)**: Encargado de gestionar solicitudes e incidencias reportadas por empleados de ANC.
3. **Agente Externo (Atención a Clientes)**: Responsable de resolver las incidencias y solicitudes de soporte de los clientes externos de ANC.
4. **Project Administrator**: Permisos limitados de administración del proyecto, usando la estructura predefinida de permisos de Jira para este rol.

### Configuración de Roles en Cloud
1. Ir a **Configuración del Proyecto > Roles del Proyecto**.
2. Definir cada rol según lo descrito (Administrador, Agente Interno, Agente Externo, Project Administrator).
3. Asignar usuarios a cada rol según sus funciones en el proyecto.
4. Personalizar permisos específicos para cada rol, asegurando que los usuarios tengan acceso solo a las funcionalidades necesarias.

---

## 6. Tabla Completa de Permisos en Jira Service Management

La siguiente tabla muestra una lista completa de permisos que puedes encontrar en Jira Service Management y la asignación recomendada para cada rol en el proyecto **ANC Help Center**:

| **Sección de Permisos**             | **Permiso**                              | **Administrador** | **Agente Interno** | **Agente Externo** | **Project Administrator** |
|-------------------------------------|------------------------------------------|-------------------|---------------------|---------------------|----------------------------|
| **Acceso a Incidencias**            | Ver Incidencias                          | ✔️               | ✔️                 | ✔️                 | ✔️                        |
|                                     | Crear Incidencias                        | ✔️               | ✔️                 | ✔️                 | ✔️                        |
|                                     | Editar Incidencias                       | ✔️               | ✔️                 | ✔️                 | Solo propias              |
|                                     | Eliminar Incidencias                     | ✔️               | ❌                 | ❌                 | ❌                        |
|                                     | Ver Incidencias de Otros Usuarios        | ✔️               | ✔️                 | ❌                 | ✔️                        |
|                                     | Asignar Incidencias                      | ✔️               | ✔️                 | ✔️                 | ✔️                        |
|                                     | Transición de Incidencias                | ✔️               | ✔️                 | ✔️                 | ✔️                        |
| **Flujos de Trabajo**               | Gestionar Flujos de Trabajo              | ✔️               | ❌                 | ❌                 | ❌                        |
| **Vinculación de Incidencias**      | Crear Enlaces de Incidencias             | ✔️               | ✔️                 | ✔️                 | ✔️                        |
|                                     | Eliminar Enlaces de Incidencias          | ✔️               | ❌                 | ❌                 | ❌                        |
| **Administración de Componentes**   | Administrar Componentes del Proyecto     | ✔️               | ❌                 | ❌                 | ✔️                        |
| **Configuración del Proyecto**      | Acceso a Configuraciones del Proyecto    | ✔️               | ❌                 | ❌                 | ✔️                        |
| **Notificaciones**                  | Enviar Notificaciones                    | ✔️               | ✔️                 | ✔️                 | ✔️                        |
| **Adjuntos**                        | Adjuntar Archivos                        | ✔️               | ✔️                 | ✔️                 | ✔️                        |
|                                     | Eliminar Archivos Adjuntos               | ✔️               | ❌                 | ❌                 | ❌                        |
| **Votaciones y Seguimiento**        | Votar en Incidencias                     | ✔️               | ✔️                 | ✔️                 | ✔️                        |
|                                     | Seguir Incidencias                       | ✔️               | ✔️                 | ✔️                 | ✔️                        |

---

### **Paginación**

- **Capítulo Anterior:** [Repaso del Administrator Hub y Acceso a Jira Service Management](ANC_Help_Center_Capitulo_2.md)
- **Siguiente Capítulo:** [Configuración de Incidencias y Flujos de Trabajo](ANC_Help_Center_Capitulo_4.md)

---

