import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Loader from '../../components/Loader';
import CurrentCard from '../../components/CurrentCard';
import { getCurrency } from '../api/cardsApi';
import { CurrentCardProps, CurrencyData } from '../../types';

export default function Currency() {
  let initialized = false;
  const router = useRouter();
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currencyCard, setcurrencyCard] = useState<CurrencyData | null>(null);

  useEffect((): any => {
    if (!initialized && router.isReady) {
      const id = router.query.symbol;
      fetchError && setFetchError(false);
      setLoading(true);
      initialized = true;
      getCurrency(id)
        .then(({ data }) => {
          setcurrencyCard(data);
        })
        .catch((error) => {
          setFetchError(true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.isReady]);

  const props: CurrentCardProps = {
    name: currencyCard?.name ?? null,
    image: currencyCard?.image.large ?? '',
    price: currencyCard?.market_data.current_price.usd ?? null,
    allTimeHighPrice: currencyCard?.market_data.ath.usd ?? null,
    marketCap: currencyCard?.market_data.market_cap.usd ?? null,
    marketCapRank: currencyCard?.market_data.market_cap_rank ?? null,
    id: currencyCard?.id ?? null,
  };

  const renderCard = () =>
    fetchError ? (
      <div className="flex flex-col items-center">
        <h3>Sorry, something went wrong</h3>
        <p>Please try again later</p>
      </div>
    ) : (
      <CurrentCard {...props} />
    );

  return (
    <>
      <Head>
        <title>CoinGecko Market Pairs (USD)</title>
      </Head>
      <main>
        <div className="bg-white pt-8 pb-6 drop-shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-sm">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-4">
              {currencyCard?.name} (USD)
            </h3>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            href="/">
            Back
          </Link>
        </div>
        <div className="flex justify-center mt-20">{loading ? <Loader /> : renderCard()}</div>
      </main>
    </>
  );
}
