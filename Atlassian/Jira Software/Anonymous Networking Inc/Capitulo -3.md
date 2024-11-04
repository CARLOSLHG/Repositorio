# Capítulo 3: Configuración y Personalización de Proyectos en Jira

Este capítulo proporciona una guía completa sobre cómo configurar y personalizar un proyecto en Jira, centrándose en las necesidades específicas de la empresa ficticia **Anonymous Network Company (ANC)**. Cada sección cubre un aspecto esencial, desde el flujo de trabajo y roles, hasta los permisos detallados y campos personalizados que se usarán en el proyecto.

---

## 3.1 Creación de un Proyecto en Jira

### Pasos para Crear un Proyecto
1. **Inicia Sesión en Jira Cloud o Data Center**: Asegúrate de tener permisos de administrador para crear proyectos.
2. **Selecciona la Opción "Crear Proyecto"**: En la barra de menú superior, selecciona “Proyectos” y luego “Crear proyecto”.
3. **Escoge una Plantilla de Proyecto**:
   - **Scrum**: Ideal para equipos ágiles que trabajan en sprints.
   - **Kanban**: Diseñado para equipos con flujos de trabajo continuos, ideal para el Proyecto ANC.
4. **Configura el Nombre y Clave del Proyecto**: Define un nombre claro y una clave breve que identifique el proyecto.
5. **Asignación de Permisos y Roles Iniciales**: Configura permisos básicos y roles para los miembros clave.

### Ejemplo en el Proyecto ANC
Para el proyecto **ANC (Anonymous Network Company)**, seleccionaremos la plantilla **Kanban**, ya que el proyecto requiere un flujo de trabajo continuo para la supervisión y resolución de incidencias de red.

---

## 3.2 Configuración de Flujos de Trabajo (Workflows)

El flujo de trabajo en Jira define el ciclo de vida de una incidencia desde su creación hasta su resolución. Un flujo de trabajo personalizado es crucial para proyectos con necesidades específicas, como ANC, donde la gestión de incidencias de red requiere pasos controlados y puntos de aprobación específicos.

### Flujo de Trabajo Personalizado para el Proyecto ANC
El flujo de trabajo del proyecto ANC incluye los siguientes estados y transiciones:

- **Estados**:
  - **Identificación**: La incidencia es identificada y se clasifica según su impacto.
  - **Diagnóstico**: Un técnico de redes evalúa la situación para determinar la solución adecuada.
  - **Resolución en Curso**: La incidencia está en proceso de resolución.
  - **Verificación**: Un operador verifica que la incidencia se haya resuelto correctamente.
  - **Cerrado**: La incidencia se marca como completada y se archiva.

- **Transiciones**:
  - **De "Identificación" a "Diagnóstico"**: Activada por un técnico de redes, luego de revisar el impacto de la incidencia.
  - **De "Diagnóstico" a "Resolución en Curso"**: Activada una vez que se determina el plan de acción.
  - **De "Resolución en Curso" a "Verificación"**: El técnico indica que la incidencia ha sido resuelta y debe verificarse.
  - **De "Verificación" a "Cerrado"**: El operador confirma la resolución y cierra la incidencia.

### Condiciones, Validaciones y Funciones Posteriores
- **Condiciones**: Solo los técnicos de redes pueden realizar la transición de "Identificación" a "Diagnóstico".
- **Validaciones**: Validación de campos críticos antes de la transición a "Verificación" (e.g., *Tipo de Intervención* y *Nivel de Impacto*).
- **Funciones Posteriores (Post-Functions)**: Al cerrar una incidencia, se dispara una función que notifica a los administradores y elimina la incidencia de la columna "Listo" en el tablero.

---

## 3.3 Configuración de Permisos de Proyecto

Cada rol en el proyecto ANC tiene permisos específicos que se ajustan a sus responsabilidades. Los permisos en Jira se asignan de forma granular para asegurar que cada usuario tenga acceso solo a las funcionalidades necesarias para su rol.

### Lista Completa de Permisos y Asignación de Roles
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

## 3.4 Campos Personalizados

Los campos personalizados son esenciales en el proyecto ANC para registrar información específica de las incidencias relacionadas con redes. A continuación, se detallan los campos y sus configuraciones.

### Lista de Campos Personalizados
| Campo                | Tipo              | Descripción                                                              | Opciones                           |
|----------------------|-------------------|--------------------------------------------------------------------------|------------------------------------|
| Tipo de Intervención | Selección         | Especifica el tipo de trabajo realizado                                  | Mantenimiento, Instalación, Reparación |
| Nivel de Impacto     | Selección         | Clasifica la criticidad de la incidencia                                 | Alto, Medio, Bajo                 |
| Región               | Selección         | Indica la zona geográfica donde se presenta la incidencia                | Norte, Centro, Sur                |
| Fecha de Resolución  | Fecha             | Fecha estimada para resolver la incidencia                               | N/A                                |
| Comentarios Técnicos | Texto             | Notas detalladas del técnico sobre el problema                           | N/A                                |

#### Ejemplo de Uso en el Proyecto ANC
Cada incidencia de red incluirá estos campos para garantizar que los técnicos y operadores tengan toda la información necesaria para evaluar y resolver problemas de manera eficiente.

---

## 3.5 Configuración de Roles y Grupos

Los roles y grupos permiten organizar a los usuarios y asignar permisos de manera eficiente en Jira. A continuación, se detallan los roles y sus funciones en el proyecto ANC.

### Principales Roles en el Proyecto ANC
- **Inspector General**: Supervisa el estado general del proyecto y las incidencias críticas.
- **Técnico de Redes**: Responsable de diagnosticar y resolver incidencias técnicas.
- **Operador General**: Monitorea y asigna incidencias en el sistema.
- **Administrador de Proyecto**: Configura y gestiona las especificaciones del proyecto, incluyendo flujos de trabajo y permisos.

---

Este capítulo proporciona una guía exhaustiva para configurar y personalizar proyectos en Jira de acuerdo con los requerimientos de ANC. En el **Capítulo 4**, se abordarán las herramientas avanzadas de flujos de trabajo y automatización para optimizar los procesos en el proyecto.

