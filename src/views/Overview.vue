<template>
  <div class="overview">
    <div v-if="loading" class="w-100 d-flex flex-column mt-10">
      <semipolar-spinner
        :animation-duration="1500"
        :size="70"
        color="#555555"
        class="mx-auto"
      />
    </div>
    <div v-else>
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          md="3"
          sm="6"
          cols="12"
        >
          <div
            class="box pointer"
            :class="selected == item ? 'bold-box' : ''"
            @click="selectItem(item)"
          >
            <p class="box-title text-capitalize">{{ item }}</p>
            <span class="box-number">{{
              Number(myData[item]).toLocaleString()
            }}</span>
          </div>
        </v-col>
      </v-row>
      <div class="chart mt-5" v-if="showChart">
        <h3 class="text-center">
          Covid19 <span class="text-capitalize">{{ selected }}</span> Graph
        </h3>
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
import { SemipolarSpinner } from "epic-spinners";
export default {
  components: {
    Chart,
    SemipolarSpinner,
  },
  data() {
    return {
      loading: false,
      showChart: false,
      selected: "total",
      response: {},
      countries: [],
      myData: {},
      items: ["total", "active", "recovered", "death"],
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
          this.getCartData(this.selected);

          setTimeout(() => {
            this.showChart = true;
            this.loading = false;
          }, 100);
        })
        .catch((err) => {
          console.log(err);
          this.toast("خطا: " + err.response.data, "error");
          this.loading = false;
        });
    },
    getCartData(selected) {
      this.showChart = false;
      let variable;
      switch (selected) {
        case "total":
          variable = "TotalConfirmed";
          break;
        case "active":
          variable = "NewConfirmed";
          break;
        case "recovered":
          variable = "TotalRecovered";
          break;
        case "death":
          variable = "TotalDeaths";
          break;

        default:
          break;
      }
      this.chartData = {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "#3853ff18",
            borderColor: "#3751FF",
          },
        ],
      };
      for (let cnt in this.countries) {
        let countryName = this.countries[cnt].Country;
        this.chartData.labels.push(countryName);

        let data = this.countries[cnt][variable];
        this.chartData.datasets[0].data.push(data);
      }
      this.chartData.datasets[0].cubicInterpolationMode = "monotone";
      setTimeout(() => {
        this.showChart = true;
      }, 100);
    },
    selectItem(item) {
      this.selected = item;
      this.getCartData(item);
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
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: 0;
    border-radius: 12px;
    border: 8px solid transparent;
    box-sizing: border-box;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 0;
    width: 0;
    border-radius: 12px;
    border: 8px solid transparent;
    box-sizing: border-box;
  }

  &:hover {
    &::before {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      border-radius: 12px;
      border-right: 0;
      border-bottom: 0;
      transition: height 0.2s linear, width 0.2s linear 0.2s;
    }
    &::after {
      width: 100%;
      height: 100%;
      border: 3px solid #ccc;
      border-radius: 12px;
      border-left: 0;
      border-top: 0;
      transition: height 0.2s linear, width 0.2s linear 0.2s;
    }
  }

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
    border: 3px solid #3751ff;
    .box-title,
    .box-number {
      color: #3751ff;
    }
    &::before,
    &::after {
      display: none !important;
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
