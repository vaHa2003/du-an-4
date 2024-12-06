'use client';

import styles from '@public/styles/VideoPlayer.module.css';
import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Play, Pause, VolumeUp, VolumeDown, VolumeMute, Fullscreen, FullscreenExit, FastForward, Rewind, Gear, ChevronRight, ChevronLeft, BadgeCc, PauseCircle, PlayCircle, PauseFill, PlayFill, SkipBackward, SkipForward } from 'react-bootstrap-icons';
import Body from './globalControl/body';

const videoSources: Record<'240p' | '360p' | '480p' | '720p' | '1080p' | '1440p', string> = {
  '240p': 'http://localhost:3003/video/test_240p.mp4',
  '360p': 'http://localhost:3003/video/test_360p.mp4',
  '480p': 'http://localhost:3003/video/test_480p.mp4',
  '720p': 'http://localhost:3003/video/test_720p.mp4',
  '1080p': 'http://localhost:3003/video/test_1080p.mp4',
  '1440p': 'http://localhost:3003/video/test_1440p.mp4',
};

const subtitles: Record<string, string> = {
  none: '',
  en: '/sub/sub-en.vtt',
  vi: '/sub/sub-vn.vtt',
  zh: '/sub/sub-cn.vtt',
  ja: '/sub/sub-jp.vtt',
};

const languageNames: Record<string, string> = {
  none: 'Không có phụ đề',
  en: 'Tiếng Anh',
  vi: 'Tiếng Việt',
  zh: 'Tiếng Trung',
  ja: 'Tiếng Nhật',
};

const videoList = [
  'http://localhost:3003/video/test_720p.mp4',
  'http://localhost:3003/video/test2_720p.mp4',
  'http://localhost:3003/video/test3_720p.mp4',
];

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isSpeedSectionVisible, setIsSpeedSectionVisible] = useState(false);
  const [isQualitySectionVisible, setIsQualitySectionVisible] = useState(false);
  const [isSubtitleSectionVisible, setIsSubtitleSectionVisible] = useState<boolean>(false);
  const [selectedSpeed, setSelectedSpeed] = useState<string>('Normal');
  const [selectedQuality, setSelectedQuality] = useState<'144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p'>('720p');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('none');
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const languages = Object.keys(subtitles);

  let hideControlsTimer: NodeJS.Timeout | null = null;

  // Hàm xử lý phát / tạm dừng video
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }

      setShowButton(true);
      setIsFading(true);

      setTimeout(() => {
        setIsFading(false);
        setTimeout(() => {
          setShowButton(false);
        }, 700);
      }, 50);
    }
  };

  //title
  useEffect(() => {
    const titles = [
      'Video 1: remix vui vẻ ',
      'Video 2: lê bảo remix',
      'Video 3: remix nga',
    ];

    setVideoTitle(titles[currentVideoIndex] || '');
  }, [currentVideoIndex]);

  // Hàm xử lý thay đổi âm lượng
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Math.max(0, Math.min(1, parseFloat(e.target.value)));
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // Hàm xử lý bật / tắt âm thanh
  const handleMuteUnmute = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setVolume(videoRef.current.volume);
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Hàm tua video
  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        videoRef.current.duration || 0
      );
    }
  };

  // Hàm chuyển đổi chế độ toàn màn hình
  const handleFullscreen = () => {
    const videoContainer = videoRef?.current?.parentElement;
    if (!isFullscreen) {
      if (videoContainer?.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // add event full screen

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullScreenNow = !!document.fullscreenElement;
      setIsFullscreen(isFullScreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Hàm cập nhật thời gian video

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Sự kiện video sẵn sàng phát

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  // cập nhật tổng thời gian ngay khi loadpage

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleCanPlay);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  // Hàm xử lý thanh trượt thời gian video

  const handleTimeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Định dạng thời gian

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // hide control 

  const handleMouseEnter = () => {
    setShowControls(true);
    if (hideControlsTimer) {
      clearTimeout(hideControlsTimer);
    }
  };

  const handleMouseLeave = () => {
    hideControlsTimer = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleMouseEnterControl = () => {
    setShowControls(true);
    if (hideControlsTimer) {
      clearTimeout(hideControlsTimer);
    }
  };

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (hideControlsTimer) {
        clearTimeout(hideControlsTimer);
      }
      hideControlsTimer = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    const videoWrapper = videoRef.current?.parentElement;
    if (videoWrapper) {
      videoWrapper.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (videoWrapper) {
        videoWrapper.removeEventListener('mousemove', handleMouseMove);
      }
      if (hideControlsTimer) {
        clearTimeout(hideControlsTimer);
      }
    };
  }, []);

  // theo dõi phần tử xuất hiện trên vùng nhìn thấy của trình duyệt để hide control đúng cách
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);


  // setting 

  // Hàm để bật/tắt phần cài đặt
  const handleSettingsToggle = () => {
    setIsSettingsVisible(prev => !prev);
    if (isSettingsVisible) {
      setIsSpeedSectionVisible(false);
      setIsQualitySectionVisible(false);
    }
    if (isSubtitleSectionVisible) {
      setIsSubtitleSectionVisible(false)
    }
  };

  // Hàm để bật/tắt phần tốc độ phát lại
  const handleSpeedToggle = () => {
    setIsSpeedSectionVisible(prev => !prev);
    setIsQualitySectionVisible(false);
    if (!isSpeedSectionVisible) {
      setIsSettingsVisible(true);
    }
    setIsSpeedSectionVisible(!isSpeedSectionVisible);
    if (isQualitySectionVisible) {
      setIsQualitySectionVisible(false);
    }
  };
  // Hàm để bật/tắt phần chất lượng video
  const handleQualityToggle = () => {
    setIsQualitySectionVisible(prev => !prev);
    setIsSpeedSectionVisible(false);
    if (!isQualitySectionVisible) {
      setIsSettingsVisible(true);
    }
    setIsQualitySectionVisible(!isQualitySectionVisible);
    if (isSpeedSectionVisible) {
      setIsSpeedSectionVisible(false);
    }
  };

  // tốc độ phát lại và quay lại phần cài đặt chính
  const handleSpeedChange = (speed: string) => {
    const numericSpeed = speed === 'Normal' ? 1 : parseFloat(speed);

    if (videoRef.current) {
      videoRef.current.playbackRate = numericSpeed;
    }

    setSelectedSpeed(speed);
    setIsSpeedSectionVisible(false);
  };

  // chất lượng

  const handleQualityChange = (quality: '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p') => {
    if (videoRef.current) {
      clearSubtitles()
      const newSrc = videoSources[quality as keyof typeof videoSources];
      if (videoRef.current.src !== newSrc) {
        videoRef.current.src = newSrc;
        videoRef.current.play();
      }
      setSelectedQuality(quality);
      setSelectedSpeed('Normal');
      setIsQualitySectionVisible(false);
      setIsPlaying(true)
      if (selectedLanguage != 'none') {
        setSelectedLanguage('none')
      }
    }
  };

  // sub

  const clearSubtitles = () => {
    if (videoRef.current) {
      const trackElements = videoRef.current.querySelectorAll('track');
      trackElements.forEach(track => track.remove());
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsSubtitleSectionVisible(false);
  };
  const handleSubtitleToggle = () => {
    setIsSubtitleSectionVisible(!isSubtitleSectionVisible);
    if (isSettingsVisible) {
      setIsSettingsVisible(false)
    }
  };

  const handleMouseEnterSlider = () => {
    setTooltipPosition(null);
  };

  const handleMouseLeaveSlider = () => {
    setTooltipPosition(null);
  };

  // hover hiện time

  const handleMouseMoveSlider = (e: React.MouseEvent<HTMLInputElement>) => {
    const { offsetWidth, offsetLeft } = e.currentTarget;
    const offsetX = e.clientX - offsetLeft;
    const newValue = (offsetX / offsetWidth) * duration;
    setTooltipPosition(newValue);
  };

  // tự động phát

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.autoplay = isAutoplay;
    }
  }, [isAutoplay]);

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };

  const handleVideoEnd = () => {
    if (isAutoplay) {
      clearSubtitles()
      const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
      setIsPlaying(true)

      setCurrentVideoIndex(nextVideoIndex);

      if (videoRef.current) {
        const nextVideo = videoList[nextVideoIndex];
        const nextVideoSrc = nextVideo.replace(/(\d+p)\.mp4$/, `${selectedQuality}.mp4`);
        videoRef.current.src = nextVideoSrc;
        videoRef.current.play();
      }
      if (selectedLanguage != 'none') {
        setSelectedLanguage('none')
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [isAutoplay, currentVideoIndex]);

  // next video

  const handleVideoNext = () => {
    clearSubtitles()
    const nextVideoIndex = (currentVideoIndex + 1) % videoList.length;
    console.log('vị trí video:', nextVideoIndex);

    setCurrentVideoIndex(nextVideoIndex);
    setIsPlaying(true)


    if (videoRef.current) {
      const nextVideo = videoList[nextVideoIndex];
      const nextVideoSrc = nextVideo.replace(/(\d+p)\.mp4$/, `${selectedQuality}.mp4`);
      videoRef.current.src = nextVideoSrc;
      videoRef.current.play();
    }
    if (selectedLanguage != 'none') {
      setSelectedLanguage('none')
    }
  };

  //back video

  const handleVideoBack = () => {
    clearSubtitles()
    const preVideoIndex = (currentVideoIndex - 1) % videoList.length;
    const finalIndex = preVideoIndex === -1 ? videoList.length - 1 : preVideoIndex;

    setCurrentVideoIndex(finalIndex);
    console.log('vị trí video:', finalIndex);
    setIsPlaying(true)

    if (videoRef.current) {
      const nextVideo = videoList[finalIndex];
      const nextVideoSrc = nextVideo.replace(/(\d+p)\.mp4$/, `${selectedQuality}.mp4`);
      videoRef.current.src = nextVideoSrc;
      videoRef.current.play();
    }
    if (selectedLanguage != 'none') {
      setSelectedLanguage('none')
    }
  };
  return (

    <div
      className={styles.videoWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Spinner animation="border" variant="light" style={{ width: "50px", height: '50px' }} />
        </div>
      )}
      <video
        preload="metadata"
        className={styles.mainVideo}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handlePlayPause}
        poster='/img/poster_video.png'
      >
        {isVisible &&
          <source
            src={videoList[currentVideoIndex].replace(/(\d+p)\.mp4$/, `${selectedQuality}.mp4`)}
            type="video/mp4"
          />
        }
        {isVisible && <track
          src={subtitles[selectedLanguage]}
          kind="subtitles"
          srcLang={selectedLanguage}
          label={selectedLanguage}
          className={styles.trackVideo}
          default
        />}
      </video>
      {showButton && (
        <div className={`${styles.playPauseButton} ${isFading ? styles.fadeOut : ''}`}>
          {isPlaying ? (
            <PauseFill
              className={styles.iconPlayPauseButton}
              onClick={handlePlayPause}
            />
          ) : (
            <PlayFill
              className={styles.iconPlayPauseButton}
              onClick={handlePlayPause}
            />
          )}
        </div>
      )}

      {showControls && (
        <div className={styles.ctaVideo}>

          <div className={styles.timeControl}>
            <input
              id="time"
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleTimeSliderChange}
              className={styles.slider}
              onMouseEnter={handleMouseEnterSlider}
              onMouseLeave={handleMouseLeaveSlider}
              onMouseMove={handleMouseMoveSlider}
            />
            {tooltipPosition !== null && (
              <div className={styles.tooltip} style={{ left: `${(tooltipPosition / duration) * 100}%` }}>
                {formatTime(tooltipPosition)}
              </div>
            )}
          </div>
          <div
            className={styles.controls}
          // onMouseEnter={handleMouseEnterControl}
          >
            <Button onClick={handleVideoBack} className={styles.controlButton}>
              <SkipBackward />
            </Button>
            <Button onClick={() => handleSeek(-10)} className={styles.controlButton}>
              <Rewind />
            </Button>
            <Button onClick={handlePlayPause} className={styles.controlButton}>
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button onClick={() => handleSeek(10)} className={styles.controlButton}>
              <FastForward />
            </Button>
            <Button onClick={handleVideoNext} className={styles.controlButton}>
              <SkipForward />
            </Button>
            <div className={styles.volumeControlWrapper}>
              <Button onClick={handleMuteUnmute} className={styles.controlButton}>
                {isMuted ? <VolumeMute /> : volume <= 0.5 ? <VolumeDown /> : <VolumeUp />}
              </Button>
              <div className={styles.volumeControl}>
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={styles.slider}
                />
              </div>
            </div>
            <div className={styles.timeVideo}>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</div>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                className={styles.controlButtonAuto}
                style={{ marginRight: '10px' }}
              >
                <div className={`${styles.toggleContainer} ${isAutoplay ? styles.activeToggleContainer : ''}`} onClick={toggleAutoplay}>
                  <div className={`${styles.toggleSwitch} ${isAutoplay ? styles.active : ''}`}>
                    {isAutoplay ? <PauseCircle className={styles.icon} /> : <PlayCircle className={styles.icon} />}
                  </div>
                </div>
              </Button>
              <Button
                onClick={handleSubtitleToggle}
                className={styles.controlButton}
                style={{ marginRight: '10px' }}
              >
                <BadgeCc />
              </Button>
              {isSubtitleSectionVisible && (
                <div className={styles.settings}>
                  <div className={styles.playback}>
                    <ul className={styles.playbackList}>
                      {languages.map((language) => (
                        <li
                          key={language}
                          className={`${styles.playbackItem} ${selectedLanguage === language ? styles.active : ''}`}
                          onClick={() => handleLanguageChange(language)}
                        >
                          {languageNames[language]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <Button className={styles.controlButton} style={{ marginRight: '10px' }} onClick={handleSettingsToggle}>
                <Gear />
              </Button>
              {isSettingsVisible && (
                <div className={styles.settings}>
                  <div
                    onClick={handleSpeedToggle}
                    className={styles.controlButtonSettingSpeed}
                    style={{ width: '100%', margin: '0 auto', fontSize: '16px' }}
                  >
                    {isSpeedSectionVisible ? <ChevronLeft style={{ marginBottom: '3px', marginRight: '5px' }} /> : ''}
                    Tốc độ phát
                    {!isSpeedSectionVisible ? <ChevronRight style={{ marginBottom: '3px', marginRight: '5px' }} /> : ''}
                  </div>

                  {isSpeedSectionVisible && (
                    <div className={styles.playback}>
                      <ul className={styles.playbackList}>
                        {['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '1.75', '2'].map((speed) => (
                          <li
                            key={speed}
                            className={`${styles.playbackItem} ${selectedSpeed === speed ? styles.active : ''}`}
                            onClick={() => handleSpeedChange(speed)}
                          >
                            {speed}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    onClick={handleQualityToggle}
                    className={styles.controlButtonSettingSpeed}
                    style={{ width: '100%', margin: '0 auto', fontSize: '16px' }}
                  >
                    {isQualitySectionVisible ? <ChevronLeft style={{ marginBottom: '3px', marginRight: '5px' }} /> : ''}
                    Chất lượng video
                    {!isQualitySectionVisible ? <ChevronRight style={{ marginBottom: '3px', marginRight: '5px' }} /> : ''}
                  </div>

                  {isQualitySectionVisible && (
                    <div className={styles.playback}>
                      <ul className={styles.playbackList}>
                        {['144p', '240p', '360p', '480p', '720p', '1080p', '1440p'].map((quality) => (
                          <li
                            key={quality}
                            className={`${styles.playbackItem} ${selectedQuality === quality ? styles.active : ''}`}
                            onClick={() => handleQualityChange(quality as '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p')}
                          >
                            {quality}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <Button onClick={handleFullscreen} className={styles.controlButton} >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default VideoPlayer;

