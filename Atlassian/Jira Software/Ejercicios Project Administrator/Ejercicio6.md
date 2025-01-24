## **Ejercicio 6 (Nivel Experto): Creación de Roles, Propiedades y Automatización con Envío de Emails**

### **Situación Hipotética**

En tu proyecto de investigación, necesitas definir dos roles principales en Jira Software: **“Investigador Senior”** (encargado de validar o refutar hipótesis) y **“Analista de Observaciones”** (responsable de clasificar y dar seguimiento a las observaciones). Además, en el flujo de trabajo de “Hipótesis”, quieres que solo los “Investigadores Senior” puedan mover la incidencia de “Validada” a “Cerrada”. Una vez cerrada, se desea notificar por correo a todo el equipo, incluyendo campos inteligentes con la información principal de la hipótesis.

Por otro lado, cada vez que una hipótesis cambia a “Validada”, se disparará un **trigger (acción automática)** que asignará la incidencia al “Investigador Senior” que creó la hipótesis, y ejecutará una postfunction (acción posterior) para establecer la resolución. Finalmente, se usará la **automatización (automation)** de Jira para enviar un email con detalles clave, empleando campos inteligentes.

### **Objetivo Principal**

* **Definir roles** en Jira y asignarlos al proyecto.  
* **Configurar propiedades** en el workflow para restringir transiciones a un rol específico.  
* **Agregar triggers, condiciones o criterios, y postfunctions** que automaticen pasos del flujo de trabajo de “Hipótesis”.  
* **Crear una regla de automatización** para el envío de correos, incluyendo **campos inteligentes** en el contenido.

### **Plan de Acción**

1. **Crear roles** en la administración de Jira y asignarlos a tu proyecto.  
2. **Editar el workflow de “Hipótesis”** para incluir propiedades que limiten la transición de “Validada” a “Cerrada” al rol “Investigador Senior”.  
3. **Configurar un trigger** para que, cuando la incidencia pase a “Validada”, se asigne automáticamente al Investigador Senior que la creó y se marque la resolución (via postfunction).  
4. **Crear una regla de automatización** que envíe un correo con información clave (usando campos inteligentes) cuando la hipótesis se cierre.

### **Resolución Paso a Paso**

#### **1\. Creación de Roles y Asignación al Proyecto**

1. **Ir a la administración global de Jira**  
   * Selecciona el ícono de engranaje (Administración) → **System** (sistema) → **Project Roles**.  
2. **Crear roles**  
   * Haz clic en “Add Project Role”.  
   * Crea uno llamado **“Investigador Senior”** y otro **“Analista de Observaciones”**.  
3. **Asignar los roles al proyecto**  
   * Ve a **Project Settings** → **People** (personas) en tu proyecto.  
   * Añade usuarios al rol “Investigador Senior” y al rol “Analista de Observaciones” según corresponda.

#### **2\. Edición del Workflow de “Hipótesis” para Establecer Propiedades**

1. **Ubicar el workflow de “Hipótesis”**  
   * En Administración → **Issues** → **Workflows**, busca el **“Hipótesis Workflow”** creado en Ejercicios anteriores.  
2. **Entrar en modo de edición**  
   * Si el flujo está publicado, crea una copia de borrador para editar o bien edítalo directamente si no está en uso.  
3. **Agregar una transición de “Validada” a “Cerrada”** (si aún no existe)  
   * Asegúrate de tener el estado “Validada” y el estado “Cerrada”.  
   * Añade la transición con un nombre claro (p. ej.: “Cerrar Hipótesis”).  
4. **Configurar propiedades** en la transición  
   * En la pantalla de configuración de la transición, ve a **Properties** (propiedades).  
   * Agrega una propiedad como:  
     * Key: `jira.permission.transition.user.inrole`  
     * Value: `Investigador Senior`  
   * Esto restringe (limita) quién puede ejecutar dicha transición únicamente al rol “Investigador Senior”.

#### **3\. Configurar Trigger, Condición (o Criterio) y Postfunction**

1. **Abrir la transición de “Formulada” (o “En Análisis”) a “Validada”**  
   * En la sección de **Triggers** (disparadores), selecciona uno que corresponda al evento deseado (por ejemplo, “Issue transitioned to Validada”).  
   * Esto se puede configurar para que escuche un cambio de estado específico.  
2. **Añadir una Postfunction** que asigne automáticamente la incidencia  
   * Dentro de la misma transición, ve a “Post Functions” (acciones posteriores).  
   * Añade una postfunction: **Assign to reporter** (asignar al reportero) o **Assign to a specific role** (dependiendo de la configuración).  
   * Si quieres que sea el “Investigador Senior” que creó la incidencia, necesitas verificar que sea el reportero (o un campo personalizado).  
3. **Establecer la resolución**  
   * Añade otra postfunction: “Update Issue Field” → “Resolution” \= “Validada”.  
   * Así, al pasar a “Validada”, se asigna la resolución sin que el usuario deba hacerlo manualmente.

*(Nota: Algunas acciones de triggers y postfunctions pueden requerir apps o configuraciones adicionales en Jira Data Center, como Jira Suite Utilities u otros complementos.)*

#### **4\. Crear una Regla de Automatización con Envío de Emails y Campos Inteligentes**

1. **Ir a la sección de Automation**  
   * Dentro de **Project Settings**, elige **Automation** (si está habilitado para Data Center; en algunos casos, se accede vía un plugin).  
2. **Configurar la regla**  
   * Haz clic en “Create Rule”.  
   * **Trigger (desencadenante):** “Issue transitioned to ‘Cerrada’” (cuando la hipótesis pase a Cerrada).  
3. **Acción de envío de email**  
   * Añade la acción “Send email”.  
   * Selecciona los destinatarios (por ejemplo, el rol “Investigador Senior” o un grupo de email de todo el equipo).  
   * En el **Subject (asunto)**, usa campos inteligentes como:  
     * `Hipótesis {{issue.key}} se ha cerrado`  
   * En el **Body (cuerpo)**, también incluye placeholders (variables) para la información clave:  
     * `La hipótesis con teoría base: {{issue.fields.Teoría de Base}} ha sido cerrada con la resolución: {{issue.fields.resolution.name}}.`  
     * Ajusta los nombres de los campos a los que creaste en ejercicios previos o usa la sintaxis real de tu Jira (ej. `{{issue.fields.customfield_10010}}`).  
4. **Guardar y activar la regla**  
   * Dale un nombre descriptivo a la regla (p. ej., “Notificar cierre de Hipótesis”).  
   * Activa la regla y pruébala moviendo una hipótesis a “Cerrada”.

#### **5\. Validar Todo el Proceso**

1. **Crear una Hipótesis** en tu proyecto.  
2. **Cambiar los estados** hasta llegar a “Validada”. Verifica que, tras la transición, se asigne automáticamente y la resolución se actualice.  
3. **Intentar cerrar la hipótesis** con un usuario que no pertenezca a “Investigador Senior” para confirmar que no tiene permiso.  
4. **Cerrar la hipótesis** como “Investigador Senior”. Comprueba que el correo llega con la información inteligente (placeholders correctos).

---
| [Regresar](./README.md) |