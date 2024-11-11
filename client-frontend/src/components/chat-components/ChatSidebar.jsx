import { flattenData } from "../../utils/data";
import Chat from "./Chat";
import { useState } from "react";

export default function ChatSidebar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
  const [data, setData] = useState(flattenData);

  return (
    <aside className="w-full max-w-xs h-full p-4 border border-gray-300 rounded-lg shadow-lg bg-white overflow-y-auto">
      {data.map((item, index) =>
        item.email !== storedUser.email ? (
          <Chat key={index} item={item} />
        ) : null
      )}
    </aside>
  );
}
