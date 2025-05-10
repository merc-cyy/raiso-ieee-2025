import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, job_id, type } = req.body; // Expect 'type' ('like' or 'apply') from the frontend
  //console.log("Received user_id:", user_id, "job_id:", job_id, "type:", type);

  if (!type || (type !== 'like' && type !== 'apply')) {
    return res.status(400).json({ error: "Missing or invalid 'type' parameter ('like' or 'apply' expected)" });
  }

  //to check if the entry already exists for this user, job, and type
  const { data: existingInterest, error: selectError } = await supabase
    .from('user_interests')
    .select('*')
    .eq('user_id', user_id)
    .eq('job_id', job_id)
    .eq('type', type)
    .maybeSingle();

  if (selectError) {
    console.error("Error checking existing interest:", selectError);
    return res.status(500).json({ error: "Failed to check existing interest" });
  }

  if (existingInterest) {
    console.log("Interest already recorded for this user, job, and type");
    return res.status(200).json({ message: 'Interest already recorded' });
  }

  const { data, error } = await supabase
    .from('user_interests')
    .insert([{ user_id, job_id, type }]); // Now we store the 'type'

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Interest added' });
});

router.delete('/', async (req, res) => {
  const { user_id, job_id, type } = req.body; // Expect 'type' to specify what to remove

  if (!type || (type !== 'like' && type !== 'apply')) {
    return res.status(400).json({ error: "Missing or invalid 'type' parameter ('like' or 'apply' expected for removal)" });
  }

  const { error } = await supabase
    .from('user_interests')
    .delete()
    .match({ user_id, job_id, type });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Interest removed' });
});

// GET route to get all liked jobs for a user
router.get('/liked/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('user_interests')
    .select('jobs(*)')
    .eq('user_id', user_id)
    .eq('type', 'like');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map((entry) => entry.jobs));
});

// GET route to get all applied jobs for a user
router.get('/applied/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log("Fetching liked jobs for user:", user_id);  // Log for debugging
  const { data, error } = await supabase
    .from('user_interests')
    .select('jobs(*)')
    .eq('user_id', user_id)
    .eq('type', 'apply');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map((entry) => entry.jobs));
});

// GET route to get IDs of all liked jobs for a user (for frontend state)
router.get('/liked/ids/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('user_interests')
    .select('job_id')
    .eq('user_id', user_id)
    .eq('type', 'like');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(item => item.job_id));
});

// GET route to get IDs of all applied jobs for a user (for frontend state)
router.get('/applied/ids/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('user_interests')
    .select('job_id')
    .eq('user_id', user_id)
    .eq('type', 'apply');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(item => item.job_id));
});

// Existing GET route (you might want to keep this for fetching all interests)
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