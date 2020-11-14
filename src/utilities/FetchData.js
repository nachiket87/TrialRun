import axios from "axios";

const getData = async (setDa, url, portURL) => {
  await axios.get(url).then((data) => setDa({ rates: data }));
  await axios.get(portURL).then((data) => setDa({ portfolio: data }));
};

export default getData;
