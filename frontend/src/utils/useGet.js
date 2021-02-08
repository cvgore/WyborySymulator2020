import {reactive, toRefs} from 'vue';
import axios from '@/axios';

async function useGet(endpoint) {
  const state = reactive({
    isError: null,
    errorData: null,
    isLoading: null,
    data: null,
    statusCode: null,
  });
  try {
    state.isLoading = true;
    const response = await axios.get(endpoint);
    state.data = response.data;
    state.statusCode = response.status;
  } catch (error) {
    state.isError = true;
    state.errorData = error;
  } finally {
    state.isLoading = false;
  }
  return state
}
export {
  useGet
}
