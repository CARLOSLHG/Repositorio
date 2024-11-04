# Capítulo 6: Configuración de Notificaciones y Automatizaciones

---

## Sección 1: Configuración de Notificaciones

En esta sección, configuraremos las notificaciones para que los usuarios reciban actualizaciones en cada etapa del flujo de trabajo. Esta configuración ayuda a mantener informados tanto a los agentes internos como a los clientes.

### Paso 1: Acceder a la Configuración de Notificaciones del Proyecto

1. Dirígete a **Project Settings** (Configuración del Proyecto) en el proyecto **ANC Help Center**.
2. En el menú de la izquierda, selecciona **Notifications** (Notificaciones) para abrir la configuración de notificaciones.

### Paso 2: Configurar Esquema de Notificaciones

Para personalizar las notificaciones en Jira, necesitaremos un esquema de notificaciones propio para el proyecto:

1. **Crear Esquema de Notificaciones**:
   - En **Project Settings > Notifications**, selecciona **Create Notification Scheme** (Crear Esquema de Notificación).
   - Nombra el esquema como `AHC-Esquema de Notificaciones`.
   - **Descripción**: `Esquema de notificaciones personalizado para mantener informados a los usuarios sobre el estado de las incidencias en ANC Help Center`.

2. **Configuración de Eventos Clave**:
   - A continuación, asigna roles y grupos a eventos clave:
     - **Issue Created (Incidencia Creada)**: `Administrador`, `Agente Interno`, `Agente de Cliente`, `Reportador`
     - **Issue Updated (Incidencia Actualizada)**: `Administrador`, `Agente Interno`, `Agente de Cliente`
     - **Issue Resolved (Incidencia Resuelta)**: `Administrador`, `Agente Interno`, `Reportador`
     - **Issue Closed (Incidencia Cerrada)**: `Administrador`, `Reportador`
     - **Issue Reopened (Incidencia Reabierta)**: `Administrador`, `Agente Interno`, `Reportador`

3. **Asignar Esquema al Proyecto**:
   - Dirígete a **Project Settings > Notifications** y asigna el `AHC-Esquema de Notificaciones` al proyecto **ANC Help Center**.

---

## Sección 2: Configuración de Automatizaciones

La automatización en Jira permite configurar reglas que ayudan a gestionar incidencias sin intervención manual, lo cual es muy útil para tareas repetitivas o para notificaciones automáticas.

### Paso 1: Acceder a la Configuración de Automatización

1. En **Project Settings**, selecciona **Automation** (Automatización) para acceder al área de configuración de reglas de automatización.

### Paso 2: Crear Reglas de Automatización

A continuación, configuraremos algunas reglas básicas de automatización que ayudarán a gestionar las incidencias de manera eficiente:

1. **Regla de Asignación Automática**:
   - **Objetivo**: Asignar automáticamente un agente a las nuevas incidencias.
   - **Regla**:
     - **Trigger (Desencadenante)**: **Issue Created** (Incidencia Creada)
     - **Condition (Condición)**: Si el tipo de incidencia es `AHC-Incidencia de Cliente`.
     - **Action (Acción)**: Asignar al agente disponible.
   - **Guardar y Activar**: Guarda la regla y actívala para que funcione en el proyecto.

2. **Regla de Notificación de Resolución**:
   - **Objetivo**: Notificar automáticamente al reportador cuando la incidencia sea resuelta.
   - **Regla**:
     - **Trigger**: **Issue Transitioned** (Transición de Incidencia) de cualquier estado a `Resuelto`.
     - **Action**: Enviar una notificación al reportador indicando que la incidencia ha sido resuelta.
   - **Guardar y Activar**: Guarda la regla y actívala.

3. **Regla de Recordatorio de Seguimiento**:
   - **Objetivo**: Recordar a los agentes revisar incidencias que llevan abiertas más de cinco días.
   - **Regla**:
     - **Trigger**: **Scheduled** (Programado) - Cada día.
     - **Condition**: Si la incidencia está en estado `En Progreso` y lleva más de cinco días sin actualización.
     - **Action**: Enviar un recordatorio al agente asignado.
   - **Guardar y Activar**: Guarda la regla y actívala.

---

## Sección 3: Pruebas y Ajustes de Notificaciones y Automatizaciones

Es fundamental probar que las notificaciones y automatizaciones funcionen correctamente, garantizando que cada usuario reciba las actualizaciones correspondientes y que las automatizaciones realicen las acciones previstas.

### Paso 1: Pruebas de Notificaciones

1. **Crear Incidencias de Prueba**: Crea una incidencia para simular un flujo completo (creación, actualización, resolución, cierre).
2. **Verificar Notificaciones**: Confirma que las notificaciones se envían a los usuarios correctos en cada evento.
3. **Ajustes**: Si las notificaciones no se envían correctamente, revisa el esquema de notificaciones y ajusta según sea necesario.

### Paso 2: Pruebas de Automatización

1. **Ejecutar Reglas de Automatización**: Crea incidencias y simula transiciones para comprobar que las reglas de automatización se ejecutan correctamente.
2. **Revisar Acciones Automáticas**: Verifica que las acciones, como asignaciones y notificaciones automáticas, se realicen sin problemas.
3. **Ajustes**: Si alguna regla no funciona como se espera, revisa su configuración y corrige cualquier error.

---

### Paginación

- **Capítulo Anterior**: [Configuración Avanzada de Permisos](05_ANC_Help_Center_Capitulo_5.md)
- **Siguiente Capítulo**: [Integración de Apps y Herramientas de Soporte](07_ANC_Help_Center_Capitulo_7.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/repositorio)
