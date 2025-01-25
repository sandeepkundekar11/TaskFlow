import Toasters from "@/Components/Utilities/Toasters";
import { useState } from "react";

const useDeleteApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { SuccessToaster, ErrorToaster } = Toasters();
  const DeleteApi = async (url) => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem("Token"));
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    let responseBody = await response.json();
    if (response.status === 200) {
      setData(responseBody);
      SuccessToaster(responseBody.message);
    } else {
      setError(responseBody.message);
      ErrorToaster(responseBody.message);
    }

    setLoading(false);
  };

  return { data, loading, error, callApi: DeleteApi };
};

export default useDeleteApi;
