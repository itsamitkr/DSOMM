const tableContent = require('./matrix.json');
const _ = require('lodash');

const highChartConfig = {
  "chart": {
    "polar": true,
    "type": "line",
    "height": "50%"
  },

  "credits": {
    "enabled": false
  },

  "title": {
    "text": "DevSecOps Assessment - Spider Chart",
    "y": 10
  },

  "pane": {
    "size": "80%"
  },

  "xAxis": {
    "categories": ["Plan", "Code", "Test", "Build", "Deploy & Release", "Operate", "Monitor"],
    "tickmarkPlacement": "on",
    "lineWidth": 0,
    "labels": {
        "style": {
            "fontSize": "16px",
            "fontWeight": "bold"
        }
    }
  },

  "yAxis": {
    "gridLineInterpolation": "polygon",
    "lineWidth": 0,
    "min": 1,
    "max": 5,
    "tickInterval": 1
  },

  "tooltip": {
    "shared": true,
    "pointFormat": "<span style='color:{series.color}'>{series.name}</b><br/>"
  },

  "legend": {
    "align": "center",
    "verticalAlign": "bottom",
    "layout": "horizontal",
    "itemStyle": {
        "fontSize": '16px'
    }
  },

  "responsive": {
    "rules": [{
      "condition": {
        "maxWidth": 500
      },
      "chartOptions": {
        "legend": {
          "verticalAlign": "center",
          "layout": "horizontal"
        },
        "pane": {
          "size": "70%"
        }
      }
    }]
  }
};

const tableHeader  = [
                       "CALMS Dimensions",
                       "DevSecOps Stages",
                       "Level 1: Awareness of DevSecOps practices",
                       "Level 2: Understanding of DevSecOps practices",
                       "Level 3: Commitment to DevSecOps practices",
                       "Level 4: Advanced in DevSecOps practices"
                    ];

let spiderSeries = [
  {
    name: "Culture",
    data: [0, 0, 0, 0, 0, 0, 0]
  }, {
    name: "Automation",
    data: [0, 0, 0, 0, 0, 0, 0]
  }, {
    name: "Lean",
    data: [0, 0, 0, 0, 0, 0, 0]
  }, {
    name: "Measurement",
    data: [0, 0, 0, 0, 0, 0, 0]
  }, {
    name: "Sharing",
    data: [0, 0, 0, 0, 0, 0, 0]
  }
];

const dimensionList = _.uniq(_.map(tableContent, 'dimension'));
const stageList = _.uniq(_.map(tableContent, 'stage'));

let compList = Array(5).fill(null).map(() => Array(7).fill(null).map(() => Array(0).fill(null)));

/**
 * Returns the data series to generate spider chart.
 * @param {string} id - table cell id
 * @param {boolean} checked - is checkbox checked
 */
function updateChart(id, checked) {
  let [dim, stg, i] = id.split(".").map(Number);
  let lvl = i + 1;

  tableContent.map(content => {
    if (content.dimension.toLowerCase() == dimensionList[dim].toLowerCase()
    && content.stage.toLowerCase() == stageList[stg].toLowerCase()) {
      let options = content["l".concat(lvl)].attr.length;
      if (checked) {
        compList[dim][stg].push(lvl);
        let chkLvl = _.max(compList[dim][stg]);
        let chkAgg = _.countBy(compList[dim][stg]);
        spiderSeries[dim].data[stg] = lvl >= chkLvl && chkLvl + chkAgg[chkLvl]/options;
      } else {
        let index = compList[dim][stg].indexOf(lvl);
        if (index !== -1) { compList[dim][stg].splice(index, 1); }
        let maxLvl = _.max(compList[dim][stg]);
        let lvlAgg = _.countBy(compList[dim][stg]);
        if (lvl >= maxLvl) {
          options = content["l".concat(maxLvl)].attr.length;
          spiderSeries[dim].data[stg] = _.size(lvlAgg) ? maxLvl + lvlAgg[maxLvl]/options : 0;
        }
      }
    }
  });
  return spiderSeries;
}

export {highChartConfig, tableHeader, spiderSeries, updateChart, tableContent};