import { toast } from 'react-toastify';
import RemoveUserFromClassToast from './RemoveUserFromClassToast';

const UserRemoveFromClass = (classId, dispatch, onSuccess) => {
  const handleRemove = (user) => {
    toast(<RemoveUserFromClassToast classId={classId} user={user} dispatch={dispatch} onSuccess={onSuccess} />, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
    });
  };

  return handleRemove;
};

export default UserRemoveFromClass;
