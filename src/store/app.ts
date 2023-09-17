import {defineStore} from "pinia";

interface App {
	/**
	 * 底部导航栏选中参数
	 */
  tabarActive: number
}

export const useAppStore = defineStore('app', {
  state: ():App => {
    return {
      tabarActive: 0
    }
  },
  getters: {},
  actions: {
    changeTabarActive(active: number): void {
      this.tabarActive = active;
    }
  }
})
