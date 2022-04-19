<template>
  <div>
    <div class="chart-home" :style="'flex-direction:'+chartDirection">
      <bar-chart :data="barData" class="barChart" ref="barChart"></bar-chart>
      <pie-chart :data="pieData" class="pieData" ref="pieChart"></pie-chart>
    </div>
  </div>
</template>

<script>
import barChart from "@/views/charts/component/bar";
import PieChart from "@/views/charts/component/pie";

export default {
  name: "chart-home",
  components: {
    PieChart,
    barChart
  },

  data() {
    return {
      barData: {
        xAxis: [],
        series: []
      },
      pieData: {
        series: []
      },
      chartDirection: "row",
    }
  },

  mounted() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      this.chartDirection = "column";
      document.getElementsByClassName('pieData')[0].style.marginTop = "10px";
    }
    this.getBarData()
    this.getPieData()
  },

  methods: {
    async getBarData() {
      let getShanghai = 0;
      let getBeijing = 0;
      let getGuangzhou = 0;
      this.$http.get('/chart/address', {params: '上海'}).then((res)=>{
        getShanghai = res.data.data;
        this.$http.get('/chart/address', {params: '北京'}).then((res)=>{
          getBeijing = res.data.data;
          this.$http.get('/chart/address', {params: '广州'}).then((res)=>{
            getGuangzhou = res.data.data;
            this.barData.xAxis = ['上海', '北京', '广州']
            this.barData.series = [getShanghai, getBeijing, getGuangzhou]
            this.$refs.barChart.myChart.resize();
          })
        })
      })
    },

    async getPieData() {
      let li = 0;
      let wang = 0;
      let zhang = 0;
      this.$http.get('/chart/name', {params: '李'}).then((res)=>{
        li = res.data.data;
        this.$http.get('/chart/name', {params: '王'}).then((res)=>{
          wang = res.data.data;
          this.$http.get('/chart/name', {params: '张'}).then((res)=>{
            zhang = res.data.data;
            this.pieData.series = [{
              name: '李',
              value: li
            }, {
              name: '王',
              value: wang
            }, {
              name: '张',
              value: zhang
            }]
            this.$refs.pieChart.myChart.resize();
          })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.chart-home {
  display: flex;
  height: 99%;
  overflow: auto;

  .barChart {
    width: 100%;
    min-height: 500px;
  }

  .pieData {
    width: 100%;
    min-height: 500px;
  }
}
</style>
