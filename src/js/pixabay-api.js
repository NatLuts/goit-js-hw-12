import Axios from 'axios';

const API_KEY = '42817939-fb8caefadf90676475c3fc719';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPhotos(q, page){
  const params = {
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };

  const url = `${BASE_URL}`
  const response = await Axios.get(url, {params});
  return response.data
}

