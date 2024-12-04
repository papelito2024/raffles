import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRaffles } from '../context/RaffleContext';
import { Gift, Calendar, Award, ArrowLeft, Ticket, MessageSquare, DollarSign } from 'lucide-react';
import { bbcodeToHtml } from '../utils/bbcode';
import { format } from 'date-fns';
import LoginModal from '../components/LoginModal';

const RaffleDetails = () => {
  const { id } = useParams();
  const { getRaffleById, currentUser, buyTicket, addComment } = useRaffles();
  const [comment, setComment] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [action, setAction] = useState<'buy' | 'comment' | null>(null);

  const raffle = getRaffleById(id || '');

  if (!raffle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Raffle not found
        </h2>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-700 inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const handleBuyTicket = () => {
    if (!currentUser) {
      setAction('buy');
      setShowLoginModal(true);
      return;
    }
    buyTicket(raffle.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAction('comment');
      setShowLoginModal(true);
      return;
    }
    if (comment.trim()) {
      addComment(raffle.id, comment.trim());
      setComment('');
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (action === 'buy') {
      buyTicket(raffle.id);
    }
  };

  const userTicketCount = currentUser
    ? raffle.tickets.filter((ticket) => ticket.userId === currentUser.id).length
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Gift className="h-12 w-12 text-indigo-600" />
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(raffle.createdAt), 'PPP')}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {raffle.title}
          </h1>

          <div
            className="prose prose-indigo max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: bbcodeToHtml(raffle.description) }}
          />

          <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">
                ${raffle.ticketPrice.toFixed(2)} per ticket
              </span>
            </div>
            <button
              onClick={handleBuyTicket}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Ticket className="h-5 w-5" />
              <span>Buy Ticket</span>
            </button>
          </div>

          {userTicketCount > 0 && (
            <div className="mb-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-indigo-800">
                You have {userTicketCount} ticket{userTicketCount > 1 ? 's' : ''} for this raffle
              </p>
            </div>
          )}

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="h-6 w-6 text-indigo-600 mr-2" />
              Available Prizes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raffle.prizes.map((prize, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3"
                >
                  <Gift className="h-5 w-5 text-indigo-600 mt-1" />
                  <span className="text-gray-700">{prize}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
              Comments
            </h2>
            
            <form onSubmit={handleComment} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                required
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {raffle.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.userName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'PPp')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
              
              {raffle.comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setAction(null);
        }}
      />
    </div>
  );
};

export default RaffleDetails;