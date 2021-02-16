<template>
  <div>
    <div class="kpis-container">
      <div class="kpi danger">
        <div class="kpi-body">
          <div class="row">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="row">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi warning">
        <div class="kpi-body">
          <div class="row">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="row">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi success">
        <div class="kpi-body">
          <div class="row">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="row">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi blue">
        <div class="kpi-body">
          <div class="row">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="row">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="graph" style="width:600px; height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    loadChart() {
      let echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("graph"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.loadChart();
  }
};
</script>

<style>
.kpis-container {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-evenly;
  width: 100%;
}
.kpi {
  display: flex;
  box-shadow: 3px 6px 10px #888888;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0);
}
.kpi:hover .kpi-icon,
.kpi:hover .kpi-value {
  opacity: 1;
  transition: 1s;
}
.kpi:hover {
  transform: scale(1.01);
  cursor: pointer;
}
.kpi-body {
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.kpi-icon {
  font-size: 30px;
  padding: 10px;
  align-content: center;
  justify-content: center;
  display: flex;
  flex: 1;
  opacity: 0.4;
  color: black;
}
.kpi-value {
  align-content: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  font-size: 40px;
  flex: 1;
  opacity: 0.4;
  color: black;
}
.kpi-description {
  border-top: 2px solid rgba(0, 0, 0, 0.205);
  width: 100%;
  align-content: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  padding: 5px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.danger {
  background: hsl(348, 100%, 61%);
}
.success {
  background: hsl(141, 71%, 48%);
}
.blue {
  background: hsl(204, 86%, 53%);
}
.warning {
  background: hsl(48, 100%, 67%);
}
</style>
