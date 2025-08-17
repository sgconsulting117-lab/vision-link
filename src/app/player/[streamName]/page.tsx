
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';


export default function PlayerPage() {
    const params = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamName = params.streamName as string;

    useEffect(() => {
        if (!streamName || !videoRef.current) return;
        
        const video = videoRef.current;
        const streamUrl = `http://213.136.81.52:8080/hls/${streamName}/index.m3u8`;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }
    }, [streamName]);


    return (
        <div style={{width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden'}}>
           <video ref={videoRef} controls style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
