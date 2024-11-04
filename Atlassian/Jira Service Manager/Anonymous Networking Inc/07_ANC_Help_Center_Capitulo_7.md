# Capítulo 7: Dashboards, Filtros y Gadgets en Jira

---

## Sección 1: Creación y Configuración de Filtros

Los filtros en Jira permiten visualizar datos específicos del proyecto, como incidencias por estado, por tipo o por usuario asignado. En esta sección, crearemos filtros básicos y avanzados.

### Paso 1: Crear un Filtro Básico

1. Dirígete a **Issues > Search for Issues** (Buscar Incidencias).
2. Utiliza la barra de búsqueda para aplicar filtros rápidos, como **Status = Open** (Estado = Abierta) o **Assignee = Current User** (Asignado = Usuario Actual).
3. Haz clic en **Save as** (Guardar como) y nombra el filtro como `AHC-Incidencias Abiertas`.

### Paso 2: Crear un Filtro Avanzado con JQL (Jira Query Language)

1. En **Search for Issues**, selecciona **Advanced** (Avanzado) para escribir una consulta personalizada.
2. Ejemplo de consulta avanzada:
   - **Consulta**: `project = "ANC Help Center" AND status = "In Progress" AND assignee = "Agente Interno"`
   - **Descripción**: Muestra las incidencias en progreso asignadas a agentes internos.
3. Guarda el filtro como `AHC-Incidencias en Progreso`.

### Paso 3: Guardar y Compartir Filtros

1. Haz clic en **Save** (Guardar) para guardar el filtro.
2. Para compartirlo, ve a **Filters > View All Filters** y selecciona el filtro guardado.
3. Configura los permisos en **Share** (Compartir) para que el filtro sea visible para el equipo o para roles específicos.

---

## Sección 2: Configuración de Dashboards

Los dashboards permiten visualizar los datos filtrados de manera organizada, utilizando gadgets para mostrar la información en diferentes formatos gráficos.

### Paso 1: Crear un Dashboard

1. Dirígete a **Dashboards > Create Dashboard** (Crear Dashboard).
2. Nombra el dashboard como `ANC Help Center - Panel de Soporte`.
3. Selecciona el permiso de visualización, configurándolo como **Shared** (Compartido) con el equipo de soporte.

### Paso 2: Configurar la Estructura del Dashboard

1. Personaliza el diseño del dashboard seleccionando la **disposición** (layout) adecuada, como **dos columnas** para una vista equilibrada.
2. Añade una descripción breve del objetivo del dashboard para que los usuarios comprendan su propósito.

---

## Sección 3: Uso de Gadgets para Visualización de Datos

Los gadgets permiten visualizar métricas clave directamente en el dashboard, ayudando a obtener una visión general del estado del proyecto.

### Paso 1: Añadir Gadgets al Dashboard

1. En tu dashboard recién creado, haz clic en **Add Gadget** (Añadir Gadget).
2. A continuación, selecciona gadgets recomendados para el proyecto **ANC Help Center**:
   - **Pie Chart (Gráfico Circular)**: Muestra incidencias por tipo o estado.
   - **Created vs Resolved Chart (Gráfico de Creación vs Resolución)**: Visualiza incidencias creadas y resueltas en un período.
   - **Issue Statistics (Estadísticas de Incidencia)**: Muestra las incidencias agrupadas por prioridad o asignado.
   - **Filter Results (Resultados de Filtro)**: Visualiza una lista filtrada de incidencias.
   
### Paso 2: Configurar los Gadgets Seleccionados

1. Configura cada gadget para que muestre datos específicos:
   - **Pie Chart**: Selecciona el filtro `AHC-Incidencias Abiertas` para mostrar incidencias abiertas por tipo.
   - **Created vs Resolved Chart**: Configura un rango de fechas para ver el volumen de incidencias creadas y resueltas en una semana o mes.
2. Personaliza el título de cada gadget para que sea claro y relevante, como `Incidencias por Tipo` o `Incidencias Abiertas`.

---

## Sección 4: Compartir Filtros y Dashboards con el Equipo

Finalmente, configuraremos los permisos para que el equipo de soporte tenga acceso a los filtros y dashboards que hemos creado.

### Paso 1: Compartir Filtros Guardados

1. Dirígete a **Filters > View All Filters** y selecciona el filtro que deseas compartir.
2. En **Details > Share** (Detalles > Compartir), elige los usuarios, roles o grupos con quienes compartir el filtro, como `Agente Interno` o `Agente de Cliente`.

### Paso 2: Compartir el Dashboard

1. En tu dashboard, selecciona **Dashboard Settings** (Configuración del Dashboard).
2. Configura los permisos en **Share** para que los miembros del equipo, como `Agente Interno`, tengan acceso.
3. Guarda los cambios y confirma que el equipo pueda visualizar el dashboard compartido.

---

### Paginación

- **Capítulo Anterior**: [Configuración de Notificaciones y Automatizaciones](06_ANC_Help_Center_Capitulo_6.md)
- **Siguiente Capítulo**: [Integración de Apps y Herramientas de Soporte](08_ANC_Help_Center_Capitulo_8.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/repositorio)
