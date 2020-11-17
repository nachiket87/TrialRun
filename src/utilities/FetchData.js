import axios from "axios";

async function fetchData(url, setData) {
  let request = await axios.get(url);
  setData(request.data);
  return request;
}

export default fetchData;
