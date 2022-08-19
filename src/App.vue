<template>
  <v-app style="background-color: #f5f5f5">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";

@font-face {
  font-family: Mulish;
  src: url("assets/fonts/Mulish-Light.ttf");
}

body {
  font-family: Mulish !important;
}
</style>
