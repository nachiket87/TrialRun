import axios from "axios";

const getData = async (setData, url) => {
  await axios.get(url).then((data) => setData(data));
};

export default getData;
