import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, job_id } = req.body;
  //console.log("Received user_id:", user_id, "and job_id:", job_id, " (Type:", typeof job_id, ")");


  //to check if the entry already exists
  const { data: existingInterest, error: selectError } = await supabase
      .from('user_interests')
      .select('*')
      .eq('user_id', user_id)
      .eq('job_id', job_id)
      .maybeSingle(); // Assuming you expect at most one match

    // console.log("data:", existingInterest);
    // console.log("error:", selectError);

    if (selectError) {
      console.error("Error checking existing interest:", selectError);
      return res.status(500).json({ error: "Failed to check existing interest" });
    }

    if (existingInterest) {
      // An entry already exists, so don't insert again
      console.log("interest already recorded");
      return res.status(200).json({ message: 'Interest already recorded' }); // Or a different status code/message
    }

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
