## **Tabla 7: Campos Inteligentes (Smart Values) más Usados**

Estos **smart values (valores inteligentes)** se utilizan en reglas de automatización (Automation). Permiten incluir información dinámica de la incidencia (tarea) en acciones como envío de correos, actualizaciones de campos, comentarios, etc.

| Nombre | Descripción | Sintaxis | Ejemplo |
| ----- | ----- | ----- | ----- |
| issue.key | Devuelve la clave (identificador) de la incidencia. | "{{issue.key}}" | **Uso en correo:** “La incidencia {{issue.key}} se ha cerrado”. Si la clave es INV-123, se mostrará “La incidencia INV-123 se ha cerrado”. |
| issue.summary | Devuelve el resumen (título) de la incidencia. | ({{issue.summary}}) | **Uso en correo:** “Título: {{issue.summary}}”. Si el resumen es “Analizar hipótesis inicial”, se mostrará “Título: Analizar hipótesis inicial”. |
| issue.description | Muestra la descripción completa de la incidencia. | {{issue.description}} | **Uso en correo:** “Descripción: {{issue.description}}”. Incluye todo el texto que el usuario haya escrito al crear la incidencia. |
| issue.fields<nombreDelCampo> | Retorna el valor de un campo personalizado. | {{issue.fields.customfield_XXXXX}} *(o usando el nombre si Jira lo soporta)* | **Uso en correo:** Teoría de Base: {{issue.fields.Teoría de Base}} Si el campo se llama con un ID customfield_10002, usarías {{issue.fields.customfield_10002}}. |
| issue.reporter.displayName | Devuelve el nombre visible del reportero (persona que creó la incidencia). | {{issue.reporter.displayName}} | **Uso en correo:** “Reportado por: {{issue.reporter.displayName}}”. Si el usuario es “Carlos Pérez”, mostrará “Reportado por: Carlos Pérez”. |
| issue.assignee.displayName | Muestra el nombre del usuario asignado a la incidencia. | {{issue.assignee.displayName}} | **Uso en correo:** “Asignado a: {{issue.assignee.displayName}}”. |
| issue.status.name | Indica el nombre del estado actual de la incidencia. | {{issue.status.name}} | **Uso en correo:** “Estado actual: {{issue.status.name}}”. Mostrará, por ejemplo, “Formulada”, “Validada”, “Cerrada”, etc. |
| now (ahora) | Retorna la fecha y hora actual según la configuración de Jira. | {{now}} | **Uso en correo:** “Fecha de notificación: {{now}}”. Es útil para sellar con marca de tiempo. |
| triggerIssue | Referencia la incidencia que desencadenó (activó) la regla. | {{triggerIssue.key}} (para la clave) | **Uso en escenarios de subtareas**: Si la acción ocurre en una subtarea, triggerIssue se refiere a la incidencia padre. |
| issue.comments.last.body (comentarios) | Retorna el contenido del último comentario. | {{issue.comments.last.body}} | **Uso en correo:** “Último comentario: {{issue.comments.last.body}}”. |

*(Recuerda que si tienes campos personalizados con nombres no estándar, puedes usar {{issue.fields["NombreExactoDelCampo"]}} o el customfield_XXXXX correspondiente.)*

---
| [Regresar](./README.md) |