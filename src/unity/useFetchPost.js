import { useState, useEffect } from "react";

const useFetch = (url, inputData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, {
        method: 'POST',
        body: inputData
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useFetch;