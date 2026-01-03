import { useState, useRef, useEffect } from 'react';

const AudioRecorder = ({ contextText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const streamRef = useRef(null);

  const playAudio = async (arrayBuffer) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = await audioCtx.decodeAudioData(arrayBuffer);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
  };

  const startRecording = async () => {
    try {
      socketRef.current = new WebSocket('ws://localhost:8000/ws/live');
      
      socketRef.current.onopen = () => {
        setIsRecording(true);
        socketRef.current.send(JSON.stringify({ context: contextText }));
      };

      socketRef.current.onmessage = async (event) => {
        const audioBlob = await event.data.arrayBuffer();
        playAudio(audioBlob);
      };

      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
      
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      processorRef.current.onaudioprocess = (e) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcmData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
          }
          socketRef.current.send(pcmData.buffer);
        }
      };

      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);

    } catch (err) {
      console.error("Error accessing mic:", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (socketRef.current) socketRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (audioContextRef.current) audioContextRef.current.close();
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button 
        onClick={isRecording ? stopRecording : startRecording}
        className="analyze-btn"
        style={{ background: isRecording ? '#ef4444' : '#10b981' }}
      >
        {isRecording ? "🔴 Stop Talking" : "🎙️ Talk to Document"}
      </button>
    </div>
  );
};

export default AudioRecorder;