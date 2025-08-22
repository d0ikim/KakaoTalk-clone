import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { supabase } from './supabase.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'backend', timestamp: Date.now() });
});

app.get('/supabase/health', async (_req, res) => {
  try {
    const { data, error } = await supabase.from('health_check').select('id').limit(1);
    if (error) throw error;
    res.json({ ok: true, table: 'health_check', sample: data ?? [] });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});


