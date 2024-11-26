'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function PlayerDetails({ playerId }) {
  const [player, setPlayer] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single();

      if (error) {
        console.error('Error fetching player:', error);
      } else {
        setPlayer(data);
        fetchDescription(data);
      }
    };

    const fetchDescription = async (playerData) => {
      setLoading(true);
      try {
        const response = await fetch('/api/generate-description', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ player: playerData }),
        });
        const result = await response.json();
        setDescription(result.description);
      } catch (error) {
        console.error('Error fetching description:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const handleEdit = async () => {
    // Implement edit functionality
  };

  if (!player) return <div>Loading player data...</div>;

  return (
    <div>
      <h2>{player.Player}</h2>
      <p>Age: {player.AgeThatYear}</p>
      <p>Hits: {player.Hits}</p>
      <p>Year: {player.Year}</p>
      <p>Bats: {player.Bats}</p>
      {loading ? <p>Loading description...</p> : <p>{description}</p>}
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default PlayerDetails;