// src/components/RafflesList.js

import React from 'react';

const raffles = [
  {
    id: 1,
    title: "Sorteo de Navidad",
    description: "¡Participa y gana un increíble premio de Navidad!",
    gift: "🎁", // Puede ser un ícono o un image URL
    participants: 150,
    comments: 25,
    date: "2024-12-24T18:00:00Z",
    coverImage: "https://via.placeholder.com/100x100?text=Navidad", // Imagen de portada
  },
  {
    id: 2,
    title: "Sorteo de Tecnología",
    description: "Gana los últimos gadgets tecnológicos del mercado.",
    gift: "🎧",
    participants: 220,
    comments: 48,
    date: "2024-11-30T12:00:00Z",
    coverImage: "https://via.placeholder.com/100x100?text=Tecnología",
  },
  {
    id: 3,
    title: "Sorteo de Viaje",
    description: "Gana un viaje a las Maldivas para 2 personas.",
    gift: "✈️",
    participants: 90,
    comments: 15,
    date: "2025-01-15T09:00:00Z",
    coverImage: "https://via.placeholder.com/100x100?text=Viaje",
  },
];

const RafflesList = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Lista de Sorteos</h2>
      <ul className="space-y-6">
        {raffles.map((raffle) => (
          <li
            key={raffle.id}
            className="flex items-center justify-between bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              {/* Imagen de portada */}
              <img
                src={raffle.coverImage}
                alt={raffle.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800">{raffle.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{raffle.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(raffle.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <span className="text-2xl text-yellow-500">{raffle.gift}</span>
              <div className="text-sm text-gray-500 mt-2">
                <span className="mr-2">{raffle.participants} participantes</span>
                <span className="mr-2">•</span>
                <span>{raffle.comments} comentarios</span>
              </div>
              <a
                href={`/raffle/${raffle.id}`}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Ver Sorteo
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RafflesList;
