import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import CreateRaffle from './pages/CreateRaffle';
import RaffleDetails from './pages/RaffleDetails';
import Signup from './pages/Signin';
import Signin from './pages/Signin';
import Forgot from './pages/Forgot';
import RafflesList from './pages/test';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/test" element={<RafflesList />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/admin/create" element={<CreateRaffle />} />
            <Route path="/raffle/:id" element={<RaffleDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;