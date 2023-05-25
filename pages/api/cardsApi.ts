import axios from "axios";

const markets = "https://api.coingecko.com/api/v3/coins/markets";
const currency = (id: String) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const getMarkets = () => {
  return axios.get(markets, {
    params: {
      vs_currency: "usd",
      per_page: 45,
    },
  });
};

export const getCurrency = (id: any) => {
  return axios.get(currency(id));
};

