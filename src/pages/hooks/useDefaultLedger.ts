import { ref } from "vue";
import { useAppStore } from "@/store/app";
import { ledgerType } from "@/types/user";

export const useDefaultLedger = () => {
	const useApp = useAppStore();
	const defaultLedger = ref(useApp.$state.ledger);
	const changeLedger  = (data: ledgerType) => {
		useApp.changeLedgerInfo(data);
	}
	return {
		defaultLedger,
		changeLedger
	}
}
