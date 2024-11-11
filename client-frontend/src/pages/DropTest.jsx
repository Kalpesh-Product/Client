import React, { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import usersData from "../dummyData/userData.json"; // Importing our dummy JSON data

// UserCard Component
function UserCard({ id, name, role }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer"
    >
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  );
}

// DropTest Component
function DropTest() {
  const [users, setUsers] = useState([]);

  // Load data from JSON
  useEffect(() => {
    setUsers(usersData);
  }, []);

  // Handle drag end and swap items
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      setUsers((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={users} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
          {users.map((user) => (
            <UserCard key={user.id} id={user.id} name={user.name} role={user.role} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default DropTest;
