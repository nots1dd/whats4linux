import { store } from "../../../wailsjs/go/models"

interface MessageItemProps {
  message: store.Message
  chatId: string
  sentMediaCache: React.MutableRefObject<Map<string, string>>
}

export function MessageItem({ message, chatId, sentMediaCache }: MessageItemProps) {
  const isFromMe = message.Info.IsFromMe
  const timestamp = new Date(message.Info.Timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  // Get message content
  const getMessageContent = () => {
    if (message.Content?.conversation) {
      return message.Content.conversation
    }
    if (message.Content?.imageMessage) {
      return message.Content.imageMessage.caption || "📷 Image"
    }
    if (message.Content?.videoMessage) {
      return message.Content.videoMessage.caption || "🎥 Video"
    }
    if (message.Content?.audioMessage) {
      return "🎵 Audio"
    }
    if (message.Content?.documentMessage) {
      return message.Content.documentMessage.caption || "📄 Document"
    }
    return "Media message"
  }

  return (
    <div className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-3 py-2 ${
          isFromMe
            ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-gray-900 dark:text-white"
            : "bg-white dark:bg-[#202c33] text-gray-900 dark:text-white"
        }`}
      >
        <p className="break-words">{getMessageContent()}</p>
        <span className="text-xs text-gray-500 dark:text-gray-400 float-right ml-2">
          {timestamp}
        </span>
      </div>
    </div>
  )
}
