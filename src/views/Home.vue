<template>
  <div>
    <div class="kpis-container">
      <div class="kpi mydanger">
        <div class="kpi-body">
          <div class="myrow">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="myrow">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi warning">
        <div class="kpi-body">
          <div class="myrow">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="myrow">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi mysuccess">
        <div class="kpi-body">
          <div class="myrow">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="myrow">
            <div class="kpi-description">
              <span>Itens sem estoque</span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi blue">
        <div class="kpi-body">
          <div class="myrow">
            <div class="kpi-icon">
              <i class="fa fa-boxes"></i>
            </div>
            <div class="kpi-value">
              5
            </div>
          </div>
          <div class="myrow">
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

<style></style>
