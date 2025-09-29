import React, { useEffect, useState } from "react";
import "./Journal.css";

export const Journal = ({ user }) => {
  const [entries, setEntries] = useState([]);
  const [activity, setActivity] = useState("");
  const [note, setNote] = useState("");

  const fetchJournal = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:5050/api/journal/${user.email}`);
    const data = await res.json();
    if (res.ok) {
      const today = new Date().toISOString().split("T")[0];
      setEntries(data.journal[today] || []);
    }
  };

  const addEntry = async () => {
    if (!user || !activity) return;
    const res = await fetch(`http://localhost:5050/api/journal/${user.email}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity, note }),
    });
    const data = await res.json();
    if (res.ok) {
      setEntries(data.journal);
      setActivity("");
      setNote("");
    }
  };

  useEffect(() => {
    fetchJournal();
  }, [user]);

  return (
    <div className="journal-container">
      <h2>Today's Journal</h2>
      <div className="journal-input">
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <div className="journal-entries">
        {entries.length === 0 && <p>No entries yet!</p>}
        {entries.map((e, idx) => (
          <div key={idx} className="journal-entry">
            <strong>{e.activity}</strong>
            {e.note && <p>{e.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
