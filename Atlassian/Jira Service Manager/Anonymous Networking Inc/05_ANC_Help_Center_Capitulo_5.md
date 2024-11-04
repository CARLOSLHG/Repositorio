# Capítulo 5: Configuración Avanzada de Permisos

---

## Sección 1: Permisos a Nivel de Proyecto

En esta sección, configuraremos los permisos específicos a nivel de proyecto para cada rol en el proyecto **ANC Help Center**. Estos permisos afectan lo que cada usuario puede ver y hacer en todo el proyecto, estableciendo las bases para la seguridad y el control de acceso en Jira.

#### Paso 1: Acceder a la Configuración de Permisos del Proyecto

1. Dirígete a **Project Settings** (Configuración del Proyecto) en el proyecto **ANC Help Center**.
2. En el menú de la izquierda, selecciona **Permissions** (Permisos) para acceder a la configuración de permisos del proyecto.

#### Paso 2: Configurar Permisos Básicos

A continuación, configuraremos algunos de los permisos más relevantes, asignándolos a roles específicos:

1. **Browse Projects (Ver Proyecto)**:
   - **Asignación**: `Administrador`, `Agente Interno`, `Agente de Cliente`, `Project Admin`
   - **Descripción**: Permite a los usuarios ver el proyecto y acceder a las incidencias en él. Este permiso es esencial para todos los roles que interactuarán con las incidencias del proyecto.

2. **Create Issues (Crear Incidencias)**:
   - **Asignación**: `Agente Interno`, `Agente de Cliente`
   - **Descripción**: Permite a los agentes crear nuevas incidencias en el proyecto. Este permiso es necesario tanto para los agentes internos como para los agentes de cliente, ya que ambos necesitan reportar problemas.

3. **Edit Issues (Editar Incidencias)**:
   - **Asignación**: `Agente Interno`, `Agente de Cliente`, `Project Admin`
   - **Descripción**: Permite editar el contenido de las incidencias. Este permiso es clave para los agentes y administradores que deben actualizar la información durante el ciclo de vida de la incidencia.

4. **Assign Issues (Asignar Incidencias)**:
   - **Asignación**: `Administrador`, `Project Admin`
   - **Descripción**: Permite asignar incidencias a otros usuarios dentro del proyecto. Los administradores y el project admin son responsables de esta acción para una distribución efectiva de trabajo.

5. **Transition Issues (Transicionar Incidencias)**:
   - **Asignación**: `Agente Interno`, `Agente de Cliente`
   - **Descripción**: Permite mover una incidencia de un estado a otro dentro del flujo de trabajo. Este permiso es fundamental para los agentes que necesitan gestionar el avance de las incidencias.

#### Paso 3: Guardar la Configuración de Permisos

1. Una vez configurados los permisos principales, revisa los permisos restantes y ajusta según las necesidades del proyecto.
2. Haz clic en **Save** (Guardar) para aplicar los cambios en la configuración de permisos del proyecto.

---

## Sección 2: Permisos para Roles y Grupos

Aquí configuraremos los permisos detallados para roles y grupos específicos, alineados con los requisitos del proyecto. Estos roles fueron creados en capítulos anteriores, y ahora asignaremos permisos para cada uno.

#### Paso 1: Definir Roles Clave y Asignaciones de Permisos

1. **Administrador**:
   - **Descripción**: Responsable de la gestión completa del proyecto, incluyendo la administración de usuarios y la configuración de permisos.
   - **Permisos Clave**:
     - `Administer Project` (Administrar Proyecto)
     - `Browse Projects` (Ver Proyecto)
     - `Assign Issues` (Asignar Incidencias)
     - `Transition Issues` (Transicionar Incidencias)

2. **Agente Interno**:
   - **Descripción**: Encargado de gestionar incidencias internas y dar soporte a empleados dentro de la empresa.
   - **Permisos Clave**:
     - `Create Issues` (Crear Incidencias)
     - `Edit Issues` (Editar Incidencias)
     - `Transition Issues` (Transicionar Incidencias)

3. **Agente de Cliente**:
   - **Descripción**: Responsable de gestionar las incidencias de clientes externos y proporcionar soporte directo.
   - **Permisos Clave**:
     - `Create Issues` (Crear Incidencias)
     - `Edit Issues` (Editar Incidencias)
     - `Transition Issues` (Transicionar Incidencias)

4. **Project Admin**:
   - **Descripción**: Encargado de administrar las configuraciones y gestión diaria del proyecto sin acceso completo a la administración global.
   - **Permisos Clave**:
     - `Administer Project` (Administrar Proyecto)
     - `Browse Projects` (Ver Proyecto)
     - `Assign Issues` (Asignar Incidencias)
     - `Edit Issues` (Editar Incidencias)

#### Paso 2: Asignación de Permisos por Grupo

1. Dirígete a **Project Settings > Permissions**.
2. Selecciona cada permiso y asigna los roles específicos configurados anteriormente.
3. Guarda la configuración una vez completada.

---

## Sección 3: Permisos a Nivel de Incidencia

Esta sección aborda la configuración de permisos específicos a nivel de incidencia, lo que permite definir quién puede ver, editar, y cerrar cada tipo de incidencia, ya sea interna o de cliente.

#### Paso 1: Configuración de Permisos por Tipo de Incidencia

1. **AHC-Incidencia Interna**:
   - **Ver Incidencia** (`Browse Issues`): Agente Interno, Administrador.
   - **Editar Incidencia** (`Edit Issues`): Agente Interno, Administrador.
   - **Cerrar Incidencia** (`Close Issues`): Administrador, solicitante original de la incidencia.

2. **AHC-Incidencia de Cliente**:
   - **Ver Incidencia** (`Browse Issues`): Agente de Cliente, Administrador.
   - **Editar Incidencia** (`Edit Issues`): Agente de Cliente, Administrador.
   - **Cerrar Incidencia** (`Close Issues`): Administrador, cliente que reportó la incidencia.

#### Paso 2: Aplicar Permisos por Tipo de Incidencia

1. Accede a **Project Settings > Permissions**.
2. Configura los permisos correspondientes en cada tipo de incidencia, asegurándote de que se asignan solo a los roles y grupos correctos para evitar accesos no deseados.

---

## Sección 4: Pruebas y Verificación de Permisos

Es crucial realizar pruebas para asegurarse de que la configuración de permisos funcione correctamente y que cada usuario tenga el acceso adecuado. En esta sección, probaremos el acceso desde diferentes roles y usuarios para confirmar que los permisos están correctamente aplicados.

#### Paso 1: Crear Usuarios de Prueba

1. Crea usuarios de prueba con roles específicos (Administrador, Agente Interno, Agente de Cliente, Project Admin).
2. Asigna cada usuario a su rol correspondiente.

#### Paso 2: Probar Acceso y Acciones Permitidas

1. **Verificar Acceso**: Confirma que cada usuario solo puede ver el contenido al que tiene permiso.
2. **Crear y Editar Incidencias**: Asegúrate de que los agentes pueden crear y editar incidencias según el tipo asignado.
3. **Transiciones y Cierre de Incidencias**: Verifica que solo los roles autorizados pueden transicionar y cerrar incidencias.

#### Paso 3: Revisión Final y Ajustes

1. Si se encuentran problemas en el acceso o permisos, ajusta la configuración en **Project Settings > Permissions**.
2. Una vez confirmada la configuración, guarda los cambios y concluye las pruebas.

---

### Paginación

- **Capítulo Anterior**: [Configuración de Incidencias, Flujos de Trabajo y Pantallas](04_ANC_Help_Center_Capitulo_4.md)
- **Siguiente Capítulo**: [Configuración de Notificaciones y Automatizaciones](06_ANC_Help_Center_Capitulo_6.md)

---

[Volver al repositorio principal](https://carloslhg.github.io/repositorio)
