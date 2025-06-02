import { ref } from "vue";

export function wrapUseFetch<Res = object, Req = object | undefined>(
  func: (payload: Req) => Promise<Res>
) {
  return (reqData: Req) => {
    const data = ref<Res | null>(null);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);

    const fetchData = async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const res = await func(reqData);
        data.value = res;
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
  };
}
