<template>
  <div>
    <div class="sidebar">
      <div class="sidebar-title">
        <img src="/virus.png" />
        <span class="pt-1">Covid19 Tracker</span>
      </div>
      <div class="sidebar-box">
        <div class="sidebar-items" v-for="(item, index) in nav" :key="index">
          <router-link style="text-decoration: none" :to="item.url">
            <div
              class="item-div"
              :class="route.includes(item.url) ? 'active' : ''"
            >
              <v-icon class="pr-6">{{ item.icon }}</v-icon>
              <span>{{ item.name }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nav from "@/_nav";

export default {
  name: "Sidebar",
  props: ["route"],
  data() {
    return {
      nav: [],
      reactivity: false,
    };
  },
  mounted() {
    this.nav = nav.sidebar;
    this.reactivity = !this.reactivity;
  },
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 290px;
  height: 100vh;
  border-right: 1px solid #adb1c25f;
  background-color: #363740;
  padding: 10px 0;
  z-index: 100;
  direction: ltr;

  &-title {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 23px;
    color: #a5a5a5;
    font-weight: bold;
    padding: 16px 28px 16px 20px;
    img {
      width: 40px;
      margin-right: 10px;
    }
  }
  &-items {
    max-height: 250px;
    padding: 0;
    .item-div {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 4px 0;
      cursor: pointer;
      color: #9293a0;
      padding-left: 40px;
      font-size: 18px;
      border-left: 3px solid #363740;
      path {
        stroke: #9293a0;
      }

      &.active {
        background-color: #3e4049;
        color: #9293a0;
        path {
          stroke: #9293a0;
        }
        .v-icon {
          color: #9293a0;
        }
      }
      &:hover {
        border-left: 3px solid rgb(221, 226, 255);
        background-color: #3e4049;
        color: #fff;
        path {
          stroke: #fff;
        }
      }
    }
  }
}
</style>
