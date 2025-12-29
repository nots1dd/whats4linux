import React from "react"

interface ChatInputProps {
  inputText: string
  pastedImage: string | null
  selectedFile: File | null
  selectedFileType: string
  showEmojiPicker: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  fileInputRef: React.RefObject<HTMLInputElement | null>
  emojiPickerRef: React.RefObject<HTMLDivElement | null>
  emojiButtonRef: React.RefObject<HTMLButtonElement | null>
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void
  onSendMessage: () => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: () => void
  onEmojiClick: (emojiData: { emoji: string }) => void
  onToggleEmojiPicker: () => void
}

export function ChatInput({
  inputText,
  pastedImage,
  selectedFile,
  selectedFileType,
  showEmojiPicker,
  textareaRef,
  fileInputRef,
  emojiPickerRef,
  emojiButtonRef,
  onInputChange,
  onKeyDown,
  onPaste,
  onSendMessage,
  onFileSelect,
  onRemoveFile,
  onEmojiClick,
  onToggleEmojiPicker,
}: ChatInputProps) {
  return (
    <div className="p-3 bg-light-secondary dark:bg-[#202c33]">
      <div className="flex items-end gap-2">
        <button
          ref={emojiButtonRef}
          onClick={onToggleEmojiPicker}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        >
          😊
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />

        <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            placeholder="Type a message"
            className="w-full p-2 bg-transparent resize-none outline-none text-gray-900 dark:text-white"
            rows={1}
          />
        </div>

        <button
          onClick={onSendMessage}
          className="p-2 bg-green-500 hover:bg-green-600 rounded-full text-white"
        >
          Send
        </button>
      </div>
    </div>
  )
}
