"use client"
import React, { useState, useEffect, useRef } from "react";
import { createSocket } from '@/lib/socket';
import { toast } from "sonner";
import CommonAvatar from "../../ui/CommonAvatar";



export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string; // or Date if you're formatting it later
  firstName: string;
  lastName: string;
}

export default function LiveChat({ streamId }: { streamId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([ ]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null); 
  const [displayChat, setDisplayChat] = useState(false)

  useEffect(() => {
    let sock: any;

    const connectSocket = async () => {
      try {
        const res = await fetch('/api/chats');
        const data = await res.json();
        if (!data.token) return;

        sock = createSocket(data.token);
        sock.connect();
        sock.emit('join-room', streamId);
        toast.success('Joined for livechat')

        sock.on('receive-message', (message: ChatMessage) => {
          setMessages((prev) => [...prev, message]);
        });

        setSocket(sock);
      } catch (err) {
        console.error('Socket connect error:', err);
      }
    };

    connectSocket();

    return () => {
      if (sock) sock.disconnect();
    };
  }, [streamId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    socket.emit('send-message', {
      streamId,
      content: input,
    });

    setInput('');
  };

  const handleChange = (e: string) => {
    // setInput(e.target.value);
    setInput(e);
  };
  return (
    displayChat ? 
    <div className="bg-white border overflow-hidden rounded-3xl border-[#D8D8D8] z-20 min-w-[420px]!">
      <div className="bg-[#001625] p-5 flex gap-5">
        <div className="flex justify-between items-start ">
          <div className="bg-white rounded-full p-2  h-16 w-16 flex items-center justify-center">
            <img src="/logo.svg" className="scale-90" />
          </div>

        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold mb-1">Chat</h2>
          <p className="text-white text-base leading-7">
            Chat and order products
          </p>
        </div>

        <button onClick={()=>setDisplayChat(false)}  className="absolute right-5 top-5 cursor-pointer bg-white/70  rounded-full " aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M6 6L18 18M6 18L18 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
      </div>

      <div className="p-4 w-full ">
        <div
          ref={scrollRef}
         className="flex flex-col w-full gap-5 max-h-[300px] min-h-[300px] overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-2.5 w-full">
              <CommonAvatar firstName={message.firstName} lastName={message.lastName} />
              {/* <div className="bg-gradient-to-r from-[#760F6D] to-[#DC1CCC] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center border-4 border-white/70">
                {message.firstName?.charAt(0).toUpperCase() || ''}
                {message.lastName?.charAt(0).toUpperCase() || ''}
              </div> */}
                <div className="bg-[#001625] text-white mb-[5px] px-[15px] py-2.5 rounded-[10px_0px_10px_10px] w-full mr-2">
                  {message.content}
                </div>
            </div>
          ))}


        </div>

        <div className="flex items-center gap-2 border mt-3  p-2 rounded-2xl border-[#DCDCDC]">
     
        <input
        type="text" pattern="[A-Za-z\s]*"
      className="w-full py-2 rounded-lg px-2"
      value={input}
      onChange={(e)=>{
           const lettersOnly = e.target.value.replace(/[^A-Za-z\s]/g, '');
    handleChange(lettersOnly);
      }}
    />
      
            <button onClick={sendMessage} className="w-10 h-10 flex items-center justify-center bg-[#F48020] rounded-full">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 18L15.5 12L9.5 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          
        </div>
      </div>
    </div>
    : 
    <div onClick={()=>setDisplayChat(true)} className="bg-gray-300 rounded-full p-2  h-16 w-16 flex items-center justify-center cursor-pointer">
    <span className="bg-red-500 rounded-full text-[12px] p-1 px-2.5 absolute -top-1 -right-1 z-10">!</span>
    <img src="/logo.svg" className="scale-90" />
  </div>
  );
};
