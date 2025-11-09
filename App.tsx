import { useState, useEffect } from 'react';
import { GlassCapture } from './components/GlassCapture';
import { PatternResults } from './components/PatternResults';
import { PatternAnalysisResult } from './services/patternAnalyzer';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PatternAnalysisResult | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [opencvLoaded, setOpencvLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Load OpenCV.js
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
    script.async = true;
    
    script.onload = () => {
      // OpenCV.js uses a global cv object
      const checkOpenCV = setInterval(() => {
        if ((window as any).cv && (window as any).cv.Mat) {
          setOpencvLoaded(true);
          setLoadingProgress(100);
          clearInterval(checkOpenCV);
        } else {
          setLoadingProgress(prev => Math.min(prev + 10, 90));
        }
      }, 100);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleImageCapture = async (imageData: string) => {
    setIsProcessing(true);

    try {
      // Show popup that image is captured
      alert('✅ Image captured successfully!\n\n📸 Image is ready for processing in OpenCV.\n\nImage will be passed to OpenCV for pattern analysis.');
      
      // Image is available in imageData variable
      // OpenCV processing can be added here when needed
      const cv = (window as any).cv;
      console.log('OpenCV is ready:', cv ? 'Yes' : 'No');
      console.log('Image data length:', imageData.length);
      console.log('Image can be passed to OpenCV for processing');
      
      // For now, just set dummy results to show the UI
      setAnalysisResult({
        contourCount: 0,
        edgeStrength: 0,
        symmetryScore: 0,
        complexityLevel: 'simple',
      });
      setProcessedImage(imageData);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error capturing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setProcessedImage(null);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.appTitle}>🔍 Glass Pattern Recognition</h1>
      </header>

      {!opencvLoaded ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner} />
          <p style={styles.loadingText}>Loading OpenCV.js...</p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${loadingProgress}%` }} />
          </div>
          <p style={styles.progressText}>{loadingProgress}%</p>
        </div>
      ) : isProcessing ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner} />
          <p style={styles.loadingText}>Analyzing glass pattern...</p>
          <p style={styles.processingHint}>This may take a few seconds</p>
        </div>
      ) : analysisResult ? (
        <PatternResults
          result={analysisResult}
          processedImage={processedImage}
          onReset={handleReset}
        />
      ) : (
        <GlassCapture onImageCaptured={handleImageCapture} />
      )}

      <footer style={styles.footer}>
        <p style={styles.footerText}>Powered by OpenCV.js & React</p>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '32px 20px',
    textAlign: 'center',
  },
  appTitle: {
    fontSize: '36px',
    fontWeight: 800,
    color: 'white',
    marginBottom: '8px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  appSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 300,
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  loadingSpinner: {
    width: '80px',
    height: '80px',
    border: '8px solid rgba(255,255,255,0.3)',
    borderTop: '8px solid white',
    borderRadius: '50%',
    animation: 'rotate 1s linear infinite',
    marginBottom: '24px',
  },
  loadingText: {
    fontSize: '20px',
    color: 'white',
    fontWeight: 600,
  },
  processingHint: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.8)',
    marginTop: '8px',
  },
  progressBar: {
    width: '300px',
    height: '8px',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '24px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '16px',
    color: 'white',
    marginTop: '8px',
  },
  footer: {
    padding: '24px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
  },
};

export default App;
