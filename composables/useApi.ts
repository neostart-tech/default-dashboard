// composables/useApi.ts (si vous en avez besoin)
export const useApi = () => {
  const fetchData = async (endpoint: string) => {
    try {
      const response = await $fetch(`http://localhost:8000/api/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const postData = async (endpoint: string, data: any) => {
    try {
      const response = await $fetch(`http://localhost:8000/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return {
    fetchData,
    postData
  };
};