<template>
  <div>
    <div id="lineChart" class="lineChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "lineChart",

  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }
    }
  },

  watch: {
    data: {
      handler(val) {
        this.option.xAxis.data = val.xAxis;
        this.option.series[0].data = val.series;
      },
      deep: true
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let chartDom = document.getElementById('lineChart');
      let myChart = echarts.init(chartDom);
      myChart.setOption(this.option);
    },
  }
}
</script>

<style scoped>
.lineChart {
  display: inline-block;
  min-height: 200px;
  min-width: 200px;
}
</style>
