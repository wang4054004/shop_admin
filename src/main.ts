import { createApp } from "vue";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "virtual:windi.css";
// import "./style.css";
const pinia = createPinia();
import App from "./App.vue";
import router from "./router";

createApp(App).use(ElementPlus).use(pinia).use(router).mount("#app");
