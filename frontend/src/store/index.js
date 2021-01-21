import {createLogger, createStore} from 'vuex';
import poll from './poll.module';
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];
export default createStore({
  modules: {
    'Polls': {
      namespaced: true,
      ...poll
    }
  },
  strict: debug,
  plugins
});

