import axios from "axios";

const fetchData = (url) => {
    const request = axios.get(url)
    return request.then(response => response.data)
  }

export default fetchData