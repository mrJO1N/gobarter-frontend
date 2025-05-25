import { ref } from "vue";
import axios from "axios";

export function useFetch<T = object>(url: string) {
  const data = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.get(url);
      data.value = response.data;
    } catch (err: any) {
      // 'cause it is any or unknown
      error.value = err.response ? err.response.data.message : err.message;
    } finally {
      isLoading.value = false;
    }
  };

  // Automatically fetch data
  fetchData();

  return {
    data,
    isLoading,
    error,
  };
}
