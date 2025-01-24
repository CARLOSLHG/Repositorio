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
---