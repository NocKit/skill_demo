<template>
  <div>
    <div id="barChart" class="barChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "barChart",

  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      option: {
        myChart: {},
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
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
        this.myChart.setOption(this.option);
      },
      deep: true
    }
  },

  mounted() {
    this.init();
    this.myChart._resize = () => {
      this.myChart.resize();
    };
    setTimeout(() => {
      window.addEventListener('resize', this.myChart._resize);
    }, 200);

  },
  methods: {
    init() {
      let chartDom = document.getElementById('barChart');
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.option);
    }
  }
}
</script>

<style scoped>
.barChart {
  display: inline-block;
  height: 100%;
  width: 100%;
  min-height: 200px;
  min-width: 200px;
}
</style>
