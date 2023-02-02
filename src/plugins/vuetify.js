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
        primary: "#3b55ff",
        secondary: "#4BA0E7",
        // accent: "#82B1FF",
        // error: "#FF5252",
        // info: "#2196F3",
        // success: "#4CAF50",
        // warning: "#FFC107",
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
