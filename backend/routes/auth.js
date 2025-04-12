import express from 'express';
import supabase from '../supabaseClient.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {
        id,
        email,
        description,
        first_name,
        last_name,
        city,
        state,
        zipcode
      } = req.body;
    
      if (!id || !email || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    
      const { data, error } = await supabase.from('users').insert([{
        id,
        email,
        description,
        first_name,
        last_name,
        city,
        state,
        zipcode
      }]);
    
      if (error) return res.status(500).json({ error: error.message });
    
      res.status(201).json({ user: data[0] });
    });


router.get('/me', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'Missing token' });

  const token = authorization.replace('Bearer ', '');

  const {
    data: { user },
    error
  } = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  const { data: profile, error: metaError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (metaError) return res.status(500).json({ error: metaError.message });

  res.json({ user: profile });
});

export default router;
