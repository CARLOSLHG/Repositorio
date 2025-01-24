## **PostFunciones (Post-functions)**

Las **Post-functions** se ejecutan después de que se cumple la validación y se confirma la transición. Permiten acciones como actualizar campos, asignar la incidencia, disparar notificaciones, crear subtareas, etc.

| Nombre (Postfunction) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **Assign to Reporter** | Asigna automáticamente la incidencia al usuario que la creó (reportero). | \- Seleccionar “Assign to reporter” en la configuración de la transición. | Al pasar de “Formulada” a “En Análisis”, la incidencia se reasigna al reportero para que haga la investigación inicial. |
| **Update Issue Field** | Modifica un campo de la incidencia (por ejemplo, “Resolution”, “Priority” o un campo personalizado). | \- Seleccionar “Update Issue Field”. \- Indicar el campo y el valor deseado. | Al cerrar una “Hipótesis”, se actualiza “Resolution” a “Validada” o “Refutada” según convenga. |
| **Generate Change History** | Registra un cambio en el historial de la incidencia (común en la mayoría de postfunctions por defecto). | \- Esta suele ser una postfunction nativa por defecto en cada transición (no requiere configuración). | Cada vez que se hace una transición, Jira genera automáticamente una entrada en el historial, indicando el cambio de estado y quién lo hizo. |
| **Trigger a Webhook** | Dispara un webhook (URL externa) para integrarse con otros sistemas tras la transición. | \- Seleccionar “Trigger Webhook”. \- Introducir la URL del servicio externo y los datos a enviar (headers, payload). | Se notifica a una API externa que la “Hipótesis” cambió de estado, pasando datos como `issue.key`, `issue.status`, etc. |
| **Create Subtask** | Crea automáticamente una subtarea (o varias) al completar la transición. | \- Añadir “Create Subtask” y detallar el tipo de subtarea, el resumen y cualquier otro campo requerido. | Al pasar de “Formulada” a “En Análisis”, se genera una subtarea “Análisis de Factores Externos” que debe revisar otro integrante del equipo. |
| **Send Custom Email** (legacy) | Envía un correo personalizado (si existe un plugin o la versión de Jira lo permite) tras la transición. | \- Configurar la dirección o grupo destinatario. \- Definir el asunto y cuerpo del mensaje. \- (A veces requiere apps adicionales, ej. “Jira Suite Utilities”). | Al validar una hipótesis, se envía un correo a “investigadores@empresa.com” con un asunto y cuerpo explicando los pasos siguientes. |
---

### **Notas Relevantes**

* **Conditions vs. Validators**:

  * Con **Conditions**, si no se cumplen, la transición ni siquiera se ve.  
  * Con **Validators**, la transición se ve, pero se rechaza al intentar usarla si la validación falla.  
* **Postfunctions**:

  * Se ejecutan en un **orden específico**. Muchas postfunctions nativas de Jira se ejecutan primero (por ejemplo, crear el historial del cambio). Revisa y ajusta el orden si tu configuración lo requiere.  
  * Algunas postfunctions avanzadas requieren complementos (ej. Jira Suite Utilities, ScriptRunner, etc.).  
* **Sintaxis / Configuración**:

  * En la interfaz de **Workflow** → **Transitions**, encontrarás pestañas separadas para **Conditions**, **Validators** y **Post Functions**.  
  * Cada condición, validación o postfunction suele presentar un formulario o lista de parámetros.
---

