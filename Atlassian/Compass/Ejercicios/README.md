# Ejercicios para Compass

---

## Ejercicio 1: Exploración de la Interfaz y Configuración Inicial

**Nivel:**  
Básico

**Título:**  
Exploración y Configuración Inicial de Compass

**Caso Hipotético:**  
El equipo de "Innovatech" ha adquirido Compass para gestionar la arquitectura y los componentes técnicos de sus productos. Ana, nueva usuaria del sistema, debe explorar la interfaz de Compass y realizar la configuración inicial para familiarizarse con la herramienta.

**Objetivos:**  
- Conocer la interfaz principal de Compass.  
- Configurar los parámetros básicos (idioma, zona horaria, etc.).  
- Ubicar secciones clave como "Componentes", "Relaciones" y "Dashboard".

**Plan de Acción:**  
1. Iniciar sesión en la instancia de Compass.  
2. Explorar el menú principal y las secciones de navegación.  
3. Acceder a la configuración general para ajustar parámetros básicos.  
4. Tomar nota de las funcionalidades y áreas clave.

**Resolución Paso a Paso:**

1. **Inicio de Sesión:**  
   - Ingresa a la URL de Compass y accede con tus credenciales.

2. **Exploración del Dashboard:**  
   - Navega por la página principal, identifica el menú lateral (Componentes, Relaciones, Reportes, etc.) y la barra superior de configuración.

3. **Configuración Inicial:**  
   - Dirígete a la sección de configuración general y ajusta parámetros básicos (idioma, zona horaria).  
   - Guarda los cambios y refresca la página para ver la aplicación de la configuración.

4. **Documentación:**  
   - Anota en un documento las áreas principales y funcionalidades encontradas para referencia futura.

---

## Ejercicio 2: Creación y Organización de Componentes

**Nivel:**  
Básico-Intermedio

**Título:**  
Registro y Organización de Componentes en Compass

**Caso Hipotético:**  
Siguiendo el proceso de adopción de Compass, Ana debe crear los primeros componentes del sistema para el proyecto "Plataforma Innovatech". Estos componentes representan servicios y módulos críticos que serán gestionados en la herramienta.

**Objetivos:**  
- Crear nuevos componentes en Compass.  
- Definir nombres, descripciones y categorías para cada componente.  
- Organizar los componentes en una estructura lógica.

**Plan de Acción:**  
1. Acceder a la sección "Componentes" de Compass.  
2. Hacer clic en "Crear Componente".  
3. Completar el formulario con nombre, descripción y categoría.  
4. Repetir el proceso para varios componentes (por ejemplo, "Servicio de Autenticación", "API Gateway").  
5. Organizar los componentes mediante etiquetas o agrupaciones.

**Resolución Paso a Paso:**

1. **Acceso a Componentes:**  
   - En el menú lateral, selecciona la opción "Componentes".

2. **Creación del Primer Componente:**  
   - Haz clic en **Crear Componente**.  
   - Introduce el nombre "Servicio de Autenticación", añade una breve descripción y selecciona la categoría correspondiente.

3. **Creación de Múltiples Componentes:**  
   - Repite el proceso para otros componentes clave, como "API Gateway", "Módulo de Pago" y "Base de Datos".
   - Utiliza etiquetas o campos de agrupación para organizar los componentes en función de su funcionalidad.

4. **Verificación:**  
   - Revisa la lista de componentes para asegurarte de que se han creado correctamente y que la organización es clara.

---

## Ejercicio 3: Configuración de Metadatos y Relaciones entre Componentes

**Nivel:**  
Intermedio

**Título:**  
Definición de Metadatos y Vinculación de Componentes

**Caso Hipotético:**  
Ahora que el equipo ha registrado varios componentes, Ana debe agregar metadatos (por ejemplo, propietarios, estado, versión) y establecer relaciones entre ellos para reflejar dependencias y flujos de integración.

**Objetivos:**  
- Añadir metadatos relevantes a cada componente.  
- Configurar relaciones (dependencias, integraciones, colisiones) entre componentes.  
- Facilitar la visibilidad de la arquitectura técnica a otros equipos.

**Plan de Acción:**  
1. Seleccionar un componente y editar sus detalles.  
2. Agregar campos de metadatos como "Propietario", "Estado" y "Versión".  
3. Configurar relaciones con otros componentes (por ejemplo, el "Servicio de Autenticación" depende del "API Gateway").  
4. Guardar los cambios y revisar el diagrama de relaciones.

**Resolución Paso a Paso:**

1. **Edición de Componentes:**  
   - En la lista de componentes, selecciona "Servicio de Autenticación" y haz clic en **Editar**.

2. **Agregar Metadatos:**  
   - Introduce el nombre del propietario (por ejemplo, "Equipo de Seguridad"), el estado (en desarrollo, en producción) y la versión actual.
   - Guarda los cambios.

3. **Establecer Relaciones:**  
   - Dentro del mismo formulario o en la sección de relaciones, vincula "Servicio de Autenticación" con "API Gateway" indicando que existe una dependencia.
   - Repite el proceso para otros componentes según corresponda.

4. **Verificación:**  
   - Revisa el diagrama o vista de relaciones en Compass para confirmar que las dependencias se muestran correctamente.

---

## Ejercicio 4: Integración con Repositorios y Herramientas Externas

**Nivel:**  
Intermedio-Avanzado

**Título:**  
Vinculación de Componentes con Repositorios de Código y Herramientas Externas

**Caso Hipotético:**  
El equipo de Innovatech decide integrar Compass con sus repositorios de código (por ejemplo, Bitbucket) y otras herramientas de CI/CD para automatizar la actualización de metadatos y la trazabilidad de los componentes.

**Objetivos:**  
- Configurar la integración de Compass con repositorios externos.  
- Automatizar la actualización de información de los componentes basándose en commits y Pull Requests.  
- Mejorar la trazabilidad y el seguimiento de versiones.

**Plan de Acción:**  
1. Acceder a la sección de Integraciones en Compass.  
2. Configurar la conexión con un repositorio de Bitbucket.  
3. Mapear componentes de Compass con proyectos o repositorios correspondientes.  
4. Establecer reglas para la actualización automática de metadatos (por ejemplo, versión o estado) cuando se realicen cambios en el código.

**Resolución Paso a Paso:**

1. **Acceso a Integraciones:**  
   - Desde el menú principal, selecciona la opción "Integraciones".

2. **Configuración de la Conexión:**  
   - Selecciona Bitbucket y sigue el proceso de autenticación para conectar la cuenta de repositorios.

3. **Mapeo de Componentes:**  
   - Para cada componente, vincula el repositorio o proyecto de código correspondiente (por ejemplo, "Servicio de Autenticación" se vincula al repositorio `auth-service`).

4. **Automatización de Actualizaciones:**  
   - Define reglas o utiliza webhooks que, al detectarse un commit o Pull Request, actualicen la versión y el estado del componente en Compass.

5. **Verificación:**  
   - Realiza un cambio de prueba en el repositorio y verifica que los metadatos del componente en Compass se actualicen automáticamente.

---

## Ejercicio 5: Creación de Dashboards y Reportes Personalizados

**Nivel:**  
Avanzado

**Título:**  
Diseño de Dashboards y Reportes para el Seguimiento de Componentes

**Caso Hipotético:**  
Para facilitar el monitoreo del estado y el rendimiento de la arquitectura, el equipo de Innovatech requiere crear dashboards personalizados en Compass. Estos dashboards deben incluir reportes visuales sobre el estado de los componentes, dependencias y métricas de rendimiento.

**Objetivos:**  
- Crear dashboards personalizados en Compass.  
- Incluir gadgets y reportes que muestren información relevante (estado, versión, dependencias).  
- Compartir el dashboard con stakeholders técnicos y de producto.

**Plan de Acción:**  
1. Acceder a la sección "Dashboards" en Compass.  
2. Crear un nuevo dashboard y asignarle un nombre descriptivo.  
3. Añadir widgets o gadgets que muestren datos de componentes y relaciones.  
4. Configurar filtros y parámetros de visualización.  
5. Compartir el dashboard con el equipo y verificar la actualización en tiempo real.

**Resolución Paso a Paso:**

1. **Creación del Dashboard:**  
   - En el menú principal, selecciona "Dashboards" y haz clic en **Crear Dashboard**.  
   - Asigna un nombre como "Seguimiento Arquitectura Innovatech".

2. **Añadir Gadgets:**  
   - Inserta widgets que muestren el estado de los componentes, gráficos de dependencias y reportes de cambios.  
   - Configura cada gadget con los filtros pertinentes (por ejemplo, componentes en estado "En producción").

3. **Personalización y Ajustes:**  
   - Ajusta el diseño y la disposición de los gadgets para facilitar la lectura y análisis.  
   - Guarda el dashboard.

4. **Verificación y Compartir:**  
   - Revisa el dashboard para confirmar que los datos se actualicen correctamente.  
   - Comparte el enlace con los miembros del equipo y stakeholders.

---

## Ejercicio 6: Automatización de Flujos de Trabajo y Gobernanza de Componentes

**Nivel:**  
Avanzado-Experto

**Título:**  
Implementación de Reglas de Automatización para la Gobernanza de Componentes

**Caso Hipotético:**  
Innovatech requiere que ciertos procesos relacionados con la actualización de componentes se automaticen para mantener la gobernanza y la calidad de la arquitectura. Por ejemplo, cuando un componente alcanza una versión crítica, debe dispararse una revisión automática y una notificación a los responsables.

**Objetivos:**  
- Configurar reglas de automatización en Compass para gestionar actualizaciones y revisiones de componentes.  
- Establecer disparadores basados en cambios de metadatos (por ejemplo, incremento de versión, cambio de estado).  
- Notificar automáticamente a los equipos responsables cuando se cumplan ciertas condiciones.

**Plan de Acción:**  
1. Acceder a la sección de Automatización en Compass.  
2. Crear una nueva regla de automatización basada en disparadores específicos.  
3. Configurar condiciones para detectar actualizaciones críticas (por ejemplo, versión mayor).  
4. Establecer acciones como notificaciones y asignación de revisiones.  
5. Probar la automatización con cambios de prueba y verificar los resultados.

**Resolución Paso a Paso:**

1. **Acceso a Automatización:**  
   - Desde el menú principal, selecciona "Automatización" o "Workflows" de Compass.

2. **Creación de la Regla:**  
   - Haz clic en **Crear Nueva Regla** y selecciona el disparador, por ejemplo, "Actualización de Componente".

3. **Definir Condiciones:**  
   - Configura la condición para detectar un cambio crítico en la versión (por ejemplo, de v1.x a v2.0) o un cambio de estado a "En Revisión".

4. **Configurar Acciones:**  
   - Define la acción para enviar una notificación al equipo de arquitectura o asignar la revisión del componente.  
   - Guarda la regla y activa la automatización.

5. **Prueba y Verificación:**  
   - Realiza un cambio de prueba en un componente para activar la regla.  
   - Revisa que se envíe la notificación y que la acción programada se ejecute correctamente.

---

## Ejercicio 7: Integración Completa con Atlassian y Herramientas de Monitoreo

**Nivel:**  
Experto

**Título:**  
Integración de Compass con Jira, Bitbucket y Herramientas de Monitoreo

**Caso Hipotético:**  
Para lograr una visión holística del producto, Innovatech quiere integrar Compass con otros productos Atlassian (Jira y Bitbucket) y herramientas de monitoreo (por ejemplo, Prometheus o Grafana). Esto permitirá que los cambios en los componentes, issues y despliegues se reflejen automáticamente en Compass, mejorando la trazabilidad y la gobernanza a nivel empresarial.

**Objetivos:**  
- Integrar Compass con Jira y Bitbucket para vincular issues, commits y componentes.  
- Configurar la conexión con herramientas de monitoreo para actualizar métricas de rendimiento en tiempo real.  
- Validar la integración completa y la sincronización de datos entre las plataformas.

**Plan de Acción:**  
1. Revisar la documentación de integración de Compass con Jira y Bitbucket.  
2. Configurar la conexión entre Compass y Jira para importar issues relacionados con componentes.  
3. Vincular los repositorios de Bitbucket con los componentes en Compass para actualizar versiones y cambios.  
4. Conectar Compass con una herramienta de monitoreo (configurando un webhook o API) para importar métricas.  
5. Realizar pruebas integrales para verificar la sincronización de datos y la actualización automática de la información.

**Resolución Paso a Paso:**

1. **Integración con Jira:**  
   - Accede a la sección de Integraciones en Compass.  
   - Configura la conexión con Jira utilizando las credenciales y la URL de la instancia.  
   - Define los criterios para importar issues y vincularlos a componentes específicos.

2. **Integración con Bitbucket:**  
   - En la misma sección de Integraciones, conecta Bitbucket.  
   - Mapea repositorios con componentes para que los cambios de código actualicen automáticamente la versión y el estado.

3. **Conexión con Herramientas de Monitoreo:**  
   - Configura un webhook o utiliza la API para integrar datos de una herramienta de monitoreo.  
   - Define qué métricas se importarán (por ejemplo, tiempos de respuesta, uso de recursos) y vincúlalas a los componentes.

4. **Pruebas y Validación:**  
   - Realiza cambios de prueba en Jira y Bitbucket para ver reflejados los cambios en Compass.  
   - Verifica que las métricas de la herramienta de monitoreo se actualicen en el dashboard de Compass.
   - Ajusta las configuraciones según sea necesario para asegurar una integración fluida.

---

## Fe Errata

debido a que la plataforma de Atlassian cambia constantemente, algunos menus y accesos podrian estar cambiados.

---
| [Regresar](../README.md) |


### 🙏 ¡Gracias por visitar mi repositorio!

