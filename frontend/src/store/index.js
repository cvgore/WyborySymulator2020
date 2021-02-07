import {createLogger, createStore} from 'vuex';
import poll from './poll.module';
import auth from './auth.module';

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];
const store = createStore({
  modules: {
    'Polls': {
      namespaced: true,
      ...poll
    },
    'Auth': {
      namespaced: true,
      ...auth
    }
  },
  strict: debug,
  plugins
});
export default store;

