var randomSentence = require('random-sentence');
var randomNumber = require('random-number')
var tcArr = [];

function levelGen () {
  var levelArr = [];
  var gen = randomNumber.generator({min: 1, max: 4, integer: true });
  for (var i=1; i<=gen(); i++) {
    var levelObj = {
        "title": randomSentence({word: i}),
        "enabled": Math.round(Math.random()) == 1 ? true : false
      };
    levelArr.push(levelObj)
  };
  return levelArr;
}

const highChartConfig = {
  "chart": {
    "polar": true,
    "type": "line",
    "height": "30%"
  },

  "credits": {
    "enabled": false
  },

  "exporting": {
    "enabled": false
  },

  "title": {
    "text": "DSOMM Spider",
    "y": 40
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
    "min": 0,
    "max": 4,
    "tickInterval": 1
  },

  "tooltip": {
    "shared": true,
    "pointFormat": "<span style='color:{series.color}'>{series.name}: <b>Level {point.y:,.0f}</b><br/>"
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
          "size": "90%"
        }
      }
    }]
  }
};

const tableHeader  = ["CALMS Dimensions",
                 "DevSecOps Levels",
                 "Level 1: Awareness of DevSecOps practices",
                 "Level 2: Understanding of DevSecOps practices",
                 "Level 3: Commitment to DevSecOps practices",
                 "Level 4: Advanced in DevSecOps practices"];

const stage = ["Plan", "Code", "Test", "Build", "Deploy & Release", "Operate", "Monitor"];
const calms = ["Culture", "Automation", "Lean", "Measurement", "Sharing"]

function tContent () {

  for(var i in calms) {
    for (var s in stage){
      var tcObj = {
            "calms": calms[i],
            "stage": stage[s],
            "level1": levelGen(),
            "level2": levelGen(),
            "level3": levelGen(),
            "level4": levelGen()
      }
      tcArr.push(tcObj);
    }
  }
  return tcArr;
}

const tableContent = tContent();

var generateSeries = function () {
  var dataSeries = [];
  for(var c in calms) {
    var dataObj = {};
    var score = [];
    for (var s in stage){
      for (var t in tcArr) {
        if (calms[c] === tcArr[t].calms && stage[s] === tcArr[t].stage) {

          var [l1, l2, l3, l4] = [tcArr[t].level1, tcArr[t].level2, tcArr[t].level3, tcArr[t].level4];
          var [l1active, l2active, l3active, l4active] = [0, 0, 0, 0];
          for (var i1 in l1) { if (l1[i1].enabled) l1active++; };
          for (var i2 in l2) { if (l2[i2].enabled) l2active++; };
          for (var i3 in l3) { if (l3[i3].enabled) l3active++; };
          for (var i4 in l4) { if (l4[i4].enabled) l4active++; };
          var stageScore = Math.max(4* (l1active/l1.length * 0.1 +
                            l2active/l2.length * 0.2 +
                            l3active/l3.length * 0.3 +
                            l4active/l4.length * 0.4), 1);

          score.push(stageScore);
        }
      }
    }
   dataObj = {
    "name": calms[c],
    "data": score
   }
   dataSeries.push(dataObj);
  }
  return dataSeries;
}

export {highChartConfig, tableContent, tableHeader, generateSeries};