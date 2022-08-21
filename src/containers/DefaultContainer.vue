<template>
  <div class="app">
    <Header />
    <Sidebar :route="$router.currentRoute.path" />
    <main class="main">
      <div class="px-5">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "./../components/Header/Header.vue";
import Sidebar from "./../components/Sidebar/Sidebar.vue";

export default {
  name: "DefaultContainer",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.app {
  .main {
    position: absolute;
    right: 0;
    top: 100px;
    width: calc(100% - 290px);
    padding: 15px;
  }
}
</style>
