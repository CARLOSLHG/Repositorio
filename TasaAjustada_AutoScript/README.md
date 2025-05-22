# TasaAjustadaPayoneer_AutoScript

Este proyecto contiene un conjunto de scripts en Google Apps Script diseñados para registrar automáticamente la tasa de cambio ajustada con el multiplicador de Payoneer desde Open Exchange Rates.

## Funcionalidades principales:
- Guarda automáticamente la tasa del día 30 (o último del mes) en la hoja "2025 Ingresos vs Gastos".
- Registra un historial en la hoja "Histórico".
- Permite entrada manual mes a mes desde la hoja "Tasa".
- Interpolación de datos históricos desde la hoja Tasa.

## Archivos
- `Tasa.gs`: contiene las funciones `guardarTasaCambio`, `guardarTasaMesManual` y `interpolarTasaDesdeHojaTasa`.

## Requisitos
- Google Sheets con hojas llamadas: `Tasa`, `Histórico`, `2025 Ingresos vs Gastos`.
- API Key de Open Exchange Rates si deseas obtener el valor en tiempo real.

## Licencia
Ver archivo `LICENCE.txt`.
