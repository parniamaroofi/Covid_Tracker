<template>
  <div class="overview">
    <!-- Show loading spinner when data is not loaded -->
    <div v-if="loading" class="w-100 d-flex flex-column mt-10">
      <half-circle-spinner
        :animation-duration="1000"
        :size="65"
        color="#00acc1"
        class="mx-auto"
      />
      <p class="primary--text mx-auto mt-5">Getting data...</p>
    </div>

    <!-- Page content -->
    <div v-else>
      <!-- Boxes of statuses -->
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          md="3"
          sm="6"
          cols="12"
          class="pt-0"
        >
          <div
            class="box pointer"
            :class="selected == item ? 'bold-box' : ''"
            @click="selectItem(item)"
          >
            <!-- Box title -->
            <p class="box-title text-capitalize">{{ item }}</p>
            <!-- Box number -->
            <span class="box-number">{{
              Number(myData[item]).toLocaleString()
            }}</span>
          </div>
        </v-col>
      </v-row>
      <!-- Chart box -->
      <div class="chart mt-5" v-if="showChart">
        <h3 class="text-center">
          Covid19 <span class="text-capitalize">{{ selected }}</span> Graph
        </h3>
        <Chart
          name="lineChart"
          type="line"
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
const Chart = () => import("@/components/Chart/Chart"); //import chart component
import { HalfCircleSpinner } from "epic-spinners"; //import loading spinner
export default {
  components: {
    Chart,
    HalfCircleSpinner,
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
            borderColor: "#00ACC1",
          },
        ],
      },
      //Chart Options
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
    // the function to get the data that is needed to show it inside the page
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
    // the function to preparing chart data
    getCartData(selected) {
      this.showChart = false;
      let variable;
      this.chartData = {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "#3853ff18",
            borderColor: "#00ACC1",
          },
        ],
      };

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
    // the function to select one box and show relevant chart
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
