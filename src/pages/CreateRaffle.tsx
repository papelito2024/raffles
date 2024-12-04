import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffles } from '../context/RaffleContext';
import { Plus, Minus, Gift, Eye, PenLine, DollarSign } from 'lucide-react';
import { bbcodeToHtml } from '../utils/bbcode';

const CreateRaffle = () => {
  const navigate = useNavigate();
  const { createRaffle } = useRaffles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [prizes, setPrizes] = useState(['']);
  const [isPreview, setIsPreview] = useState(false);

  const handleAddPrize = () => {
    setPrizes([...prizes, '']);
  };

  const handleRemovePrize = (index: number) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };

  const handlePrizeChange = (index: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index] = value;
    setPrizes(newPrizes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && prizes.every((prize) => prize.trim()) && ticketPrice) {
      createRaffle({
        id: Date.now().toString(),
        title,
        description,
        prizes: prizes.filter((prize) => prize.trim()),
        ticketPrice: parseFloat(ticketPrice),
        createdAt: new Date().toISOString(),
      });
      navigate('/admin');
    }
  };

  const bbcodeGuide = `
    [b]Bold[/b]
    [i]Italic[/i]
    [u]Underline[/u]
    [color=red]Colored text[/color]
    [size=20]Custom size text[/size]
    [center]Centered text[/center]
    [url=https://example.com]Link text[/url]
    [img]https://example.com/image.jpg[/img]
  `;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Gift className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Create New Raffle</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="ticketPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ticket Price ($)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="ticketPrice"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (BBCode enabled)
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPreview(false)}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center space-x-1 ${
                    !isPreview
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <PenLine className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreview(true)}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center space-x-1 ${
                    isPreview
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
            
            {isPreview ? (
              <div
                className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[200px] prose prose-indigo max-w-none"
                dangerouslySetInnerHTML={{ __html: bbcodeToHtml(description) }}
              />
            ) : (
              <>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                  required
                />
                <div className="mt-2">
                  <details className="text-sm text-gray-600">
                    <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                      Show BBCode Guide
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      {bbcodeGuide}
                    </pre>
                  </details>
                </div>
              </>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Prizes
              </label>
              <button
                type="button"
                onClick={handleAddPrize}
                className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Prize</span>
              </button>
            </div>
            <div className="space-y-3">
              {prizes.map((prize, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={prize}
                    onChange={(e) => handlePrizeChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Prize ${index + 1}`}
                    required
                  />
                  {prizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePrize(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Raffle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRaffle;