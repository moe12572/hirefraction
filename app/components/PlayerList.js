'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PlayerTable from './PlayerTable';

function PlayerList({ players, onSelectPlayer }) {

  return (
    <div>
      <PlayerTable players={players} onSelectPlayer={onSelectPlayer} />
    </div>
  );
}

export default PlayerList;