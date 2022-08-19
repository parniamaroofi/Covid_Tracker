<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <v-row class="justify-content-center">
        <v-col md="12">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">صفحه مورد نظر شما پیدا نشد</h4>
            <b-btn class="btn btn-dark mx-1" @click="gotoHome()">
              بازگشت به خانه
            </b-btn>
            <b-btn class="btn btn-warning mx-1" @click="goBack()">
              بازگشت به صفحه قبل
            </b-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Page404",

  methods: {
    gotoHome() {
      this.$router.push("/" + localStorage.role + "/dashboard");
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
* {
  font-family: Mulish;
}
@font-face {
  font-family: Mulish;
  src: url("../assets/fonts/Mulish-Light.ttf");
}
</style>
