import Image, { StaticImageData } from "next/image";

interface StaticRequire {
    default: StaticImageData;
}

declare type StaticImport = StaticRequire | StaticImageData;

export interface CurrentCardProps {
    name: string | null,
    image: string | StaticImport | null,
    price: string | null,
    allTimeHighPrice: string | null,
    marketCap: string | null,
    marketCapRank: string | null,
    id: string | null
}

export interface CardProps {
    name: string,
    image: string | StaticImport,
    price: string,
    high: string,
    low: string,
    id: string
  }

export interface CurrencyData {
    name: string,
    image: {
        large: string | StaticImport,
    },
    market_data: {
        current_price: {
            usd: string
        },
        ath: {
            usd: string
        },
        market_cap: {
            usd: string
        },
        market_cap_rank: string
    },
    id: string
}