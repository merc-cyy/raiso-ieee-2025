import express from 'express';
import cors from 'cors';
import usersRouter from './routes/userRoutes.js';
import postsRouter from './routes/posts.js';
import interestsRouter from './routes/interests.js';
import supabase from './supabaseClient.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/interests', interestsRouter);

app.listen(5001, () => console.log('Server running on port 5001'));

app.get('/api/test-supabase', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*').limit(1);
  
    if (error) return res.status(500).json({ error: error.message });
    res.json({ connected: true, sampleUser: data[0] || null });
  });