<template>
  <div>
    <h1>Hello Index</h1>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store";
import router from "~/router";
import { onMounted } from "vue";
import { ElNotification } from "element-plus";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push("/login");
};

onMounted(() => {
  if (!userStore.isLoggedIn) {
    ElNotification({
      // title: 'Error',
      message: "请先登录",
      type: "error",
      duration: 1000,
    });
    router.push("/login");
  }
});
</script>

<style scoped></style>
