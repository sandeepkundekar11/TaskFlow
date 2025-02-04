/* eslint-disable react/prop-types */
import Popup from "@/Components/Popups/Popup";
const UserDeletePopup = ({ onCancel, OnDelete, loading }) => {
  return (
    <Popup>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Delete Confirmation
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user? Deleting this user will
          also remove all associated tasks, subtasks, and activities
          permanently.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex justify-center items-center"
            onClick={OnDelete}
          >
            {loading ? (
              <div className="w-7 h-7 rounded-full bg-transparent border border-b-2 animate-spin "></div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Popup>
  );
};
export default UserDeletePopup;
