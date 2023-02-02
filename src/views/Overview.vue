<template>
  <div class="overview">
    <div v-if="loading" class="w-100 d-flex flex-column mt-10">
      <orbit-spinner
        :animation-duration="1200"
        :size="70"
        color="#555555"
        class="mx-auto"
      />
    </div>
    <div v-else>
      <v-row>
        <v-col md="3" sm="6" cols="12">
          <div class="box">
            <p class="box-title">Total</p>
            <span class="box-number">{{
              Number(myData.total).toLocaleString()
            }}</span>
          </div>
        </v-col>
        <v-col md="3" sm="6" cols="12">
          <div class="box bold-box">
            <p class="box-title">Active</p>
            <span class="box-number">{{
              Number(myData.active).toLocaleString()
            }}</span>
          </div>
        </v-col>
        <v-col md="3" sm="6" cols="12">
          <div class="box">
            <p class="box-title">Recovered</p>
            <span class="box-number">{{
              Number(myData.recovered).toLocaleString()
            }}</span>
          </div>
        </v-col>
        <v-col md="3" sm="6" cols="12">
          <div class="box">
            <p class="box-title">Death</p>
            <span class="box-number">{{
              Number(myData.death).toLocaleString()
            }}</span>
          </div>
        </v-col>
      </v-row>
      <div class="chart mt-5">
        <h3 class="text-center">Covid19 Active Graph</h3>
        <Chart
          name="lineChart"
          type="line"
          v-if="showChart"
          :chartdata="chartData"
          :options="optionsLine"
          height="150"
        >
        </Chart>
      </div>
    </div>
  </div>
</template>
<script>
const Chart = () => import("@/components/Chart/Chart");
import { OrbitSpinner } from "epic-spinners";
export default {
  components: {
    Chart,
    OrbitSpinner,
  },
  data() {
    return {
      loading: false,
      showChart: false,
      response: {},
      countries: [],
      myData: {},
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "#3853ff18",
            borderColor: "#3751FF",
          },
        ],
      },
      optionsLine: {
        responsive: true,
        maintainAspectRatio: true,
        fill: true,
        elements: {
          point: {
            pointStyle: false,
            radius: 0,
          },
        },
        plugins: {
          legend: {
            rtl: true,
            display: false,
            position: "top",
            labels: {
              font: {
                family: "Arial",
              },
              boxWidth: 25,
              boxHeight: 8,
            },
          },
          tooltip: {
            titleFont: {
              family: "Arial",
            },
            bodyFont: {
              family: "Arial",
            },
          },
        },

        title: {
          display: true,
          fontSize: 20,
          position: "top",
          text: "",
        },

        scales: {
          y: {
            min: 0,
            title: {
              display: false,
            },
            ticks: {
              label: "میزان درآمد (هزار تومان)",
              stepSize: 100,
              beginAtZero: true,
              font: { family: "Arial", size: 13 },
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
          x: {
            stacked: true,
            ticks: {
              font: {
                family: "Arial",
                size: 13,
              },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http
        .get("https://api.covid19api.com/summary")
        .then((res) => {
          this.response = res.data;
          this.countries = res.data.Countries;
          this.myData.total = this.response.Global.TotalConfirmed;
          this.myData.active = this.response.Global.NewConfirmed;
          this.myData.recovered = this.response.Global.TotalRecovered;
          this.myData.death = this.response.Global.TotalDeaths;
          for (let cnt in this.countries) {
            let countryName = this.countries[cnt].Country;
            this.chartData.labels.push(countryName);

            let total = this.countries[cnt].TotalConfirmed;
            this.chartData.datasets[0].data.push(total);
          }
          this.chartData.datasets[0].cubicInterpolationMode = "monotone";
          setTimeout(() => {
            this.showChart = true;
            this.loading = false;
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          this.toast("خطا: " + err.response.data, "error");
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss">
* {
  font-family: Mulish !important;
}
@font-face {
  font-family: Mulish;
  src: url("/Mulish-Light.ttf");
}
.box {
  background-color: white;
  border: 1px solid #fff;
  border-radius: 12px;
  width: 99%;
  height: 140px;
  text-align: center;

  &-title {
    font-size: 22px;
    color: #9fa2b4;
    font-weight: bold;
    margin: 20px 0 5px 0;
  }

  &-number {
    font-size: 32px;
    font-weight: bold;
  }

  &.bold-box {
    border: 1px solid #3751ff;
    .box-title,
    .box-number {
      color: #3751ff;
    }
  }
}
.chart {
  padding: 20px 15px 15px;
  width: 100%;
  background-color: white;
  border: 1px solid #fff;
  border-radius: 8px;
}
</style>
