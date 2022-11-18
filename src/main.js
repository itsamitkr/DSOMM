'use strict';

import {highChartConfig, tableHeader, spiderSeries, updateChart, tableContent} from './utils/config.js';

highChartConfig["series"] = spiderSeries;

let spiderChart = Highcharts.chart('spider', highChartConfig);

document.getElementById("tHeader").innerHTML = tableHeader.map(header => { return `<th
scope="col">${header}</th>` }).join('');

window.handleChange = function handleChange(e) {
  const ds = updateChart(e.target.id, e.target.checked);
  highChartConfig["series"] = ds;
  spiderChart.update(highChartConfig);
}

/**
 * Returns the checklist menu for each cell.
 * @param {string} level - dso level
 */
function generateOptions(level) {
  return level.attr.map(l => { return `<div class="form-check"><input class="form-check-input" type="checkbox" id= ${
  level.id} name=${l} onchange="handleChange(event)" /><label>${l}</label></div>` }).join('')
}

document.getElementById("tBody").innerHTML = tableContent.map(tc => {

  return `<tr scope="col">
    <td class="font-weight-bold">${tc.dimension}</td>
    <td class="font-weight-bold">${tc.stage}</td>
    <td class="font-weight"><div class="form-check">${generateOptions(tc.l1)}</div></td>
    <td class="font-weight"><div class="form-check">${generateOptions(tc.l2)}</div></td>
    <td class="font-weight"><div class="form-check">${generateOptions(tc.l3)}</div></td>
    <td class="font-weight"><div class="form-check">${generateOptions(tc.l4)}</div></td>
  </tr>` }).join('');

