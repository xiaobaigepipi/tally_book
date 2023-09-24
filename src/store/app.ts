import {defineStore} from "pinia";
import { ledgerType } from "@/types/user";

interface App {
	/**
	 * 底部导航栏选中参数
	 */
  tabarActive: number,
	ledger: ledgerType
}

const ledger = uni.getStorageSync('ledger')

export const useAppStore = defineStore('app', {
  state: ():App => {
    return {
      tabarActive: 0,
			ledger: ledger?ledger: null
    }
  },
  getters: {},
  actions: {
    changeTabarActive(active: number): void {
      this.tabarActive = active;
    },
		changeLedgerInfo (ledger: ledgerType): void {
			uni.setStorageSync('ledger', ledger)
			this.ledger = ledger
		}
  }
})
