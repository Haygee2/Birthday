import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !message) return;

    await supabase.from("wishes").insert([{ name, message }]);

    setName("");
    setMessage("");
    fetchWishes();
    alert("Thank you for celebrating with HAYGEE 🎉");
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-4">
          🎉 It’s HAYGEE’s Birthday 🎉
        </h1>

        <p className="text-center mb-6">
          Drop a birthday wish below and celebrate with me ❤️
        </p>

        {/* Gift Section */}
        <div className="bg-white text-black p-4 rounded-xl mb-6 shadow-lg">
          <h2 className="font-bold text-lg mb-2">🎁 Send a Gift</h2>
          <p>Bank: YOUR BANK</p>
          <p>Account Name: YOUR NAME</p>
          <p>Account Number: YOUR ACCOUNT NUMBER</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl text-black mb-6">
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
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Send Wish 🎉
          </button>
        </form>

        {/* Wishes */}
        <div>
          <h2 className="text-xl font-bold mb-3">💌 Birthday Wishes</h2>

          {wishes.map((wish) => (
            <div key={wish.id} className="bg-white text-black p-3 rounded mb-3 shadow">
              <h3 className="font-bold">{wish.name}</h3>
              <p>{wish.message}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
