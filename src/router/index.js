import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Pages
const Overview = () => import("@/views/Overview");

// Shared Pages
const Page404 = () => import("@/views/Page404");

export default new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/overview",
      name: "خانه",
      component: DefaultContainer,
      children: [
        {
          path: "/overview",
          name: "Overview",
          component: Overview,
        },
      ],
    },

    { path: "*", component: Page404 },
  ],
});
