import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function PlayerTable({ players, onSelectPlayer }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Player</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Hits</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Bats</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.Rank}</TableCell>
              <TableCell>{player.Player}</TableCell>
              <TableCell>{player.AgeThatYear}</TableCell>
              <TableCell>{player.Hits}</TableCell>
              <TableCell>{player.Year}</TableCell>
              <TableCell>{player.Bats}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onSelectPlayer(player.id)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayerTable; 