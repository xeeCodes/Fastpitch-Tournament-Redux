import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerForm from './PlayerForm';
import { playerListAction, playerAction } from '../actions/registerationAction';

export default function PlayerDetails() {
  const dispatch = useDispatch();

  const allPlayers = useSelector(state => state.registrationSlice.playerList);// player list

  const singlePlayer = useSelector(state => state.registrationSlice.singlePlayer);//single player

  console.log("my player",singlePlayer);

  useEffect(() => {
    dispatch(playerListAction());
  }, [dispatch]);

 const openEditModal = (player) => {

  dispatch(playerAction(player.playerId));
 }

  useEffect(() => {
  if (singlePlayer) {
    document.getElementById("player-form").showModal();
  }
}, [singlePlayer]);

  return (
    <>
      <div className="overflow-x-auto p-6">
        <h2 className="text-2xl font-bold mb-6">All Players</h2>

        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPlayers?.map((player) => (
              <tr key={player._id}>
                <td>{player.playerId}</td>
                <td>{player.firstName}</td>
                <td>{player.guardianEmail}</td>
                <td>{player.primaryPosition}</td>
                <td>

                 <button
  onClick={() => {
    
    openEditModal(player);
  }}
  className="btn btn-sm btn-warning"
>
  Edit
</button>

                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PlayerForm editingPlayer={singlePlayer} />
      </div>
    </>
  );
}