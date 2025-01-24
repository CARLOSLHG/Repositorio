## **Validaciones (Validators)**

Las **Validaciones** se ejecutan cuando un usuario hace clic en la transición. Si la validación no se cumple, Jira muestra un mensaje de error y no permite completar la transición. A diferencia de las **Conditions**, la transición es visible, pero el usuario puede fallar la validación al intentar usarla.

| Nombre (Validator) | Descripción | Sintaxis / Configuración | Ejemplo |
| ----- | ----- | ----- | ----- |
| **Field Required** | Exige que un campo (por ejemplo, “Teoría de Base”) tenga valor antes de efectuar la transición. | \- Seleccionar “Field Required Validator”. \- Escoger el campo que debe estar lleno (p. ej., “Teoría de Base”). | Si el campo está vacío, la transición no se completa y se muestra un mensaje: “El campo ‘Teoría de Base’ es obligatorio”. |
| **Regular Expression Check** | Verifica que un campo cumpla con un patrón de expresión regular (por ejemplo, un formato de código). | \- Seleccionar “Regex Validator”. \- Indicar el campo a validar y la expresión regular (ej. `^[A-Z]{3}-\d+$`). | El campo “Código de hipótesis” debe seguir el patrón ABC-123. |
| **User Permission Validator** | Controla si el usuario que ejecuta la transición tiene un permiso específico. | \- Seleccionar “Permission Validator”. \- Indicar el permiso, p. ej. “Transition Issues”. | Si el usuario no tiene “Transition Issues”, no se permite avanzar, aunque vea el botón de transición. |
| **Compare Two Fields** | Compara dos campos (por ejemplo, fechas) para asegurarse de que una sea posterior a otra, etc. | \- Seleccionar “Compare Fields Validator”. \- Configurar “Field A \>= Field B” o la regla requerida. | Exige que “Fecha de validación” sea mayor o igual a “Fecha de formulación”. |
| **Parent Status Validator** | Valida el estado de la incidencia padre (en el caso de subtareas) antes de permitir la transición. | \- Seleccionar “Parent Status Validator”. \- Indicar qué estados del padre son aceptables. | No se puede “Cerrar Observación” si el padre (p. ej. una Épica o Historia) está en estado “To Do”. |
---