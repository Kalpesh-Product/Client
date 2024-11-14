import { useEffect, useState } from "react";
import TestSide from "../components/Sidetest";
import { IoMdSend, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import initialChats from "../utils/initialChats";

const contacts = [
  { id: 1, name: "Mac" },
  { id: 2, name: "Farzeen" },
  { id: 3, name: "Aaron" },
  { id: 4, name: "Kalpesh" },
  { id: 5, name: "BIZ Nest-admins", group: true },
  {
    id: 6,
    name: "Companies",
    group: true,
    subGroups: ["Zomato", "SquadStack"],
  },
];

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialChats(activeContact.name));
  const [message, setMessage] = useState("");
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactFilter, setContactFilter] = useState("All"); // New state for contact filter

  useEffect(() => {
    setMessages(initialChats(activeContact.name));
  }, [activeContact]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "Me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: message,
      fromMe: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: activeContact.name,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: "demo message",
          fromMe: false,
        },
      ]);
    }, 1000);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter contacts based on the search query and selected contact filter
  const filteredContacts = contacts.filter((contact) => {
    const isMatch = contact.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (contact.subGroups) {
      const subGroupMatch = contact.subGroups.some((sub) =>
        sub.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return isMatch || subGroupMatch;
    }

    // Filter based on selected contact filter
    if (contactFilter === "BIZNest") {
      return isMatch && contact.name.includes("BIZ");
    } else if (contactFilter === "WoNo") {
      return false; // Hide all contacts for "WoNo" filter
    }

    return isMatch;
  });

  return (
    <div className="flex h-screen bg-gray-100 overflow-y-auto top-0  ">
      {/* Sidebar */}
      <TestSide />
      <aside className="w-1/4 bg-white p-4 shadow-lg ">
        <h2 className="text-lg font-semibold">Chat</h2>

        {/* Filter Dropdown */}
        <select
          className="mt-2 mb-4 w-full p-2 rounded-xl border border-gray-300"
          value={contactFilter}
          onChange={(e) => setContactFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="BIZNest">BIZNest</option>
          <option value="WoNo">WoNo</option>
        </select>

        <input
          type="search"
          placeholder="Search"
          className="mt-4 mb-6 w-full p-2 rounded-xl bg-gray-200 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <ul className="space-y-2">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="space-y-1">
              <div
                className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                  activeContact.id === contact.id ||
                  (contact.subGroups &&
                    contact.subGroups.includes(activeContact.name))
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  if (contact.subGroups) {
                    setExpandedGroup(
                      expandedGroup === contact.id ? null : contact.id
                    );
                  } else {
                    setActiveContact(contact);
                  }
                }}
              >
                <span>{contact.name}</span>
                {/* Render indicator if the contact has subGroups */}
                {contact.subGroups && (
                  <span className="ml-2">
                    {expandedGroup === contact.id ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </span>
                )}
              </div>
              {/* Render subgroups if it's the expanded group */}
              {contact.subGroups && expandedGroup === contact.id && (
                <ul className="pl-4 space-y-1">
                  {contact.subGroups.map((subGroup, idx) => (
                    <li
                      key={idx}
                      className={`p-2 rounded cursor-pointer ${
                        activeContact.name === subGroup
                          ? "bg-blue-200"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        setActiveContact({
                          id: `${contact.id}-${idx}`,
                          name: subGroup,
                        })
                      }
                    >
                      {subGroup}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white motion-preset-blur-right-md">
        {/* Chat Header */}
        <header className="p-4 border-b flex items-center">
          <h3 className="font-semibold">{activeContact.name}</h3>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.fromMe ? "bg-blue-200" : "bg-purple-100"
                } shadow`}
              >
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                </p>
                <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <footer className="p-4 border-t flex items-center space-x-2">
          <textarea
            className="flex-1 px-4 py-2 border rounded-xl resize-none bg-gray-200"
            rows="1"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="p-4 bg-blue-500 text-white rounded-full"
            onClick={handleSendMessage}
          >
            <IoMdSend />
          </button>
        </footer>
      </div>
    </div>
  );
}
