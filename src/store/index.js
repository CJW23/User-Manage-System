import { createStore } from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutation";
import actions from "@/store/action";

export default createStore({
  state,
  mutations,
  actions,
});
