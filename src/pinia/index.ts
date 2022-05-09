import { defineStore } from 'pinia';

export const useCounterStore = defineStore('storeCount', {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
