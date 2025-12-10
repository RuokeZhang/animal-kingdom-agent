```jsx
'use client';

import { useState } from 'react';

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [speciesInput, setSpeciesInput] = useState('');

  const sendMessage = async (payload) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { question: payload.message || `Profile: ${payload.speciesName}`, answer: data }]);
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ message: input });
    setInput('');
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    if (!speciesInput.trim()) return;
    await sendMessage({ speciesName: speciesInput });
    setSpeciesInput('');
  };

  const sendFeedback = async (message, answer, helpful) => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, answer, helpful })
    });
    // TODO: surface toast or UI indication of submitted feedback
  };

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px' }}>
      <h1>Zoology Assistant</h1>
      <p>Ask about animal biology, behavior, habitats, conservation. Profiles are sourced from a curated knowledge base.</p>

      <section style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
        <form onSubmit={handleAsk} style={{ flex: 2, display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a zoology question..."
            style={{ flex: 1, padding: '10px' }}
          />
          <button type="submit">Ask</button>
        </form>
        <form onSubmit={handleProfile} style={{ flex: 1, display: 'flex', gap: '8px' }}>
          <input
            value={speciesInput}
            onChange={(e) => setSpeciesInput(e.target.value)}
            placeholder="Species name (e.g., Snow Leopard)"
            style={{ flex: 1, padding: '10px' }}
          />
          <button type="submit">Profile</button>
        </form>
      </section>

      <section style={{ marginTop: '24px', display: 'grid', gap: '12px' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ background: '#fff', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600 }}>Q: {m.question}</div>
            <div style={{ marginTop: '8px' }}>
              <div dangerouslySetInnerHTML={{ __html: m.answer.text?.replace(/\n/g, '<br/>') ?? '' }} />
              {m.answer.profile && (
                <div style={{ marginTop: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                  <div><strong>Common name:</strong> {m.answer.profile.commonName}</div>
                  <div><strong>Scientific name:</strong> {m.answer.profile.scientificName}</div>
                  <div><strong>Taxonomy:</strong> {m.answer.profile.taxonomy.join(' › ')}</div>
                  <div><strong>Distribution:</strong> {m.answer.profile.distribution}</div>
                  <div><strong>Diet:</strong> {m.answer.profile.diet}</div>
                  <div><strong>Behavior:</strong> {m.answer.profile.behavior}</div>
                  <div><strong>Conservation status:</strong> {m.answer.profile.conservationStatus}</div>
                </div>
              )}
              {m.answer.citations && m.answer.citations.length > 0 && (
                <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#4b5563' }}>
                  <strong>Citations:</strong> {m.answer.citations.join('; ')}
                </div>
              )}
            </div>
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button onClick={() => sendFeedback(m.question, m.answer.text, true)}>Helpful</button>
              <button onClick={() => sendFeedback(m.question, m.answer.text, false)}>Not helpful</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
```
