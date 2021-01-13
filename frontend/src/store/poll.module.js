import { STORE_POLLS } from '@/store/mutations.type';

const state = {
  polls: [],
};

const getters = {
  allPolls(state) {
    return state.polls;
  },
};

const mutations = {
  [STORE_POLLS](state, polls) {
    state.polls = polls;
  },
};

export default {
  state,
  getters,
  mutations,
};
