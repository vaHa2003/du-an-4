"use client"
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

const VideoPlayer: React.FC = () => {
    const [url] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); // Thay đổi link video tại đây
    const playerRef = useRef<ReactPlayer | null>(null);

    const handleSeek = (seconds: number) => {
        console.log(`Số giây đã tua: ${seconds}`);
    };

    return (
        <div>
            <h1>Video Player</h1>
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls={true}
                onSeek={data => handleSeek(data)}
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default VideoPlayer;


