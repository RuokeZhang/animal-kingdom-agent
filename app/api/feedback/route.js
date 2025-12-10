```js
import { NextResponse } from 'next/server';
import { feedbackLog } from '../../../lib/zooData.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, answer, helpful } = body || {};
    feedbackLog.push({
      message: message || '',
      answer: answer || '',
      helpful: !!helpful,
      timestamp: Date.now()
    });
    // TODO: persist feedback to durable storage or analytics
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
```
