import { reactive } from "vue";

export const state = reactive({
  tasks: JSON.parse(localStorage.getItem("tasks")) || []
});
