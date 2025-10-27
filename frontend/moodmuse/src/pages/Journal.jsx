import React, { useState, useEffect } from "react";
import "./Journal.css";

const API_URL = "https://sturdy-xylophone-69vqpp4rjxxgcrrx7-5060.app.github.dev";

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
      setEntries(data.entries.reverse());
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
        setEntries((prev) => [data.entry, ...prev]);
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

  const handleDelete = async (entryId) => {
    try {
      const res = await fetch(
        `${API_URL}/api/journal/${user.email}/${entryId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      } else {
        console.error("Failed to delete entry");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return <p className="journal-login">Please log in to view your journal.</p>;

  return (
    <div className="journal-page">
  {/* Add New Entry Form */}
  <div className="journal-add-container">
    <h2 className="journal-title">Add New Entry</h2>
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
  </div>

  {/* My Journal */}
  <div className="journal-container">
    <h2 className="journal-title">My Journal</h2>
    <div className="journal-entries">
      {entries.length === 0 && <p>No entries yet.</p>}
      {entries.map((entry) => (
        <div key={entry.id} className="journal-card">
          <div className="journal-date">{entry.date}</div>
          <div className="journal-activity">{entry.activity}</div>
          <div className="journal-content">{entry.content}</div>
          <button
            className="delete-btn"
            onClick={() => handleDelete(entry.id)}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};
