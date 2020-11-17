import axios from "axios";

async function fetchData(url, setData) {
  let request = await axios.get(url);
  await setData(request.data);
  return request.data;
}

export default fetchData;
