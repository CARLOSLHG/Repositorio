## Jira Software

# Administrador de Proyectos 

# EJERCICIOS

## 

## **Ejercicio 1 (Nivel Básico): Creación y Configuración de un Proyecto en Jira Software Data Center**

### **Situación Hipotética**

La empresa “DataTools S.A.” requiere iniciar un nuevo proyecto de software. Te han pedido que configures un proyecto en Jira Software Data Center para comenzar a gestionar (administrar) las incidencias (tareas) de este desarrollo.

### **Objetivo Principal**

Crear un proyecto de Jira Software Data Center con una configuración mínima para que el equipo pueda comenzar a registrar sus incidencias de inmediato.

### **Plan de Acción**

1. **Acceder a la sección de administración (configuración)** de Jira.  
2. **Crear un nuevo proyecto** de tipo “Software”.  
3. **Asignar un nombre y clave** adecuados al proyecto.  
4. **Verificar la configuración inicial** (flujo de trabajo, pantallas y permisos) que se asigna por defecto.

### **Resolución Paso a Paso**

1. **Ingresar a la administración de Jira**  
   * Desde tu panel principal, haz clic en el ícono de engranaje o busca la opción “Administration”.  
2. **Crear el proyecto**  
   * Dentro de “Projects”, selecciona “Create project”.  
   * Elige la opción “Software” (esta plantilla (modelo) incluye las funcionalidades típicas para desarrollo).  
   * Asigna un nombre (por ejemplo, “Proyecto Básico”) y define la clave (abreviatura).  
3. **Seleccionar el tipo de plantilla**  
   * Puedes escoger entre “Scrum” o “Kanban” según la forma de trabajo de tu equipo.  
4. **Confirmar la configuración por defecto**  
   * Revisa que se haya asignado un flujo de trabajo, un esquema (conjunto) de pantallas genérico y un esquema de permisos estándar.  
   * Verifica que esté habilitado un único esquema de pantallas (usualmente el “Default Screen Scheme”).  
5. **Validar el proyecto**  
   * Crea una incidencia de prueba y verifica que puedas moverla a través de los estados “To Do”, “In Progress” y “Done”.

## **Ejercicio 2 (Nivel Intermedio): Creación y Asignación de Tipos de Incidencia (Issue Types) y Esquema de Tipos de Incidencia**

### **Situación Hipotética**

Te encuentras trabajando en un proyecto de investigación dentro de tu organización. El equipo solicita manejar dos tipos de incidencias nuevas para agilizar el seguimiento: **“Hipótesis”** y **“Observación”**.  
 El objetivo es separar cada posible idea o planteamiento (“Hipótesis”) de los hallazgos o registros de información (“Observación”) que surjan durante la investigación.

### **Objetivo Principal**

Configurar y asignar **nuevos tipos de incidencia** (“Hipótesis” y “Observación”) a un **Issue Type Scheme (esquema de tipos de incidencia)** y asociarlo al proyecto creado en el **Ejercicio 1**.

### **Plan de Acción**

1. **Revisar los tipos de incidencia existentes** en la administración.  
2. **Crear los nuevos tipos de incidencia** (“Hipótesis” y “Observación”).  
3. **Crear o editar un esquema** (Issue Type Scheme) que agrupe los tipos de incidencia requeridos.  
4. **Asociar el esquema** al proyecto creado en el Ejercicio 1\.

### **Resolución Paso a Paso**

1. **Acceder a la administración de Jira Software Data Center**

   * Desde el menú principal, selecciona el ícono de engranaje o “Administration” para entrar a la configuración.  
2. **Revisar los tipos de incidencia existentes**

   * Dentro de **Issues** → **Issue Types**, identifica los tipos estándar (“Task”, “Sub-task”, etc.).  
   * Confirma que “Hipótesis” y “Observación” aún no existen.  
3. **Crear los nuevos tipos de incidencia**

   * Haz clic en “Add Issue Type”.  
   * En “Name” (nombre), escribe **“Hipótesis”**. Indica si es de tipo estándar o subtarea (elige estándar, por lo general).  
   * Repite el proceso para **“Observación”**.  
   * Verifica que ambos aparezcan en la lista general de tipos de incidencia.  
4. **Crear o editar un esquema de tipos de incidencia (Issue Type Scheme)**

   * Dentro de **Issue Types**, busca la sección “Issue Type Schemes”.  
   * Crea uno nuevo con un nombre acorde, por ejemplo, **“Esquema de Investigación”**, o edita uno existente para que incluya:  
     * “Task” (si lo consideras necesario),  
     * “Sub-task” (para subdividir tareas, opcional),  
     * “Hipótesis”,  
     * “Observación”.  
   * Ajusta el orden de prioridad (cuál aparece primero al crear una incidencia).  
5. **Asociar el esquema de tipos de incidencia al proyecto**

   * Regresa a la lista de esquemas (Issue Type Schemes) y localiza “Esquema de Investigación” (o como lo hayas nombrado).  
   * Selecciona “Associate” (asociar) → Elige el **proyecto** que creaste en el Ejercicio 1\.  
   * Confirma la asociación.  
6. **Validar la configuración**

   * Ve al proyecto.  
   * Crea una incidencia de prueba y asegúrate de que los tipos “Hipótesis” y “Observación” aparezcan en el menú desplegable.  
   * Verifica que puedas asignar y guardar correctamente ambos tipos.

## **Ejercicio 3 (Nivel Intermedio): Creación y Asignación de Pantallas (Screens) y Esquemas de Pantallas a un Proyecto**

### **Situación Hipotética**

En el proyecto de investigación, se decidió que las incidencias “Hipótesis” y “Observación” requieren pantallas específicas para la **creación, edición y visualización** (por ejemplo, con distintos campos o disposición). Deseas separar y administrar mejor qué campos aparecen al crear, editar y ver cada incidencia.

### **Objetivo Principal**

Crear pantallas y asignarlas mediante esquemas (screen schemes) para que, al crear, editar o ver una incidencia “Hipótesis” u “Observación”, se muestren los campos y diseño apropiados.

### **Plan de Acción**

1. **Crear pantallas (screens)**:

   * Una pantalla para “Create” (crear),  
   * Una para “Edit” (editar),  
   * Una para “View” (visualizar).  
2. **Configurar un Screen Scheme (esquema de pantalla)** que relacione cada acción (crear, editar, ver) con la pantalla adecuada.

3. **Crear un Issue Type Screen Scheme (esquema de pantallas por tipo de incidencia)** para asignar este Screen Scheme a “Hipótesis” y “Observación”.

4. **Asociar el Issue Type Screen Scheme** al proyecto creado en los ejercicios anteriores.

### **Resolución Paso a Paso**

1. **Acceder a la administración de Jira Software Data Center**

   * Desde la barra de navegación principal, selecciona el ícono de engranaje o “Administration (ajustes)” → “Issues”.  
2. **Crear las pantallas (screens)**

   * Ve a **Screens** en el menú lateral.  
   * Pulsa en “Add Screen”. Asigna un nombre, por ejemplo:  
     * “Investigación Create Screen” (pantalla para creación),  
     * “Investigación Edit Screen” (pantalla para edición),  
     * “Investigación View Screen” (pantalla para visualización).  
   * (Opcional) Añade algún detalle en la descripción.  
3. **Agregar campos base en cada pantalla**

   * Luego de crear cada pantalla, presiona “Configure” (configurar) para agregar los campos estándar que quieras mostrar (p. ej. Summary, Description, etc.).  
   * Por ahora, no incluimos campos personalizados (eso vendrá en el siguiente ejercicio).  
   * Ajusta el orden de los campos según la preferencia del equipo de investigación.  
4. **Crear un Screen Scheme (esquema de pantalla)**

   * Regresa al menú de **Screens** y busca la subsección “Screen Schemes”.  
   * Crea un nuevo Screen Scheme: “Investigación Screen Scheme”.  
   * Dentro de este Screen Scheme, define:  
     * **Create**: se usará “Investigación Create Screen”.  
     * **Edit**: se usará “Investigación Edit Screen”.  
     * **View**: se usará “Investigación View Screen”.  
5. **Crear un Issue Type Screen Scheme (esquema de pantallas por tipo de incidencia)**

   * En el mismo apartado de “Screens”, ve a “Issue Type Screen Schemes”.  
   * Crea uno nuevo, por ejemplo: “Investigación Issue Type Screen Scheme”.  
   * Configura que para las incidencias de tipo **“Hipótesis”** y **“Observación”** se aplique el “Investigación Screen Scheme” que acabas de crear.  
   * Para los demás tipos (por ejemplo, “Task” u otros), puedes mantener el Screen Scheme por defecto o asignarle el mismo, según tu preferencia.  
6. **Asociar el Issue Type Screen Scheme al proyecto**

   * En “Issue Type Screen Schemes”, localiza “Investigación Issue Type Screen Scheme”.  
   * Selecciona “Associate” (asociar) → Elige el proyecto que creaste en los ejercicios anteriores.  
   * Sigue los pasos de confirmación.  
7. **Validar la configuración**

   * Regresa al proyecto.  
   * Crea un nuevo “Hipótesis”. Observa que, al crearlo, aparezca la pantalla “Investigación Create Screen”.  
   * Edita la misma incidencia y verifica que aparezca la pantalla “Investigación Edit Screen”.  
   * Visualiza la incidencia y confirma que se muestre la pantalla “Investigación View Screen”.  
   * Realiza la misma prueba con el tipo “Observación”.

## **Ejercicio 4 (Nivel Intermedio-Avanzado): Creación de Campos Personalizados y Asignación a Pantallas**

### **Situación Hipotética**

En tu proyecto de investigación, los equipos necesitan capturar información adicional para cada tipo de incidencia (“Hipótesis” y “Observación”). Por ejemplo, la “Hipótesis” podría requerir un campo para detallar la **Teoría de Base** y otro para el **Método de Validación**, mientras que “Observación” podría necesitar un campo para **Contexto de Observación** y otro para **Conclusiones Preliminares**.

### **Objetivo Principal**

Crear campos personalizados (Custom Fields) y agregarlos a las pantallas (“Create”, “Edit” y “View”) de los tipos de incidencia “Hipótesis” y “Observación”.

### **Plan de Acción**

1. **Identificar los campos** a crear (por ejemplo, “Teoría de Base” y “Método de Validación” para “Hipótesis”; “Contexto de Observación” y “Conclusiones Preliminares” para “Observación”).  
2. **Configurar los campos personalizados** en la administración de Jira.  
3. **Asignar los campos a las pantallas** correspondientes mediante la sección de **Screens** o en el proceso de creación del campo.  
4. **Validar** que los campos aparezcan correctamente al crear, editar y ver cada incidencia según su tipo.

### **Resolución Paso a Paso**

1. **Acceder a la administración de Jira Software Data Center**

   * Desde el menú principal, haz clic en el ícono de engranaje → “Issues” → “Custom fields”.  
2. **Crear campos personalizados**

   * Selecciona “Add custom field”.  
   * Elige un tipo de campo (por ejemplo, “Text Field (multi-line)” si necesitas varias líneas, o “Text Field (single line)” si es breve).  
   * Asigna un nombre y descripción. Por ejemplo:  
     * **Campo 1 (para Hipótesis):** “Teoría de Base”  
     * **Campo 2 (para Hipótesis):** “Método de Validación”  
     * **Campo 1 (para Observación):** “Contexto de Observación”  
     * **Campo 2 (para Observación):** “Conclusiones Preliminares”  
3. **Configurar la visibilidad y los tipos de incidencia**

   * Durante la creación del custom field, Jira te preguntará a qué pantallas y a qué esquema de tipos de incidencia lo quieres asociar.  
   * Marca las pantallas correspondientes (p. ej. “Investigación Create Screen”, “Investigación Edit Screen”, “Investigación View Screen”).  
   * Si deseas que un campo aparezca solo en un tipo de incidencia (“Hipótesis” o “Observación”), luego podrás ajustarlo en la configuración de pantallas.  
4. **Verificar (revisar) en las pantallas**

   * Si al crear el campo no seleccionaste las pantallas, ve a **Issues** → **Screens** y localiza cada pantalla (“Investigación Create Screen”, etc.).  
   * Pulsa en “Configure” → “Add field”. Busca el campo recién creado en la lista y añádelo a la pantalla.  
   * **Tip**: Si quieres que un campo aparezca únicamente cuando la incidencia es “Hipótesis”, asegúrate de que tu Screen Scheme esté diferenciado por tipo de incidencia. De lo contrario, este campo se verá en cualquier tipo que use la misma pantalla.  
5. **Validar la configuración**

   * Regresa al proyecto y crea una nueva incidencia de tipo “Hipótesis”. Verifica que se muestren los campos “Teoría de Base” y “Método de Validación” en la pantalla de creación.  
   * Edita la incidencia y revisa que dichos campos aparezcan en la pantalla de edición.  
   * Repite el proceso para “Observación” (con “Contexto de Observación” y “Conclusiones Preliminares”).  
   * Visualiza cada incidencia y confirma que los campos estén accesibles en la pantalla de visualización.

## **Ejercicio 5 (Nivel Avanzado): Creación y Asignación de Workflows Personalizados a un Proyecto**

### **Situación Hipotética**

En la investigación, el ciclo de vida de una **Hipótesis** es distinto del de una **Observación**. Por ejemplo, una “Hipótesis” puede pasar por los estados **“Formulada”**, **“En Análisis”**, **“Validada”** o **“Refutada”**; mientras que una “Observación” puede transitar entre **“Recopilada”**, **“Clasificada”** y **“Integrada al Informe”**.  
 La idea es que cada tipo de incidencia tenga su propio flujo de trabajo que refleje esos pasos.

### **Objetivo Principal**

Configurar **workflows (flujos de trabajo)** separados para “Hipótesis” y “Observación”, y asignarlos al proyecto mediante un **Workflow Scheme** (esquema de flujo de trabajo).

### **Plan de Acción**

1. **Crear o copiar** un flujo de trabajo base para “Hipótesis”.  
2. **Diseñar los estados y transiciones** específicos que requiere la “Hipótesis”.  
3. **Repetir el proceso** para “Observación”.  
4. **Crear o editar** un **Workflow Scheme** que asocie cada flujo de trabajo con su tipo de incidencia.  
5. **Asignar** el Workflow Scheme al proyecto.

### **Resolución Paso a Paso**

1. **Acceder a la administración de Jira**

   * En el menú principal, haz clic en el ícono de engranaje → “Issues” → “Workflows”.  
2. **Crear (o clonar) un Workflow para “Hipótesis”**

   * Haz clic en “Add workflow” o “Copy” si deseas partir de un flujo de trabajo existente.  
   * Nombra el flujo, por ejemplo: **“Hipótesis Workflow”**.  
   * En la vista de diagrama, agrega estados (p. ej., “Formulada”, “En Análisis”, “Validada”, “Refutada”) y traza transiciones (flechas) lógicas entre esos estados.  
   * Asigna transiciones con nombres claros (por ejemplo, “Iniciar análisis” para pasar de “Formulada” a “En Análisis”).  
   * Publica los cambios (o guarda el borrador) cuando estés satisfecho.  
3. **Crear otro Workflow para “Observación”**

   * Repite los pasos anteriores.  
   * Nombra el flujo, por ejemplo: **“Observación Workflow”**.  
   * Define estados como “Recopilada”, “Clasificada”, “Integrada al Informe”.  
   * Configura las transiciones con nombres significativos (“Clasificar observación”, “Integrar a informe”, etc.).  
   * Publica el flujo.  
4. **Crear o editar un Workflow Scheme (esquema de flujo de trabajo)**

   * Dentro de **Workflows**, busca la sección “Workflow Schemes”.  
   * Crea uno nuevo, por ejemplo: **“Esquema de Flujos de Investigación”**, o edita un esquema ya existente.  
   * Asocia el tipo de incidencia **“Hipótesis”** con el “Hipótesis Workflow”.  
   * Asocia el tipo de incidencia **“Observación”** con el “Observación Workflow”.  
   * Los demás tipos de incidencia pueden mantenerse con un flujo de trabajo genérico o el que definas.  
5. **Asignar el Workflow Scheme al proyecto**

   * En la lista de “Workflow Schemes”, localiza tu nuevo esquema (o el que has editado).  
   * Pulsa “Associate” → Elige el proyecto que creaste en los ejercicios anteriores.  
   * Sigue el asistente. Si tu proyecto ya tiene incidencias existentes, Jira podría mostrar un asistente de migración para ajustar los estados de las incidencias al nuevo flujo.  
6. **Validar la configuración**

   * Regresa al proyecto y crea un nuevo “Hipótesis”. Verifica que aparezcan los estados “Formulada”, “En Análisis”, “Validada”, “Refutada” en el panel de la incidencia.  
   * Realiza las transiciones para confirmar que funcionan y que los estados cambian correctamente.  
   * Repite con una “Observación”, comprobando sus estados y transiciones únicas.

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

