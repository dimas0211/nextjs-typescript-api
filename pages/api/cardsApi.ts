import axios from 'axios';
import { BASE_API } from './constants';

const markets = `${BASE_API}/coins/markets`;
const currency = (id: String) => `${BASE_API}/coins/${id}`;

export const getMarkets = () => {
  return axios.get(markets, {
    params: {
      vs_currency: 'usd',
      per_page: 45,
    },
  });
};

export const getCurrency = (id: any) => {
  return axios.get(currency(id));
};
