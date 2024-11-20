import React, { useEffect, useState } from "react";
import AssetsData from "./AssetsData";
import { NewModal } from "../../../components/NewModal";
import AssignAssetForm from "./AssignAssetForm";
import AddAssetForm from "./AddAssetForm";

const ManageAsset = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    console.log(user); 
    console.log(user.name);
  }, []);


  const handleOpenModal = (type) => {
    setOpenModal(type);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };
  return (
    <div className="p-6">
      <div>
        <div className="flex gap-4 justify-end">
          <button
             onClick={() => handleOpenModal("add")}
            className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
          >
            Add Assets
          </button>
          <button
             onClick={() => handleOpenModal("assign")}
            className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
          >
            Assign Asset
          </button>
          <button className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
            Revoke Asset
          </button>
        </div>
        <AssetsData />
      </div>

     {/* Modal */}
     <NewModal open={!!openModal} onClose={handleCloseModal}>
        {openModal === "add" && (
          <AddAssetForm user={user} title="Add Asset" handleClose={handleCloseModal} />
        )}
        {openModal === "assign" && (
          <AssignAssetForm handleCloseModal={handleCloseModal} />
        )}
      </NewModal>
    </div>
  );
};

export default ManageAsset;
