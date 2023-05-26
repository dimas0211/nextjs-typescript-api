import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { getMarkets } from './api/cardsApi';
import { CardProps } from '../types';

const Home: React.FC = () => {
  let initialized = false;
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [cards, setCards] = useState([]);
  useEffect((): any => {
    if (!initialized) {
      fetchError && setFetchError(false);
      setLoading(true);
      initialized = true;
      getMarkets()
        .then(({ data }) => {
          setCards(data);
        })
        .catch((error) => {
          setFetchError(true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const renderListOfCards = () =>
    fetchError ? (
      <div className="flex flex-col items-center">
        <h3>Sorry, something went wrong</h3>
        <p>Please try again later</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map(({ id, name, image, current_price, high_24h, low_24h }) => {
          const props: CardProps = {
            name,
            image,
            price: current_price,
            high: high_24h,
            low: low_24h,
            id,
          };

          return <Card {...props} key={id} />;
        })}
      </div>
    );

  return (
    <>
      <Head>
        <title>CoinGecko Market Pairs (USD)</title>
      </Head>
      <main>
        <div className="bg-white pt-8 pb-6 drop-shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-sm">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-4 whitespace-nowrap">
              Market Pairs (USD)
            </h3>
            <p className="text-xl text-center text-gray-600">
              The following is a list of crypto currencies with information related to the USD
              trading pair.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? <Loader /> : renderListOfCards()}
        </div>
      </main>
    </>
  );
};

export default Home;
