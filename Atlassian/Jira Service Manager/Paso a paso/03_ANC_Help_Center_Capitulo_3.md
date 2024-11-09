# Capítulo 3: Configuración de Usuarios, Grupos y Permisos

---

## 3.1 Introducción

En este capítulo, configuraremos los **usuarios**, **roles**, y **permisos** esenciales para el proyecto **Anonymous Help Center (AHC)** en Jira. Esta configuración es clave para garantizar que cada usuario tenga acceso solo a las funcionalidades necesarias para su rol específico, estableciendo una estructura de permisos segura y eficiente.

---

## 3.2 Creación de Grupos y Roles

### 3.2.1 Creación del Grupo "Anonymous Help Center"

1. **Acceder a la Configuración de Grupos**:
   - Desde el menú principal de Jira, navega a **Jira settings** > **User management** > **Groups** (Configuración de Jira > Administración de usuarios > Grupos).
   
2. **Crear el Grupo**:
   - Haz clic en **Create Group** (Crear Grupo).
   - Nombra el grupo como **Anonymous Help Center**.
   - Guarda el grupo para proceder a la asignación de usuarios.

Este grupo se usará para gestionar los permisos de acceso general al proyecto, permitiendo que todos los usuarios asignados tengan una base de permisos compartida.

### 3.2.2 Creación de Roles

Para el proyecto AHC, hemos definido cuatro roles principales con funciones específicas:

- **AHC-Admin**: Administrador con permisos completos sobre el proyecto.
- **AHC-Supervisor**: Supervisor con capacidad para gestionar incidencias y asignar tareas.
- **AHC-Tecnico**: Técnico que aborda incidencias técnicas asignadas.
- **AHC-Operador**: Operador que gestiona las solicitudes iniciales, tanto internas como externas.

#### Pasos para Crear los Roles

1. **Acceder a la Configuración de Roles**:
   - Dirígete a **Jira settings** > **System** > **Project roles** (Configuración de Jira > Sistema > Roles del proyecto).
   
2. **Agregar Roles**:
   - Haz clic en **Add project role** (Agregar rol del proyecto).
   - Crea cada uno de los roles mencionados: **AHC-Admin**, **AHC-Supervisor**, **AHC-Tecnico**, **AHC-Operador**.
   - Guarda cada rol una vez creado.

---

## 3.3 Configuración del Esquema de Permisos

### 3.3.1 Creación del Esquema de Permisos Personalizado

1. **Acceder a la Configuración de Esquema de Permisos**:
   - Ve a **Jira settings** > **Issues** > **Permission schemes** (Configuración de Jira > Problemas > Esquemas de permisos).
   
2. **Crear un Nuevo Esquema de Permisos**:
   - Haz clic en **Add Permission Scheme** (Agregar esquema de permisos).
   - Nombra el esquema como **AHC-Permission Scheme**.
   - En la descripción, especifica que es un esquema personalizado para el proyecto **Anonymous Help Center**.

### 3.3.2 Asignación de Permisos por Rol

A continuación, se detallan los permisos asignados a cada rol dentro del esquema de permisos personalizado.

#### Permisos de Administración

| Permiso                           | AHC-Admin  | AHC-Supervisor | AHC-Tecnico | AHC-Operador |
|-----------------------------------|------------|----------------|-------------|--------------|
| Administrar proyectos             | ✔️         |                |             |              |
| Gestionar diseños de incidencia   | ✔️         |                |             |              |
| Editar flujos de trabajo          | ✔️         |                |             |              |

#### Permisos de Proyecto

| Permiso                           | AHC-Admin  | AHC-Supervisor | AHC-Tecnico | AHC-Operador | Grupo               |
|-----------------------------------|------------|----------------|-------------|--------------|---------------------|
| Buscar proyectos                  | ✔️         | ✔️             | ✔️          | ✔️           | Anonymous Help Center |
| Administrar sprints               | ✔️         |                |             |              |
| Agente del proyecto de asistencia | ✔️         | ✔️             | ✔️          | ✔️           |
| Ver datos agregados               | ✔️         | ✔️             |             |              |
| Ver herramientas de desarrollo    | ✔️         | ✔️             |             |              |
| Visualizar Flujo de Trabajo       | ✔️         | ✔️             | ✔️          | ✔️           |

#### Permisos en Incidencias

| Permiso                           | AHC-Admin  | AHC-Supervisor | AHC-Tecnico | AHC-Operador |
|-----------------------------------|------------|----------------|-------------|--------------|
| Usuario asignable                 | ✔️         | ✔️             | ✔️          |              |
| Asignar incidencias               | ✔️         | ✔️             | ✔️          |              |
| Cerrar Incidencias                | ✔️         | ✔️             |             |              |
| Crear incidencias                 | ✔️         | ✔️             | ✔️          | ✔️           |
| Borrar incidencias                | ✔️         |                |             |              |
| Editar incidencias                | ✔️         | ✔️             | ✔️          |              |
| Incidencias enlazadas             | ✔️         | ✔️             | ✔️          |              |
| Modificar Informador              | ✔️         |                |             |              |
| Mover incidencias                 | ✔️         | ✔️             |             |              |
| Resolver incidencias              | ✔️         | ✔️             | ✔️          |              |
| Programar incidencias             | ✔️         | ✔️             |             |              |
| Configurar la seguridad de la incidencia | ✔️  |                |             |              |
| Desplazar incidencias             | ✔️         | ✔️             |             |              |
| Restaurar incidencias archivadas  | ✔️         |                |             |              |

#### Permisos en Comentarios

| Permiso                           | AHC-Admin  | AHC-Supervisor | AHC-Tecnico | AHC-Operador |
|-----------------------------------|------------|----------------|-------------|--------------|
| Añadir comentario                 | ✔️         | ✔️             | ✔️          | ✔️           |
| Borrar todos los comentarios      | ✔️         |                |             |              |
| Borrar tus comentarios            | ✔️         | ✔️             | ✔️          | ✔️           |
| Editar todos los comentarios      | ✔️         |                |             |              |
| Editar tus comentarios            | ✔️         | ✔️             | ✔️          | ✔️           |

#### Permisos en Adjuntos

| Permiso                           | AHC-Admin  | AHC-Supervisor | AHC-Tecnico | AHC-Operador |
|-----------------------------------|------------|----------------|-------------|--------------|
| Crear archivos adjuntos           | ✔️         | ✔️             | ✔️          | ✔️           |
| Borrar todos los ficheros adjuntos| ✔️         |                |             |              |
| Borrar tus adjuntos               | ✔️         | ✔️             | ✔️          | ✔️           |

---

## 3.4 Asociación del Esquema de Permisos al Proyecto AHC

1. **Asociar el Esquema de Permisos al Proyecto**:
   - Ve a **Project settings** > **Permissions** (Configuración del proyecto > Permisos) para el proyecto **Anonymous Help Center**.
   - Haz clic en **Actions** y selecciona **Use a different scheme** (Usar un esquema diferente).
   - Selecciona **AHC-Permission Scheme** (el esquema de permisos personalizado que creamos).
   - Confirma el cambio para aplicar el esquema al proyecto.

---

## 3.5 Verificación y Pruebas

Una vez asignado el esquema de permisos:

1. **Verificación de Roles**:
   - Inicia sesión con usuarios de cada rol para confirmar que los permisos y accesos funcionan según lo planeado.

2. **Prueba de Funcionalidad**:
   - Asegúrate de que cada rol pueda realizar solo las acciones definidas en su esquema de permisos.

3. **Ajustes Finales**:
   - Realiza ajustes si es necesario, basándote en los resultados de las pruebas.

---

### Paginación

- **Capítulo Anterior**: [Creación del Proyecto](02_ANC_Help_Center_Capitulo_2.md)
- **Siguiente Capítulo**: [Configuración de Flujos de Trabajo y Pantallas](04_ANC_Help_Center_Capitulo_4.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/Repositorio)

