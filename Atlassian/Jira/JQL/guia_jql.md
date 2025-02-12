Guía de JQL (Jira Query Language)

## Introducción

JQL (Jira Query Language) es una herramienta poderosa dentro de Jira que permite realizar búsquedas avanzadas para encontrar y analizar información clave. Su flexibilidad permite a los equipos filtrar y gestionar incidencias (issues) con precisión, adaptándose a las necesidades específicas de cada proyecto.

---

## Estructura Básica de JQL

JQL utiliza una estructura lógica basada en:
- **Campo**: Propiedad de una incidencia (issue) (e.g., `status`, `assignee`, `priority`).
- **Operador**: Determina la relación (e.g., `=`, `!=`, `>`, `<`).
- **Valor**: Es el término de búsqueda (e.g., "Open", "High", "John Doe").

**Ejemplo básico:**
```
status = "Open"
```
Este query devuelve todas las incidencias (issues) que están abiertas.

---

## Componentes Clave de JQL

1. **Campos**: Atributos estándar y personalizados de las incidencias.
2. **Operadores**: Incluyen `=`, `!=`, `>`, `<`, `IN`, `NOT IN`, `~`, etc.
3. **Palabras clave (Keywords)**: Como `ORDER BY`, `AND`, `OR`, `NOT` para combinar y ordenar resultados.
4. **Funciones**: Como `startOfDay()`, `endOfWeek()`, `membersOf()`, útiles para búsquedas dinámicas.

---

## Tabla de Criterios de Búsqueda

| **Criterio de Búsqueda** | **Descripción**                         | **Sintaxis**                       | **Ejemplo**                   |
|---------------------------|-----------------------------------------|------------------------------------|-------------------------------|
| `project`                | Busca incidencias dentro de un proyecto. | `project = <nombre>`              | `project = "Marketing"`       |
| `status`                 | Filtra por estado de las incidencias.   | `status = <estado>`               | `status = "In Progress"`      |
| `assignee`               | Incidencias asignadas a un usuario.     | `assignee = <usuario>`            | `assignee = "John Doe"`       |
| `priority`               | Filtra por nivel de prioridad.          | `priority = <nivel>`              | `priority = "High"`           |
| `labels`                 | Busca por etiquetas asignadas.          | `labels IN (<etiquetas>)`         | `labels IN ("urgent", "critical")` |
| `created`                | Incidencias por fecha de creación.      | `created >= <fecha>`              | `created >= startOfWeek()`    |
| `summary`                | Busca términos en el resumen.           | `summary ~ "<término>"`           | `summary ~ "error"`           |
| `updated`                | Incidencias actualizadas recientemente. | `updated >= <fecha>`              | `updated >= -7d`              |
| `fixVersion`             | Busca incidencias por versión.          | `fixVersion = <versión>`          | `fixVersion = "1.0"`          |

---

## Ejemplos Avanzados de JQL

1. **Incidencias de alta prioridad creadas esta semana**:
```
priority = "High" AND created >= startOfWeek()
```
2. **Incidencias asignadas a múltiples usuarios**:
```
assignee IN ("John Doe", "Jane Smith")
```
3. **Tareas atrasadas**:
```
duedate < now() AND status != "Done"
```
4. **Problemas críticos en proyectos específicos**:
```
project IN ("Alpha", "Beta") AND priority = "Blocker"
```

---

## Consejos y Mejores Prácticas

- Documenta consultas frecuentes para facilitar su uso recurrente.
- Usa funciones dinámicas para búsquedas automatizadas.
- Combina condiciones con operadores lógicos (`AND`, `OR`) para mayor precisión.
- Integra JQL en dashboards y filtros guardados para reportes dinámicos.

---
| [Regresar](../README.md) |
### 🙏 ¡Gracias por visitar mi repositorio!

Si quieres invitarme un café por mi trabajo, y asi motivarme a subir más cosas útiles, haz clic en el botón:

<form action="https://www.paypal.com/donate" method="post" target="_blank">
  <!-- Tu hosted_button_id generado en PayPal -->
  <input type="hidden" name="hosted_button_id" value="8CBQUB38L9ESN" />
  
  <!-- Imagen oficial de botón de PayPal Donar -->
  <input type="image" 
         src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" 
         border="0" name="submit" 
         title="PayPal - The safer, easier way to pay online!" 
         alt="Botón Donar con PayPal" />
         
  <!-- Pixel de seguimiento (monitoreo) de PayPal -->
  <img alt="" border="0" 
       src="https://www.paypal.com/es_ES/i/scr/pixel.gif" 
       width="1" height="1" />
</form>