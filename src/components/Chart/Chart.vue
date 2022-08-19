<template>
  <canvas :id="name" width="400" height="400"></canvas>
</template>
<script>
// import {Bar} from 'vue-chartjs'
// import Chart from 'chart.js';

export default {
  // extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    name: "",
    type: "",
  },

  mounted() {
    // this.renderChart(this.chartdata, this.options);
    const ctx = document.getElementById(this.name).getContext("2d");
    const myChart = new Chart(ctx, {
      type: this.type,
      data: this.chartdata,
      options: this.options,
    });
  },
};
</script>
