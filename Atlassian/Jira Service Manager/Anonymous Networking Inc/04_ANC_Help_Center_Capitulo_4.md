# Capítulo 4: Configuración de Incidencias, Flujos de Trabajo y Pantallas en Jira

---

## Sección 1: Incidencias y Campos

### 1.1 Creación de Tipos de Incidencia

Para organizar y gestionar las solicitudes de forma óptima, crearemos dos tipos de incidencia separados: uno para **Incidencias Internas** y otro para **Incidencias de Clientes**. Todos los nombres llevarán el prefijo `AHC-` para mantener la consistencia.

#### Paso 1: Acceder a la Configuración de Tipos de Incidencia

1. Ve a **Configuración de Jira** (icono de engranaje en la esquina superior derecha) > **Issues** (Incidencias).
2. En el menú lateral izquierdo, selecciona **Issue Types** (Tipos de Incidencias).

#### Paso 2: Crear Tipo de Incidencia para Incidencias Internas

1. Haz clic en **Add Issue Type** (Añadir Tipo de Incidencia).
2. Configura los siguientes campos:
   - **Nombre**: `AHC-Incidencia Interna`
   - **Descripción**: `Incidencia reportada por empleados internos de ANC para problemas o solicitudes dentro de la organización.`
   - **Icono**: Selecciona un icono adecuado que diferencie las incidencias internas, como un engranaje o herramienta.
   - **Tipo de Emisión**: Selecciona **Standard Issue** (Incidencia Estándar).
3. Haz clic en **Save** (Guardar) para almacenar el tipo de incidencia.

#### Paso 3: Crear Tipo de Incidencia para Incidencias de Clientes

1. Haz clic en **Add Issue Type** nuevamente.
2. Configura los siguientes campos:
   - **Nombre**: `AHC-Incidencia de Cliente`
   - **Descripción**: `Incidencia reportada por clientes de ANC para problemas o solicitudes de soporte.`
   - **Icono**: Selecciona un icono diferente al de las incidencias internas, que denote soporte al cliente, como un icono de contacto o una figura de usuario.
   - **Tipo de Emisión**: Selecciona **Standard Issue** (Incidencia Estándar).
3. Haz clic en **Save** para guardar el tipo de incidencia.

---

### 1.2 Creación de Campos Personalizados

Para una gestión más eficiente y detallada de cada tipo de incidencia, crearemos campos personalizados específicos para los tipos de incidencia `AHC-Incidencia Interna` y `AHC-Incidencia de Cliente`. Todos los nombres de campo llevarán el prefijo `AHC-`.

#### Paso 1: Crear Campos Personalizados

1. Dirígete a **Issues > Custom Fields** (Campos Personalizados).
2. Haz clic en **Create Custom Field** (Crear Campo Personalizado) y crea los siguientes campos:

   - **Campo**: `AHC-Nivel de Prioridad`
     - **Tipo**: **Dropdown (Lista Desplegable)**
     - **Valores**: `Alta`, `Media`, `Baja`
     - **Descripción**: `Define el nivel de prioridad de la incidencia`
   
   - **Campo**: `AHC-Cliente Afectado`
     - **Tipo**: **Texto corto**
     - **Descripción**: `Nombre del cliente afectado por la incidencia (solo para incidencias de cliente)`
   
   - **Campo**: `AHC-Fecha de Resolución Estimada`
     - **Tipo**: **Fecha**
     - **Descripción**: `Fecha estimada para la resolución de la incidencia`
   
   - **Campo**: `AHC-Comentario de Soporte Técnico`
     - **Tipo**: **Texto Largo**
     - **Descripción**: `Notas del equipo de soporte durante la resolución de la incidencia`

3. Haz clic en **Create** (Crear) después de configurar cada campo para guardarlo.

#### Paso 2: Asignar Campos a Configuraciones de Campo

1. Ve a **Fields > Field Configurations** (Configuraciones de Campos).
2. Crea dos configuraciones de campo separadas para los diferentes tipos de incidencia:

   - **AHC-Configuración de Campos para Incidencias Internas**
     - Añade los campos: `Resumen`, `Descripción`, `AHC-Nivel de Prioridad`, `AHC-Comentario de Soporte Técnico`
     - Configura `AHC-Nivel de Prioridad` como **Obligatorio** y los demás como opcionales.
   
   - **AHC-Configuración de Campos para Incidencias de Cliente**
     - Añade los campos: `Resumen`, `Descripción`, `AHC-Nivel de Prioridad`, `AHC-Cliente Afectado`, `AHC-Fecha de Resolución Estimada`, `AHC-Comentario de Soporte Técnico`
     - Configura `AHC-Nivel de Prioridad` como **Obligatorio** y los demás como opcionales.

3. Guarda ambas configuraciones de campo.

#### Paso 3: Crear Esquemas de Configuración de Campos por Incidencia

1. Ve a **Field Configuration Schemes** (Esquemas de Configuración de Campos).
2. Crea dos esquemas separados para asignar las configuraciones de campo correspondientes:

   - **AHC-Esquema de Campos - Interno**: Asigna la configuración de campo `AHC-Configuración de Campos para Incidencias Internas` al tipo de incidencia `AHC-Incidencia Interna`.
   - **AHC-Esquema de Campos - Cliente**: Asigna la configuración de campo `AHC-Configuración de Campos para Incidencias de Cliente` al tipo de incidencia `AHC-Incidencia de Cliente`.

3. Guarda ambos esquemas.

---

## Sección 2: Flujos de Trabajo y Pantallas

### 2.1 Creación de Flujos de Trabajo Separados

#### Paso 1: Acceder a la Configuración de Flujos de Trabajo

1. Dirígete a **Configuración de Jira** > **Issues > Workflows**.

#### Paso 2: Clonar el Flujo de Trabajo General

1. Localiza el flujo de trabajo predeterminado.
2. Haz clic en **Copy** para crear una copia editable del flujo.
3. Asigna un nombre y descripción adecuados:
   - **Flujo de Trabajo para Incidencias Internas**: `AHC-Flujo de Trabajo - Interno`
     - Descripción: `Flujo de trabajo para gestionar solicitudes internas de ANC`
   - **Flujo de Trabajo para Incidencias de Clientes**: `AHC-Flujo de Trabajo - Cliente`
     - Descripción: `Flujo de trabajo para gestionar solicitudes de soporte de clientes externos en ANC`

#### Paso 3: Configuración de Estados y Transiciones

##### Flujo de Trabajo para Incidencias Internas

1. **Estados**: `AHC-Nuevo`, `AHC-En Progreso`, `AHC-Escalado`, `AHC-Resuelto`, `AHC-Cerrado`.
2. **Transiciones** y **Configuraciones**:
   - **AHC-Nuevo → AHC-En Progreso**: Solo agentes internos.
   - **AHC-En Progreso → AHC-Escalado**: Solo administradores.
   - **AHC-Escalado → AHC-En Progreso**: Sin restricciones.
   - **AHC-En Progreso → AHC-Resuelto**: Solo agentes internos.
   - **AHC-Resuelto → AHC-Cerrado**: Solo solicitante interno.

##### Flujo de Trabajo para Incidencias de Clientes

1. **Estados**: `AHC-Nuevo`, `AHC-En Progreso`, `AHC-Pendiente de Aprobación`, `AHC-Escalado`, `AHC-Resuelto`, `AHC-Cerrado`.
2. **Transiciones** y **Configuraciones**:
   - **AHC-Nuevo → AHC-En Progreso**: Solo agentes de soporte.
   - **AHC-En Progreso → AHC-Pendiente de Aprobación**: Solo administradores.
   - **AHC-Pendiente de Aprobación → AHC-Escalado**: Solo administradores.
   - **AHC-Escalado → AHC-En Progreso**: Sin restricciones.
   - **AHC-En Progreso → AHC-Resuelto**: Solo agentes de soporte.
   - **AHC-Resuelto → AHC-Cerrado**: Solo cliente.

### 2.2 Creación de Pantallas para los Flujos de Trabajo

1. **AHC-Pantalla de Inicio de Soporte**
2. **AHC-Pantalla de Solicitud de Aprobación**
3. **AHC-Pantalla de Escalado**
4. **AHC-Pantalla de Resolución**

---

## Sección 3: Esquemas y Relaciones

### 3.1 Creación de Esquemas de Tipos de Incidencia

1. **Esquema**: `AHC-Esquema de Tipos de Incidencia`
2. Asigna `AHC-Incidencia de Cliente` y `AHC-Incidencia Interna`

### 3.2 Creación de Esquemas de Flujo de Trabajo

1. **AHC-Esquema de Flujo - Interno**
2. **AHC-Esquema de Flujo - Cliente**

### 3.3 Creación de Esquemas de Pantalla

1. **AHC-Esquema de Pantallas - Interno**
2. **AHC-Esquema de Pantallas - Cliente`

---

### Paginación

- **Capítulo Anterior**: [Configuración de Usuarios, Roles y Grupos](ANC_Help_Center_Capitulo_3.md)
- **Siguiente Capítulo**: [Configuración Avanzada de Permisos](ANC_Help_Center_Capitulo_5.md)

---

[Volver al repositorio principal](https://github.com/carloslhg/repositorio)
