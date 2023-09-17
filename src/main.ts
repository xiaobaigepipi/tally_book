import { createSSRApp } from "vue";
import './style/tailwindcss.css'
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
// #ifdef H5
import './mock/index'
// #endif

const config = {
  // 在进阶指南中会讲到类型文件的使用。请注意右侧文档栏目。
  // 指定了类型后，在里面输入会有类型提示和校验。
	theme: {
		primary: '#4c93e4'
	},
	themeConfig: {
		dark: {
			// bodyColor: '#333'
		}
	},
	shareDisable: false
} as Tmui.tmuiConfig;

export function createApp() {
  const app = createSSRApp(App);
  app.use(tmui, config)
  return {
    app,
		Pinia
  };
}