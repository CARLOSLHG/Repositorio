
# Capítulo 2: Repaso del Administrator Hub y Acceso a Jira Service Management

---

## 1. Introducción al Administrator Hub

El **Administrator Hub** es el panel de control de Atlassian donde se gestionan productos y configuraciones, especialmente útil para gestionar múltiples productos y permisos. Las opciones pueden variar ligeramente entre **Cloud** y **Data Center**.

### Diferencias entre Cloud y Data Center:
- En **Cloud**, el **Administrator Hub** centraliza la administración de productos y configuraciones.
- En **Data Center**, algunas configuraciones avanzadas están más distribuidas y pueden requerir acceso directo al sistema de administración en el servidor.

### Pasos para Acceder al Administrator Hub
- **En Cloud:**
  1. Iniciar sesión en la cuenta de Atlassian.
  2. Seleccionar la pestaña **Administrador** en la esquina superior derecha.
  3. Acceder al **Administrator Hub** y revisar los productos y configuraciones disponibles.

- **En Data Center:**
  1. Iniciar sesión en Jira con una cuenta de administrador.
  2. Dirigirse al menú de administración desde la barra superior.
  3. Acceder a la configuración de administración de Jira y seleccionar **Jira Service Management**.

## 2. Acceso a Jira Service Management (JSM)

**Jira Service Management (JSM)** es la herramienta de Atlassian enfocada en la gestión de soporte y resolución de incidencias. La configuración puede variar entre **Cloud** y **Data Center**.

### Diferencias entre Cloud y Data Center:
- En **Cloud**, JSM se inicia directamente desde el **Administrator Hub** y centraliza todos los proyectos y configuraciones.
- En **Data Center**, JSM se integra con el entorno local, y algunas configuraciones pueden depender de permisos específicos del servidor.

### Pasos para Iniciar JSM
- **En Cloud:**
  1. Desde el **Administrator Hub**, seleccionar **Jira Service Management**.
  2. Explorar la interfaz inicial de JSM, donde aparecen los proyectos existentes o la opción de crear un nuevo proyecto.

- **En Data Center:**
  1. Desde el menú de administración de Jira, ir a **Proyectos** y seleccionar **Administración de proyectos**.
  2. Seleccionar **Jira Service Management** para ver o crear un proyecto nuevo.

## 3. Creación de un Proyecto Nuevo en JSM

### Objetivo
Crear un proyecto específico para el Help Center de ANC en JSM que permita gestionar incidencias de clientes y problemas internos.

### Diferencias entre Cloud y Data Center en el Proceso de Creación de Proyecto:
- En **Jira Cloud**, el proceso de creación de proyectos utiliza un **wizard** (asistente interactivo) que guía al usuario paso a paso. Este wizard facilita el proceso al sugerir opciones y adaptando configuraciones automáticamente según la plantilla seleccionada.
- En **Jira Data Center**, el proceso se realiza a través de una pantalla con opciones de plantillas divididas por categorías (Software, Service, Business).

### Selección de Tipo de Proyecto en Data Center
Al crear un proyecto en **Jira Service Management (JSM)** en Data Center, se ofrecen tres tipos de proyectos de servicio bajo la categoría **Service**:
1. **Básico**: Orientado a la supervisión y priorización de solicitudes internas de la organización.
2. **Atención al Cliente**: Enfocado en la gestión de soporte a clientes externos, permitiendo registrar, priorizar y resolver incidencias.
3. **Gestión de Servicios de TI**: Diseñado para equipos de TI, abarcando la gestión de incidencias, problemas, cambios y activos de TI.

### Recomendación para el Proyecto ANC Help Center
Para el **ANC Help Center**, recomendamos seleccionar **Atención al Cliente** debido a su flexibilidad para gestionar tanto incidencias externas como internas. Esta plantilla permite adaptaciones para cubrir ambos tipos de solicitudes mediante configuraciones de tipos de incidencia y permisos.

### Paso a Paso en Data Center para Crear el Proyecto
1. Seleccionar la plantilla **Atención al Cliente** bajo la categoría **Service**.
2. Hacer clic en **Siguiente** para proceder con la configuración.
3. Configurar el **nombre**, la **clave** y la **descripción** del proyecto:
   - **Nombre del Proyecto**: "ANC Help Center"
   - **Clave del Proyecto**: "AHC"
   - **Descripción**: “Este proyecto está destinado a gestionar incidencias de soporte para clientes y reportes internos de problemas operativos de ANC”.
4. Confirmar y guardar la configuración inicial.

---

## Paginación

- **Capítulo Anterior:** [Configuración Inicial del Proyecto](01_ANC_Help_Center_Capitulo_1.md)
- **Siguiente Capítulo:** [Configuración de Usuarios, Roles y Grupos](03_ANC_Help_Center_Capitulo_3.md)

---
