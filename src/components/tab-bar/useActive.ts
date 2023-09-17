import { computed } from "vue";
import { useAppStore } from "@/store/app";
export const useActive = () => {

  const useApp = useAppStore();
  const active = computed({
		get() {
			return useApp.$state.tabarActive;
		},
		set() {
			// useApp.changeTabarActive(value);
		}
	});

  const changeActive = (name: number) => {
		if (name === 2) {
			return
		}
		useApp.changeTabarActive(name);
  };

  return {
    active,
    changeActive,
  };
};
