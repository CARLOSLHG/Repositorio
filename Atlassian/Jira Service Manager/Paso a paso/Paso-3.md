# Paso 3: Configuración Inicial del Help Center

---

## Paso 1: Configuración de Flujos de Trabajo

### 1.1 Creación del Flujo de Trabajo para Incidencias Internas (AHC-Flujo Interno)

1. **Acceder a la Configuración de Flujos de Trabajo**:
   - Desde el menú principal de Jira, ve a **Jira settings** > **Issues** > **Workflows** (Configuración de Jira > Problemas > Flujos de trabajo).

2. **Agregar un Nuevo Flujo de Trabajo**:
   - Haz clic en **Add workflow** (Agregar flujo de trabajo).
   - Asigna un nombre claro, como **AHC-Flujo Interno**.
   - **Descripción**: Especifica que este flujo de trabajo se usará para solicitudes internas, tales como cambios de laptop, ajustes de impresora, remodelación de oficina, entre otros.

3. **Configurar los Estados del Flujo de Trabajo**:
   - **Solicitud**: Estado inicial, donde se registra la incidencia.
   - **En Revisión**: La solicitud se revisa por el departamento correspondiente.
   - **Aprobado**: La solicitud es aprobada y está lista para ejecutarse.
   - **En Progreso**: La solicitud está en proceso.
   - **Finalizado**: La solicitud ha sido completada y cerrada.

4. **Configurar las Transiciones del Flujo de Trabajo**:
   - **Registrar Solicitud**: De **Solicitud** a **En Revisión**.
   - **Aprobar Solicitud**: De **En Revisión** a **Aprobado**.
   - **Iniciar Proceso**: De **Aprobado** a **En Progreso**.
   - **Completar**: De **En Progreso** a **Finalizado**.

5. **Publicar el Flujo de Trabajo**:
   - Una vez configurado, guarda y publica el flujo de trabajo. Esto permitirá que el flujo esté disponible para asociarlo a los tipos de incidencias internas más adelante.

---

### 1.2 Creación del Flujo de Trabajo para Incidencias Externas (AHC-Flujo Externo)

1. **Agregar un Nuevo Flujo de Trabajo**:
   - Repite el proceso anterior y crea un nuevo flujo de trabajo llamado **AHC-Flujo Externo**.
   - **Descripción**: Indica que este flujo de trabajo se utilizará para solicitudes de clientes, tales como devoluciones de productos, solicitudes de manuales, soporte técnico y servicios postventa.

2. **Configurar los Estados del Flujo de Trabajo**:
   - **Recibido**: La solicitud del cliente ha sido registrada.
   - **En Proceso**: La solicitud está siendo gestionada por el equipo de soporte.
   - **Resuelto**: La solicitud ha sido resuelta.
   - **Cerrado**: El proceso ha concluido y la incidencia se archiva.

3. **Configurar las Transiciones del Flujo de Trabajo**:
   - **Registrar Solicitud**: De **Recibido** a **En Proceso**.
   - **Resolver**: De **En Proceso** a **Resuelto**.
   - **Cerrar**: De **Resuelto** a **Cerrado**.

4. **Publicar el Flujo de Trabajo**:
   - Guarda y publica el flujo de trabajo. Ahora estará disponible para asignarlo a los tipos de incidencias externas.

---

## Paso 2: Configuración de Condiciones, Validaciones y Acciones Post-función

### 2.1 Configurar Condiciones en el Flujo de Incidencias Internas

1. **Acceder a la Configuración del Flujo de Trabajo**:
   - En la sección **Workflows** (Flujos de trabajo), selecciona **AHC-Flujo Interno** y haz clic en **Edit** (Editar).

2. **Añadir Condiciones en las Transiciones**:
   - **Aprobar Solicitud**: Agrega una condición que permita que solo los administradores o supervisores cambien el estado a **Aprobado**.
   - **Completar**: Solo los usuarios con permisos de agente pueden marcar la incidencia como **Finalizado**.

### 2.2 Configurar Validaciones en el Flujo de Incidencias Externas

1. **Acceder a la Configuración del Flujo**:
   - En **AHC-Flujo Externo**, selecciona **Edit**.

2. **Añadir Validaciones en las Transiciones**:
   - **Registrar Solicitud**: Valida que los campos obligatorios, como **Número de Cliente** y **Fecha de Solicitud**, estén completados antes de pasar a **En Proceso**.
   - **Resolver**: Valida que el campo **Descripción del Problema** esté completo.

### 2.3 Configurar Acciones Post-función para ambos Flujos

1. **Acceder a las Acciones Post-función**:
   - En cada transición relevante, agrega acciones post-función según el siguiente esquema:

2. **AHC-Flujo Interno**:
   - **Aprobado**: Al cambiar a este estado, se envía una notificación al solicitante de la incidencia.
   - **Finalizado**: Al cerrar la incidencia, se actualiza el SLA (tiempo límite).

3. **AHC-Flujo Externo**:
   - **Resuelto**: Envía automáticamente una encuesta de satisfacción al cliente.
   - **Cerrado**: Si el cliente no ha completado la encuesta de satisfacción, envía un recordatorio.

---

## Paso 3: Configuración de ScriptRunner para Automatización de Prioridades y SLAs

Para ajustar las prioridades en función de los SLA, configuraremos un script en **ScriptRunner**.

### 3.1 Crear el Script en ScriptRunner

1. **Acceder a ScriptRunner**:
   - Dirígete a **Jira settings > Apps > ScriptRunner**.

2. **Escribir el Script para Automatizar Prioridades**:
   - Crea un nuevo script en **Script Console** y usa el siguiente pseudocódigo:

   ```groovy
   def impacto = issue.getCustomFieldValue("AHC-Impacto")
   def urgencia = issue.getCustomFieldValue("AHC-Urgencia")

   if (impacto == "Empresa" && urgencia == "Alta") {
       issue.setPriority("Alta")
   } else if (impacto == "Departamento" && urgencia == "Media") {
       issue.setPriority("Media")
   } else {
       issue.setPriority("Baja")
   }

3. **Prueba y Publicación del Script**:
   - Realiza pruebas para asegurar que el script asigna correctamente la prioridad en función de la combinación de **impacto** y **urgencia**.

---

## Paso 4: Revisión de la Configuración del Flujo de Trabajo

1. **Verificar Estados y Transiciones**:
    - Asegúrate de que cada flujo tenga los estados y transiciones correctos.
2. **Confirmar Condiciones, Validaciones y Post-funciones**:
    - Revisa que cada transición tenga las condiciones y validaciones configuradas correctamente.
3. **Prueba Final del Flujo**:
    - Simula la creación de una incidencia interna y otra externa para confirmar que los flujos se comportan como se espera.

---

### Paginación

- **Paso Anterior**: [Creación del Proyecto](Paso-2.md)
- **Siguiente Paso**: [Configuración de Tipos de Incidencia Personalizados](Paso-4.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/Repositorio)

