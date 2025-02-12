## **Propiedades de Workflow más Usadas**

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
| [Regresar](./README.md) |