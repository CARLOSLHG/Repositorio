## **Ejercicio 5 (Nivel Avanzado): Creación y Asignación de Workflows Personalizados a un Proyecto**

### **Situación Hipotética**

En la investigación, el ciclo de vida de una **Hipótesis** es distinto del de una **Observación**. Por ejemplo, una “Hipótesis” puede pasar por los estados **“Formulada”**, **“En Análisis”**, **“Validada”** o **“Refutada”**; mientras que una “Observación” puede transitar entre **“Recopilada”**, **“Clasificada”** y **“Integrada al Informe”**.  
 La idea es que cada tipo de incidencia tenga su propio flujo de trabajo que refleje esos pasos.

### **Objetivo Principal**

Configurar **workflows (flujos de trabajo)** separados para “Hipótesis” y “Observación”, y asignarlos al proyecto mediante un **Workflow Scheme** (esquema de flujo de trabajo).

### **Plan de Acción**

1. **Crear o copiar** un flujo de trabajo base para “Hipótesis”.  
2. **Diseñar los estados y transiciones** específicos que requiere la “Hipótesis”.  
3. **Repetir el proceso** para “Observación”.  
4. **Crear o editar** un **Workflow Scheme** que asocie cada flujo de trabajo con su tipo de incidencia.  
5. **Asignar** el Workflow Scheme al proyecto.

### **Resolución Paso a Paso**

1. **Acceder a la administración de Jira**

   * En el menú principal, haz clic en el ícono de engranaje → “Issues” → “Workflows”.  
2. **Crear (o clonar) un Workflow para “Hipótesis”**

   * Haz clic en “Add workflow” o “Copy” si deseas partir de un flujo de trabajo existente.  
   * Nombra el flujo, por ejemplo: **“Hipótesis Workflow”**.  
   * En la vista de diagrama, agrega estados (p. ej., “Formulada”, “En Análisis”, “Validada”, “Refutada”) y traza transiciones (flechas) lógicas entre esos estados.  
   * Asigna transiciones con nombres claros (por ejemplo, “Iniciar análisis” para pasar de “Formulada” a “En Análisis”).  
   * Publica los cambios (o guarda el borrador) cuando estés satisfecho.  
3. **Crear otro Workflow para “Observación”**

   * Repite los pasos anteriores.  
   * Nombra el flujo, por ejemplo: **“Observación Workflow”**.  
   * Define estados como “Recopilada”, “Clasificada”, “Integrada al Informe”.  
   * Configura las transiciones con nombres significativos (“Clasificar observación”, “Integrar a informe”, etc.).  
   * Publica el flujo.  
4. **Crear o editar un Workflow Scheme (esquema de flujo de trabajo)**

   * Dentro de **Workflows**, busca la sección “Workflow Schemes”.  
   * Crea uno nuevo, por ejemplo: **“Esquema de Flujos de Investigación”**, o edita un esquema ya existente.  
   * Asocia el tipo de incidencia **“Hipótesis”** con el “Hipótesis Workflow”.  
   * Asocia el tipo de incidencia **“Observación”** con el “Observación Workflow”.  
   * Los demás tipos de incidencia pueden mantenerse con un flujo de trabajo genérico o el que definas.  
5. **Asignar el Workflow Scheme al proyecto**

   * En la lista de “Workflow Schemes”, localiza tu nuevo esquema (o el que has editado).  
   * Pulsa “Associate” → Elige el proyecto que creaste en los ejercicios anteriores.  
   * Sigue el asistente. Si tu proyecto ya tiene incidencias existentes, Jira podría mostrar un asistente de migración para ajustar los estados de las incidencias al nuevo flujo.  
6. **Validar la configuración**

   * Regresa al proyecto y crea un nuevo “Hipótesis”. Verifica que aparezcan los estados “Formulada”, “En Análisis”, “Validada”, “Refutada” en el panel de la incidencia.  
   * Realiza las transiciones para confirmar que funcionan y que los estados cambian correctamente.  
   * Repite con una “Observación”, comprobando sus estados y transiciones únicas.

---
| [Regresar](./README.md) |