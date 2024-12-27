import HierarchyTree from "../components/HierarchyTree";
import { data } from "../utils/data";
import TestSide from "../components/Sidetest";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Access() {
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoles, setEditedRoles] = useState([]);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles/get-roles");
        setRoles(response.data.roles);
        setEditedRoles(response.data.roles); // Initialize editable roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Toggle permissions
  const handleToggle = (roleId, moduleIndex, subIndex, field) => {
    const updatedRoles = [...editedRoles];
    const permission = updatedRoles.find((role) => role._id === roleId)
      .modulePermissions[moduleIndex].subModulePermissions[subIndex]
      .permissions;

    permission[field] = !permission[field];
    setEditedRoles(updatedRoles);
  };

  // Enable editing
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save changes
  const handleSave = async () => {
    try {
      await axios.post("/api/roles/update-roles", {
        roles: editedRoles,
      });
      setRoles(editedRoles); // Update displayed roles
      setIsEditing(false);
      toast.success("Permissions updated successfully!");
    } catch (error) {
      console.error("Error updating roles:", error);
      toast.error("Failed to update permissions.");
    }
  };
  return (
    <div className="flex min-h-screen overflow-y-auto bg-slate-50">
      

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-6 motion-preset-blur-right-md h-screen overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Access
          </h1>
        </div>

        <div className="overflow-x-auto p-4 md:p-8 flex justify-center">
          <div className="max-w-4xl w-full motion-preset-expand">
            <HierarchyTree data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
