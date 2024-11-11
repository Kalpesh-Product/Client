import { flattenData } from "../../utils/data";
import Chat from "./Chat";
import { useState } from "react";

export default function ChatSidebar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
  const [data, setData] = useState(flattenData);

  return (
    <aside className="min-h-screen w-64 overflow-y-auto">
      <h2 className="text-2xl font-bold p-4 sticky">Chats</h2>
      <div className="w-full h-full p-4 border-l border-t border-gray-300 shadow-lg bg-white">
        {data.map((item, index) =>
          item.email !== storedUser.email ? (
            <Chat key={index} item={item} />
          ) : null
        )}
      </div>
    </aside>
  );
  
}
