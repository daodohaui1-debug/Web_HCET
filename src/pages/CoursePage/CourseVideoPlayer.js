import React, { useEffect, useMemo, useRef, useState } from "react";

const getYouTubeId = (url = "") => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    if (parsed.pathname.includes("/embed/")) return parsed.pathname.split("/embed/")[1].split("/")[0];
    if (parsed.pathname.includes("/shorts/")) return parsed.pathname.split("/shorts/")[1].split("/")[0];
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
};

const formatTime = (seconds = 0) => {
  const value = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(value / 60);
  return `${minutes}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
};

const QUALITY_LABELS = {
  highres: "2160p",
  hd1440: "1440p",
  hd1080: "1080p",
  hd720: "720p",
  large: "480p",
  medium: "360p",
  small: "240p",
  tiny: "144p",
};

const loadYouTubeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__youtubeApiPromise) return window.__youtubeApiPromise;

  window.__youtubeApiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });

  return window.__youtubeApiPromise;
};

const CourseVideoPlayer = ({ src, title }) => {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [qualities, setQualities] = useState([]);
  const [quality, setQuality] = useState("default");
  const youtubeId = useMemo(() => getYouTubeId(src), [src]);

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setQualities([]);
    setQuality("default");

    if (!youtubeId || !mountRef.current) return undefined;
    let disposed = false;

    loadYouTubeApi().then((YT) => {
      if (disposed || !mountRef.current) return;
      playerRef.current = new YT.Player(mountRef.current, {
        videoId: youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(80);
            setDuration(event.target.getDuration() || 0);
            setQualities(event.target.getAvailableQualityLevels?.() || []);
          },
          onStateChange: (event) => {
            setPlaying(event.data === YT.PlayerState.PLAYING);
            setQualities(event.target.getAvailableQualityLevels?.() || []);
          },
          onPlaybackQualityChange: (event) => setQuality(event.data || "default"),
        },
      });
    });

    return () => {
      disposed = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [youtubeId]);

  useEffect(() => {
    if (!playing || !youtubeId) return undefined;
    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      setCurrentTime(player.getCurrentTime() || 0);
      setDuration(player.getDuration() || 0);
    }, 500);
    return () => window.clearInterval(timer);
  }, [playing, youtubeId]);

  const togglePlayback = () => {
    if (youtubeId) {
      if (playing) playerRef.current?.pauseVideo?.();
      else playerRef.current?.playVideo?.();
      return;
    }
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

  const seek = (event) => {
    const time = Number(event.target.value);
    setCurrentTime(time);
    if (youtubeId) playerRef.current?.seekTo?.(time, true);
    else if (videoRef.current) videoRef.current.currentTime = time;
  };

  const changeVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (youtubeId) playerRef.current?.setVolume?.(nextVolume);
    else if (videoRef.current) videoRef.current.volume = nextVolume / 100;
  };

  const changeQuality = (event) => {
    const nextQuality = event.target.value;
    setQuality(nextQuality);
    playerRef.current?.setPlaybackQuality?.(nextQuality);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) wrapperRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  return (
    <div className="course-player" ref={wrapperRef}>
      <div className="course-player__stage" onDoubleClick={toggleFullscreen}>
        {youtubeId ? (
          <div className="course-player__youtube" ref={mountRef} />
        ) : (
          <video
            ref={videoRef}
            src={src}
            playsInline
            onClick={togglePlayback}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onEnded={() => setPlaying(false)}
          >
            Trình duyệt của bạn không hỗ trợ video này.
          </video>
        )}
      </div>

      <div className="course-player__controls" aria-label={`Điều khiển ${title || "video"}`}>
        <button type="button" onClick={togglePlayback} aria-label={playing ? "Tạm dừng" : "Phát"}>
          {playing ? "❚❚" : "▶"}
        </button>
        <span>{formatTime(currentTime)}</span>
        <input
          className="course-player__progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={seek}
          aria-label="Tiến độ video"
        />
        <span>{formatTime(duration)}</span>
        <span aria-hidden="true">♪</span>
        <input type="range" min="0" max="100" value={volume} onChange={changeVolume} aria-label="Âm lượng" />
        {youtubeId && (
          <select
            className="course-player__quality"
            value={quality}
            onChange={changeQuality}
            aria-label="Độ phân giải"
            title="Độ phân giải"
          >
            <option value="default">Tự động</option>
            {qualities.map((item) => (
              <option key={item} value={item}>{QUALITY_LABELS[item] || item}</option>
            ))}
          </select>
        )}
        <button type="button" onClick={toggleFullscreen} aria-label="Toàn màn hình">⛶</button>
      </div>
    </div>
  );
};

export default CourseVideoPlayer;
