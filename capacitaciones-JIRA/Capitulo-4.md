# Capítulo 4: Automatización y Gestión Avanzada de Flujos de Trabajo en Jira

La automatización en Jira es fundamental para agilizar procesos y reducir tareas manuales, mientras que la configuración avanzada de flujos de trabajo permite gestionar incidencias de manera precisa. En este capítulo, profundizaremos en cómo configurar reglas de automatización efectivas y en el uso de valores inteligentes para personalizar los flujos de trabajo en el proyecto ANC.

---

## 4.1 Introducción a la Automatización en Jira

La automatización en Jira permite la creación de reglas para realizar acciones automáticas en incidencias y proyectos. Estas reglas pueden activarse por eventos específicos, como la creación de una incidencia, cambios de estado, o una fecha de vencimiento.

### Ejemplo Práctico de Automatización en ANC
Para ANC, automatizaremos notificaciones y asignaciones en función de cambios en el estado de las incidencias. Por ejemplo, cuando una incidencia cambia a *Resolución en Curso*, se notificará automáticamente al operador responsable.

---

## 4.2 Configuración de Reglas de Automatización

Las reglas de automatización en Jira se configuran mediante tres componentes clave:

1. **Desencadenador (Trigger)**: El evento que activa la regla.
   - Ejemplo: "Cuando una incidencia es creada" o "Cuando una incidencia se transiciona a *Cerrado*".

2. **Condición**: Un filtro que permite aplicar la regla solo cuando se cumplan ciertos criterios.
   - Ejemplo: "Si el tipo de incidencia es *Incidencia Crítica*" o "Si el impacto es *Alto*".

3. **Acción**: La tarea que Jira ejecuta automáticamente.
   - Ejemplo: "Asignar la incidencia a un técnico específico" o "Enviar un correo de notificación".

---

## 4.3 Ejemplos de Reglas de Automatización en el Proyecto ANC

### Regla 1: Notificación al Técnico de Redes
**Descripción**: Envía una notificación a los técnicos cuando una incidencia crítica es creada.
- **Desencadenador**: Incidencia creada.
- **Condición**: Tipo de incidencia es *Incidencia Crítica*.
- **Acción**: Enviar un correo electrónico a los miembros del grupo *Técnicos de Redes*.

### Regla 2: Asignación Automática de Incidencias por Región
**Descripción**: Asigna incidencias automáticamente al técnico responsable de la región correspondiente.
- **Desencadenador**: Incidencia creada.
- **Condición**: El campo *Región* es "Sur".
- **Acción**: Asignar la incidencia a *Carlos, Técnico Sur*.

### Regla 3: Cerrar Incidencias Resueltas Automáticamente
**Descripción**: Marca automáticamente las incidencias como *Cerradas* después de que pasen 24 horas en estado *Verificación* sin comentarios adicionales.
- **Desencadenador**: Cambio de estado a *Verificación*.
- **Condición**: Sin comentarios en las últimas 24 horas.
- **Acción**: Cambiar el estado a *Cerrado*.

---

## 4.4 Introducción a los Valores Inteligentes

Los valores inteligentes (Smart Values) son elementos dinámicos que se pueden incluir en reglas de automatización para extraer o manipular información de incidencias. Estos valores permiten crear reglas más personalizadas y específicas.

### Lista de Valores Inteligentes Comunes

| Valor Inteligente       | Descripción                                               | Ejemplo de Uso                       |
|-------------------------|-----------------------------------------------------------|--------------------------------------|
| `{{issue.summary}}`     | Título o resumen de la incidencia                          | Enviar un mensaje que incluya el título |
| `{{issue.status.name}}` | Estado actual de la incidencia                             | Notificar si la incidencia está en *Verificación* |
| `{{issue.reporter}}`    | Informador de la incidencia                                | Enviar notificación al informador    |
| `{{issue.created}}`     | Fecha de creación de la incidencia                         | Agregar la fecha en un comentario    |
| `{{issue.assignee}}`    | Usuario asignado a la incidencia                           | Notificar al técnico asignado        |
| `{{issue.priority.name}}`| Prioridad de la incidencia                                | Incluir la prioridad en una alerta   |
| `{{issue.comments.last.body}}` | Último comentario agregado a la incidencia           | Mostrar el último comentario en una notificación |

---

## 4.5 Configuración de Flujos de Trabajo Avanzados

Además de la estructura básica de estados y transiciones, los flujos de trabajo en Jira permiten configurar condiciones avanzadas, validaciones y funciones posteriores, esenciales para el proyecto ANC.

### Ejemplo de Flujo de Trabajo Personalizado para ANC
El siguiente flujo de trabajo se diseñó para el equipo de redes de ANC:

- **Estados**: 
  - *Backlog*: La incidencia se encuentra en espera.
  - *En Progreso*: La incidencia está siendo revisada y diagnosticada.
  - *Esperando Revisión*: La incidencia ha sido resuelta y está en espera de revisión.
  - *Cerrado*: La incidencia se da por finalizada.

- **Transiciones**:
  - **De *Backlog* a *En Progreso***: La incidencia es asignada y se comienza el diagnóstico.
  - **De *En Progreso* a *Esperando Revisión***: La incidencia se ha resuelto y se envía para revisión.
  - **De *Esperando Revisión* a *Cerrado***: La incidencia se cierra al verificar la resolución.

### Condiciones, Validaciones y Funciones Posteriores

1. **Condiciones**:
   - Solo los técnicos de redes pueden mover una incidencia de *Backlog* a *En Progreso*.

2. **Validaciones**:
   - Antes de pasar una incidencia a *Esperando Revisión*, el campo *Impacto* debe estar lleno y se debe asignar un técnico responsable.

3. **Funciones Posteriores**:
   - Cuando una incidencia se cierra, se dispara un evento para enviar una notificación a los supervisores y técnicos de redes.

---

## 4.6 Mejores Prácticas en la Automatización de Jira

1. **Mantén Reglas Simples**: Las reglas complejas pueden ser difíciles de gestionar y solucionar en caso de errores. Siempre que sea posible, usa reglas simples y específicas.
2. **Monitorea las Reglas Activas**: Asegúrate de revisar regularmente las reglas de automatización activas para verificar que estén funcionando correctamente.
3. **Utiliza Valores Inteligentes para Personalizar Notificaciones**: Los valores inteligentes permiten incluir detalles específicos en las notificaciones, haciéndolas más útiles para los destinatarios.

### Ejemplo en ANC
Para ANC, configuramos reglas que incluyen detalles sobre la región y el impacto de la incidencia. Esto permite que los mensajes de notificación sean más precisos y prioricen los problemas críticos.

---

Este capítulo proporciona las bases para configurar la automatización y los flujos de trabajo avanzados en Jira para proyectos como ANC. En el **Capítulo 5**, abordaremos la configuración y uso de gadgets y paneles (dashboards) para visualizar datos clave de las incidencias y el progreso del proyecto.

