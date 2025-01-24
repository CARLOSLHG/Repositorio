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
---