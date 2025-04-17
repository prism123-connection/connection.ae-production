"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function Live() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const room = "test-room";

  useEffect(() => {
    console.log("🔌 Connecting to socket...");
    const socket = io({
      path: "/api/socket_io",
    });
    socketRef.current = socket;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      console.log("📷 Got local media stream");
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("📨 Sending ICE candidate");
        socket.emit("ice-candidate", { room, candidate: e.candidate });
      }
    };

    pc.ontrack = (e) => {
      console.log("🎥 Received remote track");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    socket.emit("join-room", room);
    console.log("📡 Joined room:", room);

    socket.on("user-joined", async () => {
      console.log("👤 A viewer joined, creating and sending offer...");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { room, offer });
    });

    socket.on("answer", async ({ answer }) => {
      console.log("📩 Received answer from viewer");
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      console.log("❄️ Received ICE candidate");
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      console.log("🧹 Cleaning up");
      pc.close();
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Live Stream</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="font-semibold">You (Broadcaster)</h2>
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full rounded bg-black" />
        </div>
        <div>
          <h2 className="font-semibold">Viewer</h2>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded bg-black" />
        </div>
      </div>
    </div>
  );
}
