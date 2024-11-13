import ChatScreen from "../components/chat-components/ChatScreen";
import ChatSidebar from "../components/chat-components/ChatSidebar";
import TestSide from "../components/Sidetest";

export default function ChatPage() {
  return (
    <main className="flex h-screen overflow-y-hidden">
      <TestSide />
      <ChatSidebar />
      {/* Chat Screen */}
      <div className="flex-grow flex h-full overflow-hidden">
        <ChatScreen />
      </div>
    </main>
  );
}
