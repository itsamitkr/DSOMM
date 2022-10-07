'use strict';
import {highChartConfig, tableContent, tableHeader, generateSeries} from './data/config.js';
highChartConfig["series"] = generateSeries();

Highcharts.chart('spider', highChartConfig);

document.getElementById("tHeader").innerHTML = tableHeader.map(header => { return `<th
scope="col">${header}</th>` }).join('');

document.getElementById("tBody").innerHTML = tableContent.map(tc => {

  return `<tr scope="col">
    <td class="font-weight-bold">${tc.calms}</td>
    <td class="font-weight-bold">${tc.stage}</td>
    <td>`+tc.level1.map(l1 => { return `<input type="checkbox" class="form-check-input"
    ${l1.enabled ? 'checked' : ''} > ${l1.title}</input><br/>`}).join('')+`</td>
    <td>`+tc.level2.map(l2 => { return `<input type="checkbox" class="form-check-input"
    ${l2.enabled ? 'checked' : ''}> ${l2.title}</input><br/>`}).join('')+`</td>
    <td>`+tc.level3.map(l3 => { return `<input type="checkbox" class="form-check-input"
    ${l3.enabled ? 'checked' : ''}> ${l3.title}</input><br/>`}).join('')+`</td>
    <td>`+tc.level4.map(l4 => { return `<input type="checkbox" class="form-check-input"
    ${l4.enabled ? 'checked' : ''}> ${l4.title}</input><br/>`}).join('')+`</td>
  </tr>` }).join('');

generateSeries();

