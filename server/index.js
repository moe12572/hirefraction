const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3001;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Fetch players and calculate rank
app.get('/api/players', async (req, res) => {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('Hits', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  // Calculate rank based on hits
  data.forEach((player, index) => {
    player.Rank = index + 1;
  });

  res.json(data);
});

// Update player data
app.put('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const { Player, AgeThatYear, Hits, Year, Bats } = req.body;

  const { data, error } = await supabase
    .from('players')
    .update({ Player, AgeThatYear, Hits, Year, Bats })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 