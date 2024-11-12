# Proyectos Atlassian
---
<style>
    /* Estilos de la tabla */
    table {
      margin: auto;
      border-collapse: collapse;
      text-align: center;
    }
    td {
      padding: 10px;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:nth-child(odd) {
      background-color: #ffffff;
    }

    /* Estilos para la ventana modal */
    .modal {
      display: none; /* Oculto por defecto */
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
    .modal-content {
      margin: 10% auto;
      display: block;
      max-width: 80%;
    }
    .close {
      position: absolute;
      top: 20px;
      right: 35px;
      color: #fff;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>

<div style="text-align: center;">
  <table>
    <tr>
      <td>
        <img src="./Container/bdg_ace_emeritus.png" alt="ACE-Emeritus" width="25%" onclick="openModal('./Container/bdg_ace_emeritus.png')">
        <br>
        <a href="https://cp.certmetrics.com/atlassian/en/public/badge/c?id=AT00235075&ccat=62&date=2024-2-8"><em>Expert Emeritus</em></a>
      </td>
      <td>
        <img src="./Container/bdg_ace.png" alt="ACE" width="25%" onclick="openModal('./Container/bdg_ace.png')">
        <br>
        <a href="https://cp.certmetrics.com/atlassian/en/public/badge/r?id=262966&date=2024-1-30"><em>Certified Expert</em></a>
      </td>
      <td>
        <img src="./Container/bdg_acp-520.png" alt="Cloud-Organization-Admin" width="25%" onclick="openModal('./Container/bdg_acp-520.png')">
        <br>
        <a href="https://cp.certmetrics.com/atlassian/en/public/badge/c?id=557058:708d623c-a4cf-448f-900b-27999a96abda&ccat=52&date=2023-11-13"><em>Cloud Organization Admin</em></a>
      </td>
    </tr>
    <tr>
      <td>
        <img src="./Container/bdg_acp-620.png" alt="MJP-For-Cloud" width="25%" onclick="openModal('./Container/bdg_acp-620.png')">
        <br>
        <a href="https://cp.certmetrics.com/atlassian/en/public/badge/c?id=557058:708d623c-a4cf-448f-900b-27999a96abda&ccat=30&date=2023-12-12"><em>Managing Jira Projects for Cloud</em></a>
      </td>
      <td>
        <img src="./Container/bdg_acp-120.png" alt="Jira-Administrator-for-Cloud" width="25%" onclick="openModal('./Container/bdg_acp-120.png')">
        <br>
        <a href="https://cp.certmetrics.com/atlassian/en/public/badge/c?id=557058:708d623c-a4cf-448f-900b-27999a96abda&ccat=26&date=2024-1-24"><em>Jira Administrator for Cloud</em></a>
      </td>
      <td>
        <img src="./Container/bdg_apb-220.png" alt="Confluence-Space-Administration" width="25%" onclick="openModal('./Container/bdg_apb-220.png')">
        <br>
        <a href="https://cp.certmetrics.com/atlassian/en/public/badge/c?id=557058:708d623c-a4cf-448f-900b-27999a96abda&ccat=35&date=2024-1-30"><em>Confluence Space Administration</em></a>
      </td>
    </tr>
  </table>
</div>

<!-- Modal -->
<div id="myModal" class="modal">
  <span class="close" onclick="closeModal()">&times;</span>
  <img class="modal-content" id="imgModal">
</div>

<script>
  // Función para abrir el modal
  function openModal(src) {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("imgModal").src = src;
  }

  // Función para cerrar el modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
</script>

---



---
[English version](README-es.md) | [Regresar el Menú del Repositorio](../README.md)
---

Bienvenido a la sección de proyectos de Atlassian. Aquí encontrarás documentación y ejemplos de uso relacionados con las herramientas Atlassian.

## Contenidos

- **[Jira Software](./Jira%20Software/Anonymous%20Networking%20Inc/)**: Documentación sobre el uso de Jira Software.
- **[Jira Service Manager](./Jira%20Service%20Manager/)**: Guías de Jira Service Manager.

## En desarrollo 🚧

Algunos proyectos y documentos están en desarrollo y pueden estar sujetos a cambios.

---
[English version](README-es.md) | [Regresar el Menú del Repositorio](../README.md)
---
