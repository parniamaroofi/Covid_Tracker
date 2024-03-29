import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Alert from "./../components/Icons/Alert.vue";
import Chart from "./../components/Icons/Chart.vue";
import Patients from "./../components/Icons/Patients.vue";

Vue.use(Vuetify);

const opts = {};

export default new Vuetify({
  rtl: false,
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#00acc1",
      },
    },
  },
  icons: {
    iconfont: "mdi",
    values: {
      Alert: {
        component: Alert,
      },
      Chart: {
        component: Chart,
      },
      Patients: {
        component: Patients,
      },
    },
  },
});
