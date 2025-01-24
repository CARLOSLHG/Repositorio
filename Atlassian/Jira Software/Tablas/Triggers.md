## **Triggers**

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