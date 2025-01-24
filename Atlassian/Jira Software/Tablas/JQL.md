## **JQL (Jira Query Language)**

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
| [Regresar](./README.md) |