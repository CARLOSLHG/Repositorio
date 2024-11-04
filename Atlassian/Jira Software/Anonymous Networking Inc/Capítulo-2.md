# Capítulo 2: Configuración Completa de Tipos de Incidencias, Pantallas y Esquemas en Jira

En este capítulo, se detallará cómo configurar tipos de incidencias, crear incidencias personalizadas, y gestionar esquemas avanzados. Siguiendo estos pasos, obtendrás una estructura de proyecto Jira completa y funcional adaptada a las necesidades de **Anonymous Network Company (ANC)**.

---

## 2.1 Definición y Creación de Tipos de Incidencias en Jira

Los tipos de incidencias permiten clasificar las tareas y problemas dentro del proyecto de una manera coherente y personalizada.

### Pasos para Definir Tipos de Incidencias
1. **Accede a la Configuración de Incidencias**: Desde el menú de Configuración de Jira, selecciona "Incidencias" y luego "Tipos de Incidencias".
2. **Crea Nuevos Tipos de Incidencias**:
   - Define el nombre de la incidencia y una descripción breve.
   - Asigna un icono que represente visualmente la incidencia en los tableros.
3. **Asignación de Tipos Personalizados en ANC**:
   - **ANC - Tarea**: Para tareas generales dentro del proyecto.
   - **ANC - Incidencia Crítica**: Para problemas de alta prioridad que afectan la red.
   - **ANC - Inspección de Seguridad**: Incidencias relacionadas con auditorías de seguridad.
   - **ANC - Solicitud de Aprobación**: Para solicitudes que requieren validación adicional.
   - **ANC - Epic**: Englobará las tareas y subtareas relacionadas con objetivos generales del proyecto.

### Tipos de Incidencias y sus Usos en ANC
| Tipo de Incidencia             | Descripción                                       |
|--------------------------------|---------------------------------------------------|
| ANC - Tarea                    | Tareas generales del proyecto.                    |
| ANC - Incidencia Crítica       | Incidencias que requieren atención inmediata.     |
| ANC - Inspección de Seguridad  | Auditorías y controles de seguridad de red.       |
| ANC - Solicitud de Aprobación  | Requiere revisión y validación de un superior.    |
| ANC - Epic                     | Marco general que engloba varias incidencias.     |

---

## 2.2 Creación de Pantallas en Jira

Las pantallas definen qué campos se muestran cuando un usuario crea, edita o visualiza una incidencia.

### Creación de Pantallas Personalizadas en ANC
Para cada tipo de incidencia, crearemos pantallas específicas en el proyecto ANC.

1. **ANC - Pantalla de Creación**: Incluye los campos esenciales al crear una incidencia.
2. **ANC - Pantalla de Edición**: Permite modificar campos clave de la incidencia.
3. **ANC - Pantalla de Visualización**: Muestra todos los detalles de la incidencia.
4. **Pantallas de Transición**: Aparecen cuando una incidencia pasa de un estado a otro (e.g., *Esperando Revisión* a *Cerrado*).
5. **Pantallas de No Transición**: Para estados intermedios que no requieren cambios de un flujo.

### Configuración de las Pantallas para Cada Tipo de Incidencia
| Tipo de Incidencia             | Pantalla de Creación  | Pantalla de Edición       | Pantalla de Visualización |
|--------------------------------|-----------------------|---------------------------|----------------------------|
| ANC - Tarea                    | ANC - Crear Tarea     | ANC - Editar Tarea        | ANC - Ver Tarea            |
| ANC - Incidencia Crítica       | ANC - Crear Crítica   | ANC - Editar Crítica      | ANC - Ver Crítica          |
| ANC - Inspección de Seguridad  | ANC - Crear Seguridad | ANC - Editar Seguridad    | ANC - Ver Seguridad        |
| ANC - Solicitud de Aprobación  | ANC - Crear Aprobación| ANC - Editar Aprobación   | ANC - Ver Aprobación       |
| ANC - Epic                     | ANC - Crear Epic      | ANC - Editar Epic         | ANC - Ver Epic             |

---

## 2.3 Esquemas de Pantallas en Jira

Los esquemas de pantallas permiten asignar pantallas específicas a tipos de incidencias y eventos (crear, editar, visualizar).

### Creación de Esquemas de Pantallas Personalizados
1. **Accede a "Esquemas de Pantalla"**: Desde la configuración de Jira, selecciona "Esquemas de Pantalla" en el menú de incidencias.
2. **Crea un Esquema Nuevo**:
   - **Nombre del Esquema**: ANC - Esquema de Pantallas.
   - **Pantallas Asociadas**: Asigna cada pantalla creada previamente al evento correspondiente (crear, editar, visualizar).
3. **Esquema de Pantalla por Tipo de Incidencia**:
   - Accede a "Esquema de Pantallas por Tipo de Incidencia" para asignar el esquema de pantallas a cada tipo de incidencia específico.

### Ejemplo de Esquema de Pantalla para ANC
| Tipo de Incidencia             | Evento      | Pantalla Asignada           |
|--------------------------------|-------------|-----------------------------|
| ANC - Tarea                    | Crear       | ANC - Crear Tarea           |
|                                | Editar      | ANC - Editar Tarea          |
|                                | Visualizar  | ANC - Ver Tarea             |
| ANC - Incidencia Crítica       | Crear       | ANC - Crear Crítica         |
|                                | Editar      | ANC - Editar Crítica        |
|                                | Visualizar  | ANC - Ver Crítica           |

---

## 2.4 Configuración de Permisos

### Permisos Globales vs. Permisos de Proyecto
Los permisos globales afectan todas las áreas de Jira y son diferentes de los permisos específicos de proyecto. En el proyecto ANC, los permisos se configuran para garantizar que solo los usuarios autorizados puedan realizar ciertas acciones.

### Tabla de Permisos para el Proyecto ANC
| Permiso                                   | Inspector General | Técnico de Redes | Operador General | Administrador de Proyecto |
|-------------------------------------------|-------------------|------------------|------------------|---------------------------|
| Buscar Proyectos                          | ✔                | ✔               | ✔               | ✔                        |
| Administrar Sprints                       |                  |                  |                  | ✔                        |
| Ver Flujo de Trabajo                      | ✔                | ✔               | ✔               | ✔                        |
| Usuario Asignable                         |                  | ✔               | ✔               | ✔                        |
| Asignar Incidencias                       |                  | ✔               | ✔               | ✔                        |
| Cerrar Incidencias                        | ✔                |                  | ✔               | ✔                        |
| Crear Incidencias                         |                  | ✔               |                  | ✔                        |
| Borrar Incidencias                        |                  |                  |                  | ✔                        |
| Editar Incidencias                        |                  | ✔               | ✔               | ✔                        |
| Incidencias Enlazadas                     | ✔                | ✔               |                  | ✔                        |
| Modificar Informador                      | ✔                | ✔               |                  | ✔                        |
| Resolver Incidencias                      | ✔                | ✔               |                  | ✔                        |
| Programar Incidencias                     |                  | ✔               | ✔               | ✔                        |
| Configurar Seguridad de la Incidencia     | ✔                |                  |                  | ✔                        |
| Añadir Comentarios                        | ✔                | ✔               | ✔               | ✔                        |
| Editar Comentarios                        | ✔                | ✔               | ✔               | ✔                        |
| Crear Archivos Adjuntos                   | ✔                | ✔               | ✔               | ✔                        |
| Borrar Archivos Adjuntos                  |                  |                  |                  | ✔                        |
| Trabajar en Incidencias                   |                  | ✔               | ✔               | ✔                        |

---

Este capítulo proporciona una guía completa sobre la configuración de tipos de incidencias, pantallas, y esquemas para el proyecto ANC en Jira. Al seguir estos pasos, los administradores de ANC pueden personalizar el flujo de trabajo y asegurar que los permisos y accesos se asignen adecuadamente a cada rol.

En el **Capítulo 3**, cubriremos la configuración y personalización de flujos de trabajo y automatización para el proyecto ANC.

