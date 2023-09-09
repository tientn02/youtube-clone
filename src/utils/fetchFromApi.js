import axios from 'axios'
const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
  params: {
    maxResults: 20
  },
  headers: {
    'X-RapidAPI-Key': '55024bc414msh433dc2a875e47e2p140fc9jsn8cad4eabb077',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromApi = async (url) => {
   const {data} = await axios.get(`${BASE_URL}/${url}`, options)
   return data
}