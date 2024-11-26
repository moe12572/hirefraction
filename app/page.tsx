'use client';
import React, { useState, useEffect } from 'react';
import PlayerList from './components/PlayerList';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { createClient } from '@supabase/supabase-js';
import { generatePlayerDescription } from '../server/openai';

const HomePage: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('Hits', { ascending: false });

      if (error) {
        setLoading(false);
        console.error('Error fetching players:', error);
      } else {
        // Calculate rank based on hits
        data.forEach((player, index) => {
          player.Rank = index + 1;
        });
        setPlayers(data);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);


  const handlePlayerSelect = async (id: number) => {
    const playerData = players.find(player => player.id === id);
    setSelectedPlayer(playerData);

    console.log('playerData', playerData);
    const playerDescription = await fetchPlayerDescription(playerData);
    setDescription(playerDescription);
    setOpen(true);
  };

  const fetchPlayerDescription = async (playerData: any) => {
    setLoading(true);
    setOpen(true);
    try {
      const response = await generatePlayerDescription(playerData);
      return response;
    } catch (error) {
      console.error('Error fetching description:', error);
      return 'Failed to generate description';
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Baseball Player Stats</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div style={{ flex: 1, marginRight: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <PlayerList players={players} onSelectPlayer={handlePlayerSelect} />
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2>Player Description</h2>
          {loading ? <p>Loading description...</p> : <p>{description}</p>}
        </Box>
      </Modal>
    </div>
  );
};

export default HomePage;