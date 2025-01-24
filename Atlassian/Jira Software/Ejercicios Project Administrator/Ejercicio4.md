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
---