import ChatScreen from "../components/chat-components/ChatScreen";
import ChatSidebar from "../components/chat-components/ChatSidebar";
import Sidebar from "../components/ClientSidebar";

export default function ChatPage() {
  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <ChatSidebar />
      {/* Chat Screen */}
      <div className="flex-grow h-full overflow-hidden">
        <ChatScreen />
      </div>
    </main>
  );
}

