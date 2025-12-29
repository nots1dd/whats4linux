import { store } from "../../../wailsjs/go/models"
import { MessageItem } from "./MessageItem"

interface MessageListProps {
  chatId: string
  messages: store.Message[]
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  sentMediaCache: React.MutableRefObject<Map<string, string>>
}

export function MessageList({
  chatId,
  messages,
  messagesEndRef,
  sentMediaCache,
}: MessageListProps) {
  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-repeat"
      style={{ backgroundImage: "url('/assets/images/bg-chat-tile-dark.png')" }}
    >
      {messages.map((msg, idx) => (
        <MessageItem
          key={msg.Info.ID || idx}
          message={msg}
          chatId={chatId}
          sentMediaCache={sentMediaCache}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
