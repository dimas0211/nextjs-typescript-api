import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ name, image, price, high, low, id }: CardProps) => {
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
          <li className="whitespace-nowrap">24h High Price USD: {high}</li>
          <li className="whitespace-nowrap">24h Low Price USD: {low}</li>
        </ul>
      </div>
      <div className="p-4 mx-auto">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={`currency/${id}`}>
          More
        </Link>
      </div>
    </div>
  );
};

export default Card;
