import { useEffect, useState } from "react";
import { supabase } from "./supabase";

// Confetti CDN will be loaded in index.html
const launchConfetti = () => {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
};

// Set your birthday here
const BIRTHDAY = new Date("2026-02-22T00:00:00");

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ADMIN_PASS = "haygee123";
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Bank accounts array
  const bankAccounts = [
    { bank: "OPAY", accountName: "ADEBOWALE GOODNESS IBUKUNOLUWA", accountNumber: "7053170440" },
    { bank: "PAYPAL", accountName: "Goodness Ibukunoluwa", accountNumber: "adebowalegoodness688@gmail.com" },
  ];

  // Fetch wishes
  useEffect(() => {
    fetchWishes();
  }, []);

  async function fetchWishes() {
    const { data } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false });

    setWishes(data || []);
  }

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = BIRTHDAY - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Submit wish
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !message) return;

    await supabase.from("wishes").insert([{ name, message }]);
    setName("");
    setMessage("");
    fetchWishes();
    launchConfetti();
    alert("Thank you for celebrating with HAYGEE 🎉");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-xl max-w-xl w-full p-6">

        {/* 👇 Admin login form */}
    {!isAdmin && (
      <div className="bg-white bg-opacity-90 p-4 rounded-2xl mb-6 shadow-md text-center">
        <input
          type="password"
          placeholder="Admin Password"
          className="p-2 mb-2 border rounded w-full"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button
          onClick={() => {
            if (adminPassword === ADMIN_PASS) {
              setIsAdmin(true);
              setAdminPassword("");
            } else {
              alert("Incorrect password");
            }
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Login
        </button>
      </div>
    )}
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          🎉 HAYGEE’s Birthday 🎉
        </h1>
        <p className="text-center text-white mb-4">Celebrate with me! Drop a wish or send a gift ❤️</p>

        {/* Countdown */}
        <div className="bg-white bg-opacity-80 p-4 rounded-2xl text-center font-bold text-purple-800 mb-6 shadow-md">
          <h2 className="text-lg mb-2">Birthday Countdown</h2>
          <div className="flex justify-around text-xl">
            <span>{countdown.days}d</span>
            <span>{countdown.hours}h</span>
            <span>{countdown.minutes}m</span>
            <span>{countdown.seconds}s</span>
          </div>
        </div>

        {/* Bank accounts */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3">🎁 Send a Gift</h2>
          {bankAccounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white bg-opacity-90 p-4 rounded-2xl mb-3 shadow-xl border-l-8 border-yellow-400"
            >
              <p className="font-bold">{acc.bank}</p>
              <p>Account Name: {acc.accountName}</p>
              <p>Account Number: {acc.accountNumber}</p>
            </div>
          ))}
        </div>

        {/* Wish Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl text-black mb-6 shadow-md">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Your Birthday Wish..."
            className="w-full p-2 mb-3 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
          >
            Send Wish 🎉
          </button>
        </form>

        {/* Wishes Wall */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-white">💌 Birthday Wishes</h2>
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-white bg-opacity-80 p-3 rounded-2xl mb-3 shadow-md hover:scale-105 transition-transform"
            >
              <h3 className="font-bold text-purple-800">{wish.name}</h3>
              <p className="text-gray-800">{wish.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
