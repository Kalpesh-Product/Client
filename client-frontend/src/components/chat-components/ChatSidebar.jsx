import { flattenData } from "../../utils/data";
import Chat from "./Chat";
import { useState } from "react";

export default function ChatSidebar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState(flattenData);
  const [search, setSearch] = useState("");
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("All");

  // Filtered data based on search input and selected company
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCompany =
      selectedCompany === "All" ||
      (selectedCompany === "BIZNest");

    return matchesSearch && matchesCompany;
  });

  const toggleDropdown = () => {
    setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setIsCompanyDropdownOpen(false);
  };

  return (
    <aside className="min-h-screen w-72 overflow-y-auto bg-white border-r border-gray-300 shadow-lg">
      {/* Header */}
      <div className="p-4 bg-black text-white text-xl font-bold flex items-center justify-between">
        <span>Chats</span>
      </div>

      {/* Company Dropdown */}
      <div className="p-4 cursor-pointer" onClick={toggleDropdown}>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{selectedCompany}</span>
          <span className="text-xl">{isCompanyDropdownOpen ? "▲" : "▼"}</span>
        </div>
        {isCompanyDropdownOpen && (
          <div className="mt-2 border-t border-gray-300">
            <div
              className="py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleCompanySelect("wono")}
            >
              WoNo
            </div>
            <div
              className="py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleCompanySelect("BIZNest")}
            >
              BIZNest
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Chat items list */}
      <div className="px-4 pb-4">
        {filteredData.map((item, index) =>
          item.email !== storedUser.email ? (
            <Chat key={index} item={item} />
          ) : null
        )}
      </div>
    </aside>
  );
}
