import React from "react";
import { useRouter } from 'next/router';
import Image from "next/image";

import { CurrentCardProps } from '../types'


const CurrentCard: React.FC<CurrentCardProps> = ({
    name,
    image,
    price,
    allTimeHighPrice,
    marketCap,
    marketCapRank,
    id
}: CurrentCardProps) => {

    const router = useRouter();
    const goToCurrencyCardPage = () => router.push(`currency/${id}`)
    return (
        <div className="flex flex-col rounded border-solid border-1 border-zinc-500 bg-white drop-shadow-lg">
            <Image
                src={image}
                alt="placeholder"
                width="0"
                height="0"
                sizes="100wh"
                className="w-24 h-auto object-cover object-center m-4 mx-auto"
                priority={false}
            />
            <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <ul className="list-disc pl-5">
                    <li className="whitespace-nowrap">Current Price USD: {price}</li>
                    <li className="whitespace-nowrap">All time high price USD: {allTimeHighPrice}</li>
                    <li className="whitespace-nowrap">Market Cap USD: {marketCap}</li>
                    <li className="whitespace-nowrap">Market Cap Rank: {marketCapRank}</li>
                </ul>
            </div>

        </div>
    )
}

export default CurrentCard;