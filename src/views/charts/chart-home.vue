<template>
  <div>
    <div class="chart-home">
      <bar-chart :data="barData" class="barChart"></bar-chart>
      <pie-chart :data="pieData" class="pieData"></pie-chart>
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
      }
    }
  },

  mounted() {
    this.getBarData()
    this.getPieData()
  },

  methods: {
    async getBarData() {
      const getShanghai = await this.$http.get('/chart/address', {params: '上海'})
      const getBeijing = await this.$http.get('/chart/address', {params: '北京'})
      const getGuangzhou = await this.$http.get('/chart/address', {params: '广州'})
      this.barData.xAxis = ['上海', '北京', '广州']
      this.barData.series = [getShanghai.data.data, getBeijing.data.data, getGuangzhou.data.data]
    },

    async getPieData() {
      const li = await this.$http.get('/chart/name', {params: '李'})
      const wang = await this.$http.get('/chart/address', {params: '王'})
      const zhang = await this.$http.get('/chart/address', {params: '张'})
      this.pieData.series = [
        {value: li.data.data, name: '李'},
        {value: wang.data.data, name: '王'},
        {value: zhang.data.data, name: '张'},
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.chart-home {
  display: flex;
  flex-direction: row;
  height: 99%;

  .barChart {
    width: 50%;
  }

  .pieData {
    width: 50%;
  }
}
</style>
