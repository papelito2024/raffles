import React, { createContext, useContext, useState, ReactNode } from 'react';
import { format } from 'date-fns';

interface Ticket {
  id: string;
  userId: string;
  userName: string;
  purchaseDate: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface Raffle {
  id: string;
  title: string;
  description: string;
  prizes: string[];
  ticketPrice: number;
  createdAt: string;
  tickets: Ticket[];
  comments: Comment[];
}

interface RaffleContextType {
  raffles: Raffle[];
  currentUser: { id: string; name: string } | null;
  createRaffle: (raffle: Omit<Raffle, 'tickets' | 'comments'>) => void;
  deleteRaffle: (id: string) => void;
  getRaffleById: (id: string) => Raffle | undefined;
  buyTicket: (raffleId: string) => void;
  addComment: (raffleId: string, content: string) => void;
  login: (name: string) => void;
  logout: () => void;
}

const RaffleContext = createContext<RaffleContextType | undefined>(undefined);

export const RaffleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(null);

  const createRaffle = (raffle: Omit<Raffle, 'tickets' | 'comments'>) => {
    setRaffles((prev) => [
      ...prev,
      { ...raffle, tickets: [], comments: [] },
    ]);
  };

  const deleteRaffle = (id: string) => {
    setRaffles((prev) => prev.filter((raffle) => raffle.id !== id));
  };

  const getRaffleById = (id: string) => {
    return raffles.find((raffle) => raffle.id === id);
  };

  const buyTicket = (raffleId: string) => {
    if (!currentUser) return;

    setRaffles((prev) =>
      prev.map((raffle) => {
        if (raffle.id === raffleId) {
          const newTicket: Ticket = {
            id: Date.now().toString(),
            userId: currentUser.id,
            userName: currentUser.name,
            purchaseDate: new Date().toISOString(),
          };
          return {
            ...raffle,
            tickets: [...raffle.tickets, newTicket],
          };
        }
        return raffle;
      })
    );
  };

  const addComment = (raffleId: string, content: string) => {
    if (!currentUser) return;

    setRaffles((prev) =>
      prev.map((raffle) => {
        if (raffle.id === raffleId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            userId: currentUser.id,
            userName: currentUser.name,
            content,
            createdAt: new Date().toISOString(),
          };
          return {
            ...raffle,
            comments: [...raffle.comments, newComment],
          };
        }
        return raffle;
      })
    );
  };

  const login = (name: string) => {
    setCurrentUser({
      id: Date.now().toString(),
      name,
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <RaffleContext.Provider
      value={{
        raffles,
        currentUser,
        createRaffle,
        deleteRaffle,
        getRaffleById,
        buyTicket,
        addComment,
        login,
        logout,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffles = () => {
  const context = useContext(RaffleContext);
  if (context === undefined) {
    throw new Error('useRaffles must be used within a RaffleProvider');
  }
  return context;
};