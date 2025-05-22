/**
 * IMPORTJSON de open-exchange-rates.org
 * Fuente original: https://gist.github.com/paulgambill/ca4a4c7c6c20a7b8e1d1
 * Adaptado para Google Sheets
 */
function IMPORTJSON(url, query, headers) {
  try {
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());

    var pathquery = query.split(".");
    for (var i = 0; i < pathquery.length; i++) {
      json = json[pathquery[i]];
    }

    if (headers === "noHeaders") {
      return [[json]];
    } else {
      return [["Valor"], [json]];
    }
  } catch (err) {
    return [["Error"], [err.message]];
  }
}
