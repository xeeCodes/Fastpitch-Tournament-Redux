// PlayerDetails.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerForm from './PlayerForm';
import { playerListAction, playerDeleteAction } from '../actions/registerationAction';

export default function PlayerDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const dispatch = useDispatch();
  const allPlayers = useSelector(state => state.registrationSlice.playerList);

  useEffect(() => {
    dispatch(playerListAction());
  }, [dispatch]);

  const handleEdit = (player, e) => {
    e?.stopPropagation(); // Prevent event bubbling
    console.log("EDIT CLICKED FOR:", player.firstName, player.playerId);
    setEditingPlayer(player);
    setIsModalOpen(true);
  };

const handleDelete = async (id, e) => {
  e?.stopPropagation();
  
  if (!id || isDeleting) return;
  
  if (window.confirm('Delete this player?')) {
    setIsDeleting(true);
    try {
      await dispatch(playerDeleteAction(id));
      // Optionally refresh the list
      dispatch(playerListAction());
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  }
};

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
  };

  // Add row click handler if you want clickable rows
  const handleRowClick = (player) => {
    // Optional: Add row click functionality if needed
    console.log('Row clicked:', player.playerId);
  };
  

  return (
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
            <tr 
              key={player.playerId} // Don't forget the key prop!
              onClick={() => handleRowClick(player)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td>{player.playerId}</td>
              <td>{player.firstName}</td>
              <td>{player.guardianEmail}</td>
              <td>{player.primaryPosition}</td>
              <td onClick={(e) => e.stopPropagation()}> {/* Stop row click in actions column */}
                <div className="flex space-x-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={(e) => handleEdit(player, e)}
                  >
                    Edit
                  </button>
                 <button
  className="btn btn-sm btn-error"
  onClick={(e) => handleDelete(player.playerId, e)}
  disabled={isDeleting}
>
  {isDeleting ? 'Deleting...' : 'Delete'}
</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {isModalOpen && (
        <PlayerForm
          editingPlayer={editingPlayer}
          open={isModalOpen}
          onClose={handleClose}
        />
      )}
    </div>
  );
}