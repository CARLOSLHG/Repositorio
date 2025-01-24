## **Condiciones (Conditions)**

Estos criterios determinan si una transición (cambio de estado) está disponible para el usuario actual, dependiendo de factores como roles, grupos, campos, etc. Si la **Condition** no se cumple, el botón de transición no se muestra.

| Nombre (Condition) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **User Is in Project Role** | La transición solo estará disponible si el usuario que la ejecuta pertenece a un rol (papel) específico dentro del proyecto. | \- Seleccionar “User In Project Role” en la configuración de la transición. \- Indicar el rol (p. ej. “Investigador Senior”). | Solo si el usuario pertenece al rol “Investigador Senior”, verá el botón de transición. |
| **User Is in Group** | Permite la transición únicamente a usuarios que sean miembros de un grupo de Jira. | \- Seleccionar “Only users in group” (o “User in Group”). \- Definir el nombre del grupo (p. ej. `jira-administrators`). | Si el usuario no está en el grupo “jira-administrators”, no verá la transición en el ticket (incidencia). |
| **Field Value** | La transición aparece solo si un campo tiene un valor específico o cumple ciertas condiciones (igual, no vacío, etc.). | \- Seleccionar “Value Field” (u opción similar). \- Configurar la condición (p. ej. “El campo Teoría de Base no está vacío”). | Si “Teoría de Base” está vacío, la transición no se muestra. |
| **Permission** | Exige que el usuario tenga un permiso concreto (p. ej., ‘Edit Issues’) para ver o ejecutar la transición. | \- Seleccionar “Permission Condition” en la configuración. \- Indicar el permiso requerido (ej. ‘Edit Issues’). | Si el usuario no tiene el permiso “Edit Issues”, no podrá ver la transición. |
| **Sub-Task Blocking** | La transición aparece solo si las subtareas están en un estado particular (p. ej. todas resueltas). | \- Seleccionar “Sub-Task Blocking Condition”. \- Indicar que las subtareas deben estar en “Done” (o un estado similar). | “Cerrar Hipótesis” solo se muestra si las subtareas de análisis están completas (Done). |
---