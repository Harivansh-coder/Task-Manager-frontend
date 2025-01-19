import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import EditModal from "./EditModal";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%", // Default for large screens
  "@media (max-width: 1200px)": { width: "50%" },
  "@media (max-width: 600px)": { width: "80%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function TaskCard({
  id,
  task,
  description,
  date,
}: {
  id: string;
  task: string;
  description: string;
  date: string;
}) {
  const iconColors = "action";

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    setOpen(true);
    console.log(`Edit task with id: ${id}`);
  };

  const handleDelete = () => {
    console.log(`Delete task with id: ${id}`);
  };

  return (
    <div className="flex justify-between bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-2">{task}</h1>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>
      <div className="flex justify-end gap-2 ">
        <EditIcon
          className="hover:scale-125"
          color={iconColors}
          onClick={handleEdit}
        />

        <DeleteIcon
          className="hover:scale-125"
          color="warning"
          onClick={handleDelete}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditModal id={id} />
        </Box>
      </Modal>
    </div>
  );
}

export default TaskCard;
