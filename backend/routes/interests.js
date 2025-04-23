import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, job_id } = req.body;

  const { data, error } = await supabase
    .from('user_interests')
    .insert([{ user_id, job_id }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Interest added' });
});

router.delete('/', async (req, res) => {
  const { user_id, job_id } = req.body;

  const { error } = await supabase
    .from('user_interests')
    .delete()
    .match({ user_id, job_id });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Interest removed' });
});

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('user_interests')
    .select('jobs(*)')
    .eq('user_id', user_id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map((entry) => entry.jobs));
});

export default router;
