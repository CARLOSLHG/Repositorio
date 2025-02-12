# Ejercicios para Administradores de JIRA

Este documento contiene 5 ejercicios para Administradores de JIRA, organizados de menor a mayor complejidad. Cada ejercicio sigue la siguiente estructura:

- **Subtítulo**
- **Título**
- **Caso Hipotético**
- **Objetivos**
- **Plan de Acción**
- **Resolución Paso a Paso**

---

## Ejercicio 1: Configuración Inicial y Personalización de la Instancia JIRA

**Subtítulo:**  
Ejercicio Básico 1 para Administradores de JIRA

**Título:**  
Configuración Inicial y Personalización de la Instancia

**Caso Hipotético:**  
Como nuevo Administrador de JIRA, Ana ha sido designada para configurar la instancia global. Debe establecer los parámetros básicos de la plataforma, personalizar la apariencia y configurar las opciones generales de funcionamiento para adaptarla a las políticas de la organización.

**Objetivos:**  
- Configurar los parámetros básicos de la instancia JIRA.  
- Personalizar la apariencia (logo, colores, etc.) y otros ajustes generales.  
- Familiarizarse con el JIRA Administration Hub y las opciones globales.

**Plan de Acción:**  
1. Iniciar sesión en el JIRA Administration Hub con credenciales de administrador global.  
2. Revisar la sección de **Configuración General** para ajustar opciones básicas (idioma, zona horaria, etc.).  
3. Personalizar la apariencia de la instancia (logo, colores corporativos).  
4. Configurar las opciones generales como la URL base, el nombre de la instancia y otras preferencias globales.  
5. Guardar los cambios y verificar que la personalización se refleje correctamente en toda la plataforma.

**Resolución Paso a Paso:**

1. **Inicio de Sesión y Acceso al Hub de Administración:**  
   - Ingresa a la URL de administración global (por ejemplo, `https://<tu-dominio>.atlassian.net/admin`).  
   - Inicia sesión con tus credenciales de administrador.

2. **Configuración General:**  
   - En el menú lateral, selecciona **Configuración General**.  
   - Ajusta la zona horaria, el idioma y otras preferencias básicas de la instancia.

3. **Personalización de la Apariencia:**  
   - Accede a la sección de **Apariencia** o **Branding**.  
   - Sube el logo corporativo, define los colores y personaliza otros elementos visuales.

4. **Ajuste de Preferencias Globales:**  
   - Verifica la configuración de la URL base y el nombre de la instancia.  
   - Realiza cualquier ajuste adicional que se requiera (como la configuración de políticas de privacidad o términos de servicio).

5. **Guardado y Verificación:**  
   - Guarda los cambios realizados y navega por la instancia para confirmar que la personalización se ha aplicado en todas las áreas.

---

## Ejercicio 2: Gestión Global de Usuarios y Grupos

**Subtítulo:**  
Ejercicio Básico-Intermedio 2 para Administradores de JIRA

**Título:**  
Administración Global de Usuarios y Grupos

**Caso Hipotético:**  
Carlos, como Administrador Global, debe organizar a los empleados de la organización en grupos y gestionar los usuarios en la instancia JIRA. Esto incluye la creación de usuarios, su organización en grupos y la asignación de permisos globales.

**Objetivos:**  
- Crear y gestionar usuarios a nivel global.  
- Organizar usuarios en grupos (por ejemplo, “Equipo TI”, “Soporte”, “Gestión”).  
- Asignar permisos globales y roles a los usuarios y grupos.

**Plan de Acción:**  
1. Acceder al JIRA Administration Hub y dirigirse a la sección de **Usuarios y Grupos**.  
2. Crear nuevos usuarios o invitar a usuarios existentes.  
3. Organizar usuarios en grupos según las áreas de la organización.  
4. Configurar permisos y roles globales para cada grupo.  
5. Verificar que los cambios se reflejen en la instancia y que los usuarios tengan los accesos correspondientes.

**Resolución Paso a Paso:**

1. **Acceso a la Administración de Usuarios:**  
   - Inicia sesión en el JIRA Administration Hub.  
   - Selecciona **Usuarios y Grupos** en el menú de administración.

2. **Creación y Gestión de Usuarios:**  
   - Haz clic en **Agregar Usuario** o utiliza la opción para invitar a nuevos usuarios mediante correo electrónico.  
   - Completa los datos requeridos (nombre, correo, etc.).

3. **Organización en Grupos:**  
   - Crea grupos (por ejemplo, “Equipo TI”, “Soporte”, “Gestión”) si aún no existen.  
   - Asigna los usuarios recién creados o existentes a los grupos correspondientes.

4. **Asignación de Permisos Globales:**  
   - Dirígete a la sección de **Roles y Permisos Globales**.  
   - Configura los permisos que cada grupo debe tener, asegurando que se cumplan las políticas de seguridad de la organización.

5. **Verificación:**  
   - Revisa que los usuarios y grupos tengan los accesos previstos realizando pruebas de inicio de sesión y navegación en la instancia.

---

## Ejercicio 3: Configuración de Seguridad y Autenticación Global

**Subtítulo:**  
Ejercicio Intermedio 3 para Administradores de JIRA

**Título:**  
Configuración de Seguridad y Autenticación (SSO, MFA)

**Caso Hipotético:**  
Sofía, Administradora Global, debe reforzar la seguridad de la instancia JIRA configurando la autenticación única (SSO) y la autenticación multifactor (MFA). Esto garantizará que solo los usuarios autorizados puedan acceder a la plataforma de manera segura.

**Objetivos:**  
- Configurar la autenticación única (SSO) para la instancia.  
- Habilitar la autenticación multifactor (MFA) para mayor seguridad.  
- Asegurarse de que las políticas de seguridad cumplan con las normativas de la organización.

**Plan de Acción:**  
1. Acceder al JIRA Administration Hub y dirigirse a la sección de **Seguridad** o **Autenticación**.  
2. Configurar SSO integrando la instancia con un proveedor de identidad (por ejemplo, Okta, Azure AD).  
3. Habilitar MFA para los usuarios de la instancia.  
4. Revisar las políticas de seguridad global y ajustarlas según las necesidades de la organización.  
5. Realizar pruebas de acceso para verificar la implementación.

**Resolución Paso a Paso:**

1. **Acceso a la Configuración de Seguridad:**  
   - Inicia sesión en el JIRA Administration Hub.  
   - Dirígete a **Seguridad** o **Autenticación** en el menú.

2. **Configuración de SSO:**  
   - Selecciona la opción para configurar la autenticación única.  
   - Introduce los datos del proveedor de identidad (IDP), siguiendo la documentación correspondiente.  
   - Guarda la configuración y verifica que se establezca la conexión.

3. **Habilitación de MFA:**  
   - En la misma sección de seguridad, habilita la autenticación multifactor.  
   - Configura los métodos disponibles (por ejemplo, autenticación por SMS, aplicación móvil o correo).  
   - Comunica a los usuarios el proceso para configurar MFA en sus cuentas.

4. **Ajuste de Políticas y Pruebas:**  
   - Revisa las políticas de seguridad y ajusta parámetros adicionales si es necesario.  
   - Realiza pruebas de inicio de sesión para asegurarte de que SSO y MFA funcionen correctamente.

5. **Verificación Final:**  
   - Confirma que todos los usuarios estén registrados correctamente en el sistema y que la autenticación funcione sin problemas.

---

## Ejercicio 4: Configuración de Correos Salientes y Notificaciones Globales

**Subtítulo:**  
Ejercicio Intermedio-Avanzado 4 para Administradores de JIRA

**Título:**  
Configuración del Servidor de Correo y Notificaciones Globales

**Caso Hipotético:**  
Diego, Administrador Global, debe configurar el servidor de correo saliente para que JIRA pueda enviar notificaciones y alertas globales a todos los usuarios. Además, debe personalizar las plantillas de correo para alinearlas con la imagen corporativa.

**Objetivos:**  
- Configurar el servidor de correo saliente en JIRA.  
- Personalizar las plantillas de correo para notificaciones.  
- Verificar que los correos se envíen correctamente y se adapten a la imagen corporativa.

**Plan de Acción:**  
1. Acceder al JIRA Administration Hub y dirigirse a la sección de **Correo** o **Notificaciones**.  
2. Configurar el servidor SMTP con los datos proporcionados por el departamento de IT.  
3. Personalizar las plantillas de notificación (asunto, cuerpo, logotipos).  
4. Realizar pruebas enviando correos de notificación a un grupo de usuarios.  
5. Ajustar la configuración según los resultados de las pruebas.

**Resolución Paso a Paso:**

1. **Acceso a la Configuración de Correo:**  
   - Inicia sesión en el JIRA Administration Hub.  
   - Selecciona **Correo Saliente** en el menú de administración.

2. **Configuración del Servidor SMTP:**  
   - Introduce la dirección del servidor SMTP, puerto, método de encriptación (SSL/TLS) y credenciales necesarias.  
   - Guarda la configuración y realiza una prueba de conexión.

3. **Personalización de Plantillas de Notificación:**  
   - Accede a la sección de **Plantillas de Correo** o **Notificaciones**.  
   - Modifica el asunto, cuerpo y añade el logo de la empresa según las directrices corporativas.

4. **Prueba de Envío:**  
   - Envía un correo de prueba a un usuario o grupo de prueba.  
   - Verifica que el correo se reciba y que el formato sea el esperado.

5. **Ajustes y Confirmación:**  
   - Ajusta la configuración si se detectan errores o inconsistencias.  
   - Confirma que todos los correos se envíen de manera correcta y profesional.

---

## Ejercicio 5: Gestión de Licencias, Facturación y Actualizaciones de la Instancia

**Subtítulo:**  
Ejercicio Avanzado 5 para Administradores de JIRA

**Título:**  
Administración de Licencias, Facturación y Actualizaciones de la Plataforma

**Caso Hipotético:**  
Mariana, Administradora Global, es responsable de gestionar las licencias, la facturación y las actualizaciones de la instancia JIRA. Debe asegurarse de que la plataforma se mantenga actualizada, que la facturación se gestione de forma correcta y que se monitoree el uso de la licencia para evitar interrupciones en el servicio.

**Objetivos:**  
- Revisar y administrar las licencias de la instancia JIRA.  
- Configurar y gestionar la facturación de la plataforma.  
- Planificar y aplicar actualizaciones de la instancia sin interrumpir el servicio.

**Plan de Acción:**  
1. Acceder al JIRA Administration Hub y dirigirse a la sección de **Licencias y Facturación**.  
2. Revisar el estado actual de las licencias y la configuración de facturación.  
3. Configurar alertas para el monitoreo del uso de la licencia.  
4. Planificar la actualización de la instancia según las recomendaciones de Atlassian.  
5. Realizar pruebas y aplicar la actualización en un entorno controlado antes de implementarla globalmente.

**Resolución Paso a Paso:**

1. **Acceso a Licencias y Facturación:**  
   - Inicia sesión en el JIRA Administration Hub.  
   - Selecciona **Licencias y Facturación** o una opción similar en el menú.

2. **Revisión del Estado de Licencias:**  
   - Verifica el número de licencias disponibles, el consumo actual y la fecha de expiración.  
   - Configura alertas para recibir notificaciones cuando se acerque el límite.

3. **Configuración de Facturación:**  
   - Revisa la información de facturación y actualiza los métodos de pago o datos de contacto si es necesario.  
   - Asegúrate de que los datos sean correctos para evitar interrupciones en el servicio.

4. **Planificación de Actualizaciones:**  
   - Consulta la documentación de Atlassian para conocer las actualizaciones disponibles.  
   - Planifica la actualización en un entorno de pruebas o sandbox para evaluar el impacto.

5. **Implementación y Verificación:**  
   - Aplica la actualización en la instancia global siguiendo las guías de Atlassian.  
   - Verifica que la actualización se haya realizado sin incidencias y que la facturación y licencias se mantengan correctamente.

---

## Fe Errata

debido a que la plataforma de Atlassian cambia constantemente, algunos menus y accesos podrian estar cambiados.


---
| [Regresar](../README.md) |


### 🙏 ¡Gracias por visitar mi repositorio!

Si quieres invitarme un café por mi trabajo, y asi motivarme a subir más cosas útiles, haz clic en el botón:

<form action="https://www.paypal.com/donate" method="post" target="_blank">
  <!-- Tu hosted_button_id generado en PayPal -->
  <input type="hidden" name="hosted_button_id" value="8CBQUB38L9ESN" />
  
  <!-- Imagen oficial de botón de PayPal Donar -->
  <input type="image" 
         src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" 
         border="0" name="submit" 
         title="PayPal - The safer, easier way to pay online!" 
         alt="Botón Donar con PayPal" />
         
  <!-- Pixel de seguimiento (monitoreo) de PayPal -->
  <img alt="" border="0" 
       src="https://www.paypal.com/es_ES/i/scr/pixel.gif" 
       width="1" height="1" />
</form>