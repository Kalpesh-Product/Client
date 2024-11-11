import ChatScreen from "../components/chat-components/ChatScreen";
import ChatSidebar from "../components/chat-components/ChatSidebar";

export default function ChatPage() {
  return (
    <main className="flex h-screen overflow-y-hidden">
      {/* Sidebar */}
      <ChatSidebar />
      {/* Chat Screen */}
      <div className="flex-grow flex h-full overflow-hidden">
        <ChatScreen />
      </div>
    </main>
  );
}
