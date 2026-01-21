<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <div class="error-message">页面不见了</div>
      <div class="error-description">
        抱歉，您访问的页面可能已被删除、移动或从未存在。
      </div>
      <el-button type="primary" size="large" @click="goHome">
        <el-icon class="mr-2"><House /></el-icon>
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { House } from "@element-plus/icons-vue";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.not-found-content {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 80px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 20px;
}

.error-message {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.error-description {
  font-size: 16px;
  color: #606266;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
}
</style>
