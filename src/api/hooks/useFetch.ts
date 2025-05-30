import { ref } from "vue";
import type { IUseFetchProps } from "../types";
import { api } from "../api.service";

export function useFetch<T = object>({
  method,
  url,
  data,
  options,
}: IUseFetchProps) {
  const resData = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      let res;

      const canHasReqData = ["post", "put"].includes(method);
      if (data) {
        if (!canHasReqData) throw "this method can't has data";

        res = await api[method as "post"](url, data, options);
      } else {
        res = await api[method](url, options);
      }

      resData.value = res.data;
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
    data: resData,
    isLoading,
    error,
  };
}
