import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 250;
  const { data, error } = await supabase.from('jobs').select('*').limit(limit);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Job not found' });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { title, company, description, start_date, end_date } = req.body;

  const { data, error } = await supabase.from('jobs').insert([
    {
      title,
      company,
      description,
      start_date: start_date || null,
      end_date: end_date || null
    }
  ]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, company, description, start_date, end_date } = req.body;

  const { data, error } = await supabase
    .from('jobs')
    .update({
      title,
      company,
      description,
      start_date: start_date || null,
      end_date: end_date || null
    })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('jobs').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Job deleted successfully' });
});

export default router;
