import React, { useState, useEffect } from "react";
import "./Journal.css";

// Use your backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5060";

export const Journal = ({ user }) => {
  const [entries, setEntries] = useState([]);
  const [activity, setActivity] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${API_URL}/api/journal/${user.email}`);
      const data = await res.json();
      setEntries(data.entries.reverse()); // show latest first
    } catch (err) {
      console.error(err);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activity || !content) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/journal/${user.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity, content }),
      });

      const data = await res.json();
      if (res.ok) {
        setEntries([data.entry, ...entries]); // prepend new entry
        setActivity("");
        setContent("");
      } else {
        setMessage(data.message || "Failed to add entry");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="journal-login">Please log in to view your journal.</p>;

  return (
    <div className="journal-container">
      <h2 className="journal-title">Your Journal</h2>

      <form className="journal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity (e.g. Study, Workout)"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Entry"}
        </button>
      </form>

      {message && <p className="journal-message">{message}</p>}

      <div className="journal-entries">
        {entries.length === 0 && <p>No entries yet. Start journaling!</p>}
        {entries.map((entry, idx) => (
          <div key={idx} className="journal-card">
            <div className="journal-date">{entry.date}</div>
            <div className="journal-activity">{entry.activity}</div>
            <div className="journal-content">{entry.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
