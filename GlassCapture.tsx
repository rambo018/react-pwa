import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

interface GlassCaptureProps {
  onImageCaptured: (imageData: string) => void;
}

export const GlassCapture: React.FC<GlassCaptureProps> = ({ onImageCaptured }) => {
  const cameraRef = useRef<Webcam>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);

  const cameraSettings = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: 'environment',
  };

  const capturePhoto = useCallback(() => {
    if (cameraRef.current) {
      const photoData = cameraRef.current.getScreenshot({
        width: 1920,
        height: 1080,
      });

      if (photoData) {
        setFlashEffect(true);
        setTimeout(() => setFlashEffect(false), 200);
        onImageCaptured(photoData);
      }
    }
  }, [onImageCaptured]);

  return (
    <div style={styles.container}>
      <div style={styles.cameraFrame}>
        <Webcam
          ref={cameraRef}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.95}
          videoConstraints={cameraSettings}
          onUserMedia={() => setCameraActive(true)}
          style={styles.webcam}
        />
        
        {flashEffect && <div style={styles.flash} />}
        
        {!cameraActive && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Initializing camera...</p>
          </div>
        )}

        <div style={styles.guidingFrame}>
          <div style={styles.cornerTopLeft} />
          <div style={styles.cornerTopRight} />
          <div style={styles.cornerBottomLeft} />
          <div style={styles.cornerBottomRight} />
        </div>
      </div>

      <button
        onClick={capturePhoto}
        disabled={!cameraActive}
        style={{
          ...styles.captureBtn,
          ...(cameraActive ? {} : styles.captureBtnDisabled)
        }}
      >
        <span style={styles.captureIcon}>●</span>
        Capture Glass Image
      </button>

      <div style={styles.instructions}>
        <div style={styles.tip}>💡 Position glass within the frame</div>
        <div style={styles.tip}>🔆 Ensure adequate lighting</div>
        <div style={styles.tip}>📏 Keep device steady</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '20px',
  },
  cameraFrame: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  webcam: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  flash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    animation: 'fadeOut 0.2s',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '5px solid rgba(255,255,255,0.3)',
    borderTop: '5px solid white',
    borderRadius: '50%',
    animation: 'rotate 1s linear infinite',
  },
  loadingText: {
    color: 'white',
    marginTop: '16px',
    fontSize: '16px',
  },
  guidingFrame: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    right: '15%',
    bottom: '15%',
    pointerEvents: 'none',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderTop: '4px solid cyan',
    borderLeft: '4px solid cyan',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40px',
    height: '40px',
    borderTop: '4px solid cyan',
    borderRight: '4px solid cyan',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderBottom: '4px solid cyan',
    borderLeft: '4px solid cyan',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '40px',
    height: '40px',
    borderBottom: '4px solid cyan',
    borderRight: '4px solid cyan',
  },
  captureBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 48px',
    fontSize: '18px',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  captureBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  captureIcon: {
    fontSize: '32px',
  },
  instructions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
    backgroundColor: '#f8f9ff',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
  },
  tip: {
    fontSize: '15px',
    color: '#555',
  },
};
