import { createRouter, createWebHashHistory } from "vue-router";
import Index from "~/pages/index.vue";
import NotFound from "~/pages/404.vue";
import Login from "~/pages/login.vue";
import { useUserStore } from "~/store";
import { handleError } from "~/utils/information";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: { requiresAuth: true }, // 添加此字段，表示需要登录才能访问
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false }, // 登录页面不需要认证
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: { requiresAuth: false }, // 404页面不需要认证
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  const requiresAuth = to.meta.requiresAuth;

  if (from.name === "login") {
    // 如果从登录页面跳转，继续导航
    next();
  } else if (!userStore.token && to.name !== "login") {
    userStore.logout();
    handleError("请先登录", "warning");
    // 如果未登录且访问需要认证的页面，重定向到登录页面
    next({ name: "login" });
  } else if (requiresAuth && !isLoggedIn) {
    handleError("请先登录", "warning");
    // 如果需要认证且未登录，重定向到登录页面
    next({ name: "login" });
  } else if (to.name === "login" && isLoggedIn) {
    handleError("您已登录，无需重复登录", "info");
    // 如果已登录且访问登录页面，重定向到首页
    next({ name: "index" });
  }

  // 其他情况，继续导航
  next();
});

export default router;
