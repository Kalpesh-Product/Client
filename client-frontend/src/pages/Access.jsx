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
        const response = await axios.get(
          "http://localhost:5000/api/roles/get-roles"
        );
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
      await axios.post("http://localhost:5000/api/roles/update-roles", {
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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <TestSide />

      {/* Main Content */}
      <main className="flex-1 p-4 ml-4 md:p-8 motion-preset-blur-right-md overflow-y-auto">
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

        <div>
          <TableBody>
            {editedRoles.map((role) => (
              <>
                {/* Role Title */}
                <TableRow key={role._id}>
                  <TableCell rowSpan={role.modulePermissions.length + 1}>
                    <strong>{role.roleTitle}</strong>
                  </TableCell>
                </TableRow>
                {role.modulePermissions.map((modulePermission, moduleIndex) => (
                  <>
                    {/* Module Title and Permissions */}
                    <TableRow key={`${role._id}-${moduleIndex}`}>
                      <TableCell>
                        <strong>{modulePermission.module.moduleTitle}</strong>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {/* Module-Level Permissions */}
                        Read:{" "}
                        <Switch
                          checked={modulePermission.modulePermissions.read}
                          onChange={() =>
                            handleToggle(
                              role._id,
                              moduleIndex,
                              null,
                              "modulePermissions.read"
                            )
                          }
                          disabled={!isEditing}
                        />
                        Write:{" "}
                        <Switch
                          checked={modulePermission.modulePermissions.write}
                          onChange={() =>
                            handleToggle(
                              role._id,
                              moduleIndex,
                              null,
                              "modulePermissions.write"
                            )
                          }
                          disabled={!isEditing}
                        />
                      </TableCell>
                    </TableRow>

                    {/* Submodule Rows */}
                    {modulePermission.subModulePermissions.map(
                      (subModulePermission, subIndex) => (
                        <TableRow
                          key={`${role._id}-${moduleIndex}-${subIndex}`}
                        >
                          <TableCell>
                            {subModulePermission.subModule.subModuleTitle}
                          </TableCell>
                          <TableCell>
                            {/* Submodule-Level Permissions */}
                            Read:{" "}
                            <Switch
                              checked={subModulePermission.permissions.read}
                              onChange={() =>
                                handleToggle(
                                  role._id,
                                  moduleIndex,
                                  subIndex,
                                  "subModulePermissions.read"
                                )
                              }
                              disabled={!isEditing}
                            />
                            Write:{" "}
                            <Switch
                              checked={subModulePermission.permissions.write}
                              onChange={() =>
                                handleToggle(
                                  role._id,
                                  moduleIndex,
                                  subIndex,
                                  "subModulePermissions.write"
                                )
                              }
                              disabled={!isEditing}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </>
                ))}
              </>
            ))}
          </TableBody>
        </div>
      </main>
    </div>
  );
}
