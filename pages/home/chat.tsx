"use client";

import { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-8 pb-20">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full motion-preset-slide-down mt-12 ml-5">
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full inline-flex">
                    <Bot className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-3xl">
                    Hello. I&apos;m Sehnsucht (the AI).
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Ask me anything about me. I&apos;ll (hopefully) respond
                    accurately.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-4",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {message.role !== "user" && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        AI
                      </AvatarFallback>
                      <AvatarImage src="/bot-avatar.jpg" alt="AI Assistant" />
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%] text-xl",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <p className="text-xl">{message.content}</p>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10 text-lg">
                        U
                      </AvatarFallback>
                      <AvatarImage src="/user-avatar.png" alt="User" />
                    </Avatar>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="bg-background border-t p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Message AI assistant..."
              className="resize-none pr-14 min-h-[48px] w-full rounded-lg border"
              style={{
                fontSize: "1.25rem", // text-xl
                lineHeight: "1.75rem", // Adjusted line height
              }}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  handleSubmit(e as any);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8"
              disabled={isLoading || !input.trim()}
            >
              <ArrowUp className="h-6 w-6" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <div className="text-md text-center mt-2 text-muted-foreground">
            AI may produce inaccurate information. Consider verifying important
            information.
          </div>
        </div>
      </div>
    </div>
  );
}
