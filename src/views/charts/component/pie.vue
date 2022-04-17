<template>
  <div>
    <div id="pieChart" class="pieChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "pieChart",

  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      myChart:{},
      option: {
        title: {
          text: '测试',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Area Mode',
            type: 'pie',
            radius: ['10%', '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: []
          }
        ]
      }
    }
  },

  watch: {
    data: {
      handler(val) {
        this.option.legend.data = val.series.map(item => item.name);
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
      let chartDom = document.getElementById('pieChart');
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.option);
    },
  }
}
</script>

<style scoped>
.pieChart {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
