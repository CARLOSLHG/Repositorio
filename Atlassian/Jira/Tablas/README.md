
## TABLAS DE REFERENCIA

- **[Tabla 1: Propiedades de Workflow (Properties)](./Propiedades.md)**
- **[Tabla 2: Desencadenantes (Triggers)](./Triggers.md)**
- **[Tabla 3: Tabla de Condiciones (Conditions)](./Condiciones.md)**
- **[Tabla 4: Tabla de Validaciones (Validators)](./Validaciones.md)**
- **[Tabla 5: Tabla de PostFunciones (Post-functions)](./PostFunciones.md)**
- **[Tabla 6: JQL (Jira Query Language)](./JQL.md)**
- **[Tabla 7: Campos Inteligentes (SmartValues)](./SmartValues.md)**

## Notas y Recomendaciones Finales

* **Propiedades de Workflow (Properties)**:

  * Se añaden en la sección de configuración de la transición o del estado.  
  * Algunas requieren complementos (plugins) adicionales, o al menos permisos de administrador global.  
* **Campos Inteligentes (SmartValues)**:

  * Se usan mayormente en **Jira Automation**.  
  * La sintaxis puede variar dependiendo de la versión de Jira Data Center y de la configuración (en ocasiones, se requiere la notación `{{issue.fields.customfield_10001.value}}` o similar).  
  * Para asegurarte de la referencia exacta, revisa la documentación oficial de Atlassian o la opción “Use smart values” en el panel de configuración de la regla.

---
| [Regresar](././README.md) |

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