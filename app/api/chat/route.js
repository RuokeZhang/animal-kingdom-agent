```js
import { NextResponse } from 'next/server';
import { getSpeciesProfile, searchKnowledge, logs } from '../../../lib/zooData.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, speciesName } = body || {};

    if (speciesName) {
      // Species profile flow
      const profile = getSpeciesProfile(speciesName);
      const text = profile
        ? `Here is the profile for ${profile.commonName} (${profile.scientificName}).`
        : `No profile found for "${speciesName}".`;
      logs.push({ type: 'profile', query: speciesName, timestamp: Date.now(), profileFound: !!profile });
      return NextResponse.json({
        text,
        profile,
        citations: profile ? [profile.source] : []
      });
    }

    // General question flow
    const hits = searchKnowledge(message || '');
    const summary = hits.length
      ? hits.map((h) => `- ${h.commonName || h.title}: ${h.summary || h.behavior || h.diet || h.distribution}`).join('\n')
      : 'I did not find a direct match in the current zoology knowledge base.';
    const answer = `Based on the curated zoology knowledge base:\n${summary}\n\nLet me know if you want a species profile.`;
    logs.push({ type: 'qa', query: message, timestamp: Date.now(), hitCount: hits.length });
    return NextResponse.json({
      text: answer,
      citations: hits.map((h) => h.source)
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
```
