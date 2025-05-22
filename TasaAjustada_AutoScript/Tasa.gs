function guardarTasaCambio() {
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.getMonth();
  const anio = hoy.getFullYear();
  const ultimoDiaDelMes = new Date(anio, mes + 1, 0).getDate();
  if (dia !== ultimoDiaDelMes && dia !== 30) return;

  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const hojaTasa = doc.getSheetByName("Tasa");
  const hojaHistorico = doc.getSheetByName("Histórico");
  const hojaGastos = doc.getSheetByName("2025 Ingresos vs Gastos");

  const tasaOficial = hojaTasa.getRange("D1").getValue();
  const multiplicador = 0.997487;
  const tasaAjustada = tasaOficial * multiplicador;

  hojaHistorico.appendRow([
    Utilities.formatDate(hoy, doc.getSpreadsheetTimeZone(), "dd/MM/yyyy"),
    tasaOficial,
    tasaAjustada
  ]);

  const fila = 57;
  const columnaMes = mes + 2;
  hojaGastos.getRange(fila, columnaMes).setValue(tasaAjustada);

  const filaTasa = mes + 2;
  const columnaFecha = 4;
  const timestamp = Utilities.formatDate(hoy, doc.getSpreadsheetTimeZone(), "dd/MM/yyyy HH:mm:ss");
  hojaTasa.getRange(filaTasa, columnaFecha).setValue(timestamp);
}

function guardarTasaMesManual() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = doc.getSheetByName("Tasa");
  const hojaGastos = doc.getSheetByName("2025 Ingresos vs Gastos");
  const hojaHistorico = doc.getSheetByName("Histórico");

  const filaActiva = hoja.getActiveCell().getRow();
  if (filaActiva <= 1) {
    SpreadsheetApp.getUi().alert("Selecciona una fila válida debajo del encabezado.");
    return;
  }

  const nombreMes = hoja.getRange(filaActiva, 1).getValue().toString().trim().toLowerCase();
  const anio = hoja.getRange(filaActiva, 2).getValue();
  const tasaOficial = hoja.getRange(filaActiva, 3).getValue();

  const meses = {
    "enero": 0, "febrero": 1, "marzo": 2, "abril": 3,
    "mayo": 4, "junio": 5, "julio": 6, "agosto": 7,
    "septiembre": 8, "octubre": 9, "noviembre": 10, "diciembre": 11
  };

  const mes = meses[nombreMes];
  if (mes === undefined || isNaN(anio) || isNaN(tasaOficial)) {
    SpreadsheetApp.getUi().alert("Mes, año o tasa inválidos. Verifica que la fila contenga datos válidos.");
    return;
  }

  const multiplicador = 0.997487;
  const tasaAjustada = tasaOficial * multiplicador;
  const filaGastos = 57;
  const columna = mes + 2;
  hojaGastos.getRange(filaGastos, columna).setValue(tasaAjustada);

  hojaHistorico.appendRow([
    `${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)} ${anio}`,
    tasaOficial,
    tasaAjustada
  ]);

  const columnaFecha = 4;
  const timestamp = Utilities.formatDate(new Date(), doc.getSpreadsheetTimeZone(), "dd/MM/yyyy HH:mm:ss");
  hoja.getRange(filaActiva, columnaFecha).setValue(timestamp);
}

function interpolarTasaDesdeHojaTasa() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaTasa = ss.getSheetByName("Tasa");
  const hojaHistorico = ss.getSheetByName("Histórico");
  const multiplicador = 0.997487;
  const datos = hojaTasa.getRange("A2:C13").getValues();

  const fechasHistoricas = hojaHistorico.getRange("A2:A" + hojaHistorico.getLastRow())
    .getValues().flat().map(f => f.toString().toLowerCase());

  for (let i = 0; i < datos.length; i++) {
    const [mes, anio, tasaOficial] = datos[i];
    if (!mes || !anio || !tasaOficial || typeof tasaOficial !== 'number') continue;
    const clave = `${mes} ${anio}`.toLowerCase();
    if (fechasHistoricas.includes(clave)) continue;

    const tasaAjustada = tasaOficial * multiplicador;
    hojaHistorico.appendRow([clave, tasaOficial, tasaAjustada]);
  }

  SpreadsheetApp.getUi().alert("✅ Datos interpolados correctamente desde la hoja Tasa.");
}
