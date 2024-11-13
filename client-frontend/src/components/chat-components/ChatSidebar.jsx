import { flattenData } from "../../utils/data";
import Chat from "./Chat";
import { useState } from "react";

export default function ChatSidebar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState(flattenData);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const groupedData = data.reduce((acc, item) => {
    const group = item.group || "Others";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <aside className="min-h-screen w-64 overflow-y-auto bg-white border-r shadow-lg">
      <h2 className="text-2xl font-bold p-4">Chats</h2>
      <div className="w-full h-full p-4">
        {Object.keys(groupedData).map((group, index) => (
          <div key={index}>
            <div
              onClick={() => toggleGroup(group)}
              className="flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-700">{group}</h3>
              <span className="text-sm text-blue-600 font-bold">
                {groupedData[group].length}
              </span>
            </div>
            {openGroups[group] && (
              <div className="pl-6">
                {groupedData[group].map((item, index) =>
                  item.email !== storedUser.email ? (
                    <Chat key={index} item={item} />
                  ) : null
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
