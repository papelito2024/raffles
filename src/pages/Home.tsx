import React from 'react';
import { Link } from 'react-router-dom';
import { useRaffles } from '../context/RaffleContext';
import { Gift, Calendar, Award } from 'lucide-react';
import { bbcodeToHtml } from '../utils/bbcode';

const Home = () => {
  const { raffles } = useRaffles();

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to RaffleHub
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover amazing prizes and participate in exciting raffles. Join our
          community and try your luck today!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffles.map((raffle) => (
          <Link
            key={raffle.id}
            to={`/raffle/${raffle.id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <Gift className="h-8 w-8 text-indigo-600" />
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(raffle.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {raffle.title}
            </h2>
            <div
              className="prose prose-sm prose-indigo max-w-none line-clamp-2"
              dangerouslySetInnerHTML={{ __html: bbcodeToHtml(raffle.description) }}
            />
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Prizes:
              </h3>
              <ul className="space-y-1">
                {raffle.prizes.map((prize, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    • {prize}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      {raffles.length === 0 && (
        <div className="text-center py-12">
          <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No raffles available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Home;