import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});