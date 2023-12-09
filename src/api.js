import axios from 'axios';

export default async function getData(query, pageN) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      q: query,
      page: pageN,
      key: '40010182-cc012c30f708a21cd5d6ee6a2',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return await response.data;
}
