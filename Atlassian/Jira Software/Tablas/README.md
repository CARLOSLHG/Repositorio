## Jira Software

# TABLAS DE REFERENCIA

## **Tabla 1: Propiedades de Workflow más Usadas**

Estas propiedades se añaden generalmente en la configuración de una transición (o de todo el workflow) para personalizar comportamientos como permisos, visibilidad (acceso) o incluso la posición (orden) de un botón en la **opsbar (barra de acciones de la incidencia)**.

| Nombre | Descripción | Sintaxis | Ejemplo |
| ----- | ----- | ----- | ----- |
| `jira.permission.transition.user.inrole` | Restringe (limita) la transición a usuarios que pertenezcan a un rol específico de proyecto. | Nombre de la propiedad: `jira.permission.transition.user.inrole`Valor: `<NombreRol>` | **Propiedad:** `jira.permission.transition.user.inrole` **Valor:** `Investigador Senior` Solo quienes tengan el rol (papel) *Investigador Senior* podrán ejecutar esa transición. |
| `jira.permission.transition.user.ingroup` | Restringe la transición a usuarios que formen parte de un grupo específico de Jira. | Nombre de la propiedad: `jira.permission.transition.user.ingroup`Valor: `<NombreGrupo>` | **Propiedad:** `jira.permission.transition.user.ingroup` **Valor:** `jira-administrators` Solo el grupo *jira-administrators* podrá ejecutar esa transición. |
| `opsbar-sequence` (orden en la barra de acciones) | Determina la posición de la transición (botón de cambio de estado) en la barra superior de la incidencia. Un valor más bajo aparece más a la izquierda; uno más alto, más a la derecha. | Nombre de la propiedad: `opsbar-sequence` Valor (número entero) | **Propiedad:** `opsbar-sequence` **Valor:** `10` El botón de esa transición aparecerá en la posición 10 de la barra de acciones, posiblemente a la izquierda de transiciones con valores mayores. |
| `jira.i18n.title` | Personaliza el título que aparece en la transición. Se usa para localización (traducciones) o para personalizar el texto que se muestra. | Nombre de la propiedad: `jira.i18n.title` Valor: `texto` | **Propiedad:** `jira.i18n.title` **Valor:** `transition.close.hypothesis.title` (Podrías vincularlo con un archivo de traducciones para que muestre el texto “Cerrar Hipótesis” en diferentes idiomas, dependiendo la config. de Jira). |
| `jira.i18n.description` | Permite describir la transición (o estado) de forma más extensa, también para localización. | Nombre de la propiedad: `jira.i18n.description` Valor: `texto` | **Propiedad:** `jira.i18n.description` **Valor:** `transition.close.hypothesis.desc` La descripción podría verse como "Use esta transición para finalizar la hipótesis", en la interfaz según el idioma configurado. |
| `jira.permission.comment.user.inrole` | Limita la capacidad de añadir comentarios a los usuarios que pertenecen a un rol determinado. | Nombre de la propiedad: `jira.permission.comment.user.inrole`Valor: `<NombreRol>` | **Propiedad:** `jira.permission.comment.user.inrole` **Valor:** `Analista de Observaciones` Solo quienes tengan el rol *Analista de Observaciones* podrán comentar la incidencia. |
---

## **Tabla 2: Triggers**

Estos triggers son especialmente relevantes cuando configuras **Automations** (Reglas de automatización) o si utilizas la integración de **Jira Software** con herramientas de desarrollo (p. ej., Bitbucket).

| Nombre (Trigger) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **Issue Created** | Se activa cuando se crea una nueva incidencia (tarea, bug, historia, etc.). | \- En **Project Settings** → **Automation** → **Create Rule**. \- Seleccionar “Issue Created” como disparador. | **Uso típico:** Enviar un correo de bienvenida o asignar automáticamente la incidencia al creador, nada más se registra un nuevo ticket. |
| **Issue Transitioned** | Se dispara cuando una incidencia cambia de un estado a otro. | \- En **Automation**, elige “Issue Transitioned”. \- Puedes especificar desde qué estado y a qué estado, o dejarlo genérico. | **Uso típico:** Cuando un ticket pasa a “En Progreso”, notifica al responsable del proyecto o actualiza un campo de fecha de inicio. |
| **Field Value Changed** | Ocurre cuando un campo específico (por ejemplo, “Asignee”, “Priority”, “Teoría de Base”) cambia de valor. | \- Seleccionar “Field Value Changed”. \- Definir el campo a monitorear (p. ej., “Priority”). | **Uso típico:** Si la prioridad se cambia a “Crítica”, se envía una alerta inmediata al equipo de seguridad o al gestor del proyecto. |
| **Scheduled** (Regla Programada) | Permite ejecutar una acción con una periodicidad fija (horaria, diaria, semanal, etc.). | \- En “Automation”, seleccionar “Scheduled”. \- Definir la cronología (por ej., cada día a las 8:00 AM). | **Uso típico:** Buscar incidencias en estado “Pendiente” por más de X días y notificar, o cerrar automáticamente tickets antiguos sin actividad después de un tiempo determinado. |
| **Pull Request Merged** (Bitbucket/GitHub) | Se activa cuando se fusiona (merge) un Pull Request en una rama principal. | \- Requiere la integración de Jira con Bitbucket/GitHub. \- En **Automation** (si está disponible), buscar “Pull Request Merged” o “Development Trigger”. | **Uso típico:** Al fusionar un Pull Request relacionado a la incidencia (con la clave en el mensaje del commit), se transiciona automáticamente la incidencia a “Listo para Validar” o “Done”. |
| **Commit Created** (Bitbucket/GitHub) | Ocurre cuando alguien hace un commit en el repositorio con el número (clave) de la incidencia en el mensaje de commit. | \- Requiere integración con Bitbucket/GitHub. \- Configurar un trigger “Commit created” o “Branch created”. | **Uso típico:** Cuando se detecta un commit con la clave “INVEST-123”, se añade un comentario automático en la incidencia con un enlace al commit, o se cambia el estado a “En Desarrollo”. |
| **Build Succeeded / Failed** (CI/CD) | Se activa al concluir un build (construcción) o pipeline de integración continua con éxito o fallo. | \- Integrar Jira con herramientas CI/CD (Bamboo, Jenkins, GitLab, etc.). \- Configurar “Build succeeded/failed” si la app de Automation o plugin lo soporta. | **Uso típico:** Marcar un ticket como “En Test” cuando el build pasa con éxito, o notificar al equipo si el build falla, adjuntando el log (registro) correspondiente. |

### **Notas Importantes sobre Triggers**

* **Disponibilidad de Triggers**:  
  * Algunos triggers (Pull Request, Build, Commit) requieren la integración con Bitbucket, GitHub u otras herramientas de CI/CD, y dependerán de si Jira Data Center o la app de Automation instalada tiene soporte para ellos.  
* **Personalización**:  
  * En la configuración de cada trigger, puedes restringir las condiciones (por ejemplo, solo si la incidencia pertenece a cierto proyecto o cierto tipo).  
  * También puedes combinar triggers con **Conditions** (condiciones) y **Validators** en la propia regla de Automation, para afinar las circunstancias en que se ejecuta la acción.  
* **Secuencia**:  
  * Después de un trigger, puedes encadenar acciones como enviar un correo, actualizar un campo, hacer un comentario, crear subtareas, etc.
---

## **Tabla 3: Tabla de Condiciones (Conditions)**

Estos criterios determinan si una transición (cambio de estado) está disponible para el usuario actual, dependiendo de factores como roles, grupos, campos, etc. Si la **Condition** no se cumple, el botón de transición no se muestra.

| Nombre (Condition) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **User Is in Project Role** | La transición solo estará disponible si el usuario que la ejecuta pertenece a un rol (papel) específico dentro del proyecto. | \- Seleccionar “User In Project Role” en la configuración de la transición. \- Indicar el rol (p. ej. “Investigador Senior”). | Solo si el usuario pertenece al rol “Investigador Senior”, verá el botón de transición. |
| **User Is in Group** | Permite la transición únicamente a usuarios que sean miembros de un grupo de Jira. | \- Seleccionar “Only users in group” (o “User in Group”). \- Definir el nombre del grupo (p. ej. `jira-administrators`). | Si el usuario no está en el grupo “jira-administrators”, no verá la transición en el ticket (incidencia). |
| **Field Value** | La transición aparece solo si un campo tiene un valor específico o cumple ciertas condiciones (igual, no vacío, etc.). | \- Seleccionar “Value Field” (u opción similar). \- Configurar la condición (p. ej. “El campo Teoría de Base no está vacío”). | Si “Teoría de Base” está vacío, la transición no se muestra. |
| **Permission** | Exige que el usuario tenga un permiso concreto (p. ej., ‘Edit Issues’) para ver o ejecutar la transición. | \- Seleccionar “Permission Condition” en la configuración. \- Indicar el permiso requerido (ej. ‘Edit Issues’). | Si el usuario no tiene el permiso “Edit Issues”, no podrá ver la transición. |
| **Sub-Task Blocking** | La transición aparece solo si las subtareas están en un estado particular (p. ej. todas resueltas). | \- Seleccionar “Sub-Task Blocking Condition”. \- Indicar que las subtareas deben estar en “Done” (o un estado similar). | “Cerrar Hipótesis” solo se muestra si las subtareas de análisis están completas (Done). |
---

## **Tabla 4: Tabla de Validaciones (Validators)**

Las **Validaciones** se ejecutan cuando un usuario hace clic en la transición. Si la validación no se cumple, Jira muestra un mensaje de error y no permite completar la transición. A diferencia de las **Conditions**, la transición es visible, pero el usuario puede fallar la validación al intentar usarla.

| Nombre (Validator) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **Field Required** | Exige que un campo (por ejemplo, “Teoría de Base”) tenga valor antes de efectuar la transición. | \- Seleccionar “Field Required Validator”. \- Escoger el campo que debe estar lleno (p. ej., “Teoría de Base”). | Si el campo está vacío, la transición no se completa y se muestra un mensaje: “El campo ‘Teoría de Base’ es obligatorio”. |
| **Regular Expression Check** | Verifica que un campo cumpla con un patrón de expresión regular (por ejemplo, un formato de código). | \- Seleccionar “Regex Validator”. \- Indicar el campo a validar y la expresión regular (ej. `^[A-Z]{3}-\d+$`). | El campo “Código de hipótesis” debe seguir el patrón ABC-123. |
| **User Permission Validator** | Controla si el usuario que ejecuta la transición tiene un permiso específico. | \- Seleccionar “Permission Validator”. \- Indicar el permiso, p. ej. “Transition Issues”. | Si el usuario no tiene “Transition Issues”, no se permite avanzar, aunque vea el botón de transición. |
| **Compare Two Fields** | Compara dos campos (por ejemplo, fechas) para asegurarse de que una sea posterior a otra, etc. | \- Seleccionar “Compare Fields Validator”. \- Configurar “Field A \>= Field B” o la regla requerida. | Exige que “Fecha de validación” sea mayor o igual a “Fecha de formulación”. |
| **Parent Status Validator** | Valida el estado de la incidencia padre (en el caso de subtareas) antes de permitir la transición. | \- Seleccionar “Parent Status Validator”. \- Indicar qué estados del padre son aceptables. | No se puede “Cerrar Observación” si el padre (p. ej. una Épica o Historia) está en estado “To Do”. |
---

## **Tabla 5: Tabla de Post-functions**

Las **Post-functions** se ejecutan después de que se cumple la validación y se confirma la transición. Permiten acciones como actualizar campos, asignar la incidencia, disparar notificaciones, crear subtareas, etc.

| Nombre (Postfunction) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **Assign to Reporter** | Asigna automáticamente la incidencia al usuario que la creó (reportero). | \- Seleccionar “Assign to reporter” en la configuración de la transición. | Al pasar de “Formulada” a “En Análisis”, la incidencia se reasigna al reportero para que haga la investigación inicial. |
| **Update Issue Field** | Modifica un campo de la incidencia (por ejemplo, “Resolution”, “Priority” o un campo personalizado). | \- Seleccionar “Update Issue Field”. \- Indicar el campo y el valor deseado. | Al cerrar una “Hipótesis”, se actualiza “Resolution” a “Validada” o “Refutada” según convenga. |
| **Generate Change History** | Registra un cambio en el historial de la incidencia (común en la mayoría de postfunctions por defecto). | \- Esta suele ser una postfunction nativa por defecto en cada transición (no requiere configuración). | Cada vez que se hace una transición, Jira genera automáticamente una entrada en el historial, indicando el cambio de estado y quién lo hizo. |
| **Trigger a Webhook** | Dispara un webhook (URL externa) para integrarse con otros sistemas tras la transición. | \- Seleccionar “Trigger Webhook”. \- Introducir la URL del servicio externo y los datos a enviar (headers, payload). | Se notifica a una API externa que la “Hipótesis” cambió de estado, pasando datos como `issue.key`, `issue.status`, etc. |
| **Create Subtask** | Crea automáticamente una subtarea (o varias) al completar la transición. | \- Añadir “Create Subtask” y detallar el tipo de subtarea, el resumen y cualquier otro campo requerido. | Al pasar de “Formulada” a “En Análisis”, se genera una subtarea “Análisis de Factores Externos” que debe revisar otro integrante del equipo. |
| **Send Custom Email** (legacy) | Envía un correo personalizado (si existe un plugin o la versión de Jira lo permite) tras la transición. | \- Configurar la dirección o grupo destinatario. \- Definir el asunto y cuerpo del mensaje. \- (A veces requiere apps adicionales, ej. “Jira Suite Utilities”). | Al validar una hipótesis, se envía un correo a “investigadores@empresa.com” con un asunto y cuerpo explicando los pasos siguientes. |

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

## **Tabla 6: JQL (Jira Query Language) más Usado**

| Nombre (Cláusula u Operador) | Descripción | Sintaxis | Ejemplo |
| ----- | ----- | ----- | ----- |
| **project** | Filtra incidencias por el proyecto al que pertenecen. | `project = <ProjectKey>` | `project = INVEST` Filtra todas las incidencias que pertenecen al proyecto con clave “INVEST”. |
| **status** | Filtra incidencias según su estado actual (To Do, In Progress, Done, etc.). | `status = <StatusName>` | `status = "Validada"` Devuelve todas las incidencias que están en el estado “Validada”. |
| **type** | Selecciona las incidencias según su tipo (Task, Bug, Hipótesis, Observación, etc.). | `type = <IssueTypeName>` | `type = "Hipótesis"` Obtiene todas las incidencias de tipo “Hipótesis”. |
| **assignee** | Filtra incidencias asignadas a un usuario específico. | `assignee = <username>` *(o)* `assignee in (<usuarios>)` | `assignee = carlosp` Encuentra todas las incidencias asignadas a un usuario cuyo nombre de cuenta es “carlosp”. |
| **reporter** | Filtra incidencias según el usuario que las reportó (creó). | `reporter = <username>` | `reporter = dataperson` Lista todas las incidencias reportadas por el usuario “dataperson”. |
| **resolution** | Busca incidencias según su resolución (Fixed, Done, Won’t Fix, etc.). | `resolution = <ResolutionName>` | `resolution = "Done"` Encuentra las incidencias cuya resolución es “Done”. |
| **text \~ "palabra"** | Realiza una búsqueda de texto libre en los campos indexados por Jira (por defecto Summary, Description, comentarios, etc.). | `<field> ~ "texto"` | `summary ~ "validación"` Busca incidencias cuyo resumen contenga la palabra “validación”. |
| **created \>=** / **created \<=** | Filtra incidencias creadas en un rango de fechas. | `created >= "YYYY/MM/DD"` `created <= "YYYY/MM/DD"` | `created >= "2025/01/01" AND created <= "2025/01/31"` Encuentra incidencias creadas durante el mes de enero de 2025\. |
| **updated \>=** / **updated \<=** | Incidencias actualizadas (modificadas) en un rango de fechas. | `updated >= "YYYY/MM/DD"` `updated <= "YYYY/MM/DD"` | `updated >= "-7d"` Lista las incidencias actualizadas en la última semana (7 días). |
| **AND / OR / NOT** | Operadores lógicos para combinar o excluir condiciones en una consulta JQL. | `<condición1> AND <condición2>` `<condición1> OR <condición2>` `NOT <condición>` | `project = INVEST AND status = "Validada"` Devuelve las incidencias del proyecto INVEST que estén “Validadas”. `project = INVEST OR project = DATAPRJ` Devuelve las incidencias de INVEST o DATAPRJ. `NOT status = Done` para excluir las incidencias en estado Done. |
| **ORDER BY** | Ordena los resultados según un campo (por ejemplo, prioridad, fecha de creación, etc.). | `<consultaJQL> ORDER BY <campo> [ASC/DESC]` | `project = INVEST AND status != Done ORDER BY created ASC` Devuelve incidencias del proyecto INVEST que no estén en Done, ordenadas por fecha de creación de más antigua a más reciente. |
| **IN / NOT IN** | Busca valores que estén o no en una lista específica. | `<campo> IN (valor1, valor2, ...)` `<campo> NOT IN (valor1, valor2, ...)` | `type IN ("Hipótesis", "Observación")` Devuelve incidencias que sean de tipo Hipótesis o tipo Observación. |
| **EMPTY / IS EMPTY / IS NOT EMPTY** | Verifica si un campo está vacío o no (p. ej., si resolution está sin asignar). | `<campo> IS EMPTY` `<campo> IS NOT EMPTY` | `resolution IS EMPTY` Encuentra las incidencias que aún no tienen una resolución establecida. |

### **Notas Clave sobre JQL**

* **Sensibilidad de mayúsculas**: Los operadores (AND, OR, NOT, IN, etc.) y palabras reservadas (`project`, `status`, `type`) no distinguen mayúsculas. Sin embargo, los valores de texto pueden requerir coincidencias exactas (por ejemplo, nombres de estado o tipo de incidencia).  
* **Uso de comillas**: Para nombres con espacios o caracteres especiales, utiliza comillas dobles. Ejemplo: `status = "In Progress"`.  
* **Date Formats (Formatos de fecha)**: Dependiendo de la configuración de Jira, el formato `YYYY/MM/DD` podría variar. A menudo funciona también `YYYY-MM-DD`.  
* **Funciones Relativas**: Jira ofrece funciones como `-7d` (7 días atrás), `-1w` (1 semana atrás), `-1M` (1 mes atrás), y otras, para filtrar de forma relativa al momento actual.
---

## **Tabla 7: Campos Inteligentes (Smart Values) más Usados**

Estos **smart values (valores inteligentes)** se utilizan en reglas de automatización (Automation). Permiten incluir información dinámica de la incidencia (tarea) en acciones como envío de correos, actualizaciones de campos, comentarios, etc.

| Nombre | Descripción | Sintaxis | Ejemplo |
| ----- | ----- | ----- | ----- |
| `issue.key` | Devuelve la clave (identificador) de la incidencia. | `{{issue.key}}` | **Uso en correo:** “La incidencia {{issue.key}} se ha cerrado”. Si la clave es `INV-123`, se mostrará “La incidencia INV-123 se ha cerrado”. |
| `issue.summary` | Devuelve el resumen (título) de la incidencia. | `{{issue.summary}}` | **Uso en correo:** “Título: {{issue.summary}}”. Si el resumen es “Analizar hipótesis inicial”, se mostrará “Título: Analizar hipótesis inicial”. |
| `issue.description` | Muestra la descripción completa de la incidencia. | `{{issue.description}}` | **Uso en correo:** “Descripción: {{issue.description}}”. Incluye todo el texto que el usuario haya escrito al crear la incidencia. |
| `issue.fields.<nombreDelCampo>` | Retorna el valor de un campo personalizado. | `{{issue.fields.customfield_XXXXX}}` *(o usando el nombre si Jira lo soporta)* | **Uso en correo:** `Teoría de Base: {{issue.fields.Teoría de Base}}` Si el campo se llama con un ID `customfield_10002`, usarías `{{issue.fields.customfield_10002}}`. |
| `issue.reporter.displayName` | Devuelve el nombre visible del reportero (persona que creó la incidencia). | `{{issue.reporter.displayName}}` | **Uso en correo:** “Reportado por: {{issue.reporter.displayName}}”. Si el usuario es “Carlos Pérez”, mostrará “Reportado por: Carlos Pérez”. |
| `issue.assignee.displayName` | Muestra el nombre del usuario asignado a la incidencia. | `{{issue.assignee.displayName}}` | **Uso en correo:** “Asignado a: {{issue.assignee.displayName}}”. |
| `issue.status.name` | Indica el nombre del estado actual de la incidencia. | `{{issue.status.name}}` | **Uso en correo:** “Estado actual: {{issue.status.name}}”. Mostrará, por ejemplo, “Formulada”, “Validada”, “Cerrada”, etc. |
| `now` (ahora) | Retorna la fecha y hora actual según la configuración de Jira. | `{{now}}` | **Uso en correo:** “Fecha de notificación: {{now}}”. Es útil para sellar con marca de tiempo. |
| `triggerIssue` | Referencia la incidencia que desencadenó (activó) la regla. | `{{triggerIssue.key}}` (para la clave) | **Uso en escenarios de subtareas**: Si la acción ocurre en una subtarea, `triggerIssue` se refiere a la incidencia padre. |
| `issue.comments.last.body` (comentarios) | Retorna el contenido del último comentario. | `{{issue.comments.last.body}}` | **Uso en correo:** “Último comentario: {{issue.comments.last.body}}”. |

*(Recuerda que si tienes campos personalizados con nombres no estándar, puedes usar `{{issue.fields["NombreExactoDelCampo"]}}` o el `customfield_XXXXX` correspondiente.)*

---
---


### **Notas y Recomendaciones Finales**

* **Propiedades de Workflow**:

  * Se añaden en la sección de configuración de la transición o del estado.  
  * Algunas requieren complementos (plugins) adicionales, o al menos permisos de administrador global.  
* **Campos Inteligentes**:

  * Se usan mayormente en **Jira Automation**.  
  * La sintaxis puede variar dependiendo de la versión de Jira Data Center y de la configuración (en ocasiones, se requiere la notación `{{issue.fields.customfield_10001.value}}` o similar).  
  * Para asegurarte de la referencia exacta, revisa la documentación oficial de Atlassian o la opción “Use smart values” en el panel de configuración de la regla.

