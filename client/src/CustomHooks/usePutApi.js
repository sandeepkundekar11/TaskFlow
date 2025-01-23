import Toasters from "@/Components/Utilities/Toasters";
import { useState } from "react";

const usePutApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { SuccessToaster, ErrorToaster } = Toasters();
  const PutApi = async (info) => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem("Token"));
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
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

  return { data, loading, error, callApi: PutApi };
};

export default usePutApi;
