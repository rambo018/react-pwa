import React from 'react';
import { PatternAnalysisResult } from '../services/patternAnalyzer';

interface PatternResultsProps {
  result: PatternAnalysisResult | null;
  processedImage: string | null;
  onReset: () => void;
}

export const PatternResults: React.FC<PatternResultsProps> = ({ result, processedImage, onReset }) => {
  if (!result) return null;

  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'simple': return '#4caf50';
      case 'moderate': return '#ff9800';
      case 'complex': return '#f44336';
      default: return '#999';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Image Captured Successfully! ✅</h2>
      
      {processedImage && (
        <div style={styles.imageContainer}>
          <img src={processedImage} alt="Captured glass" style={styles.image} />
          <p style={styles.imageCaption}>Ready for OpenCV processing</p>
        </div>
      )}

      <div style={styles.statusCard}>
        <div style={styles.statusIcon}>�</div>
        <h3 style={styles.statusTitle}>Image Ready</h3>
        <p style={styles.statusText}>
          The captured image has been successfully prepared and is ready to be passed to OpenCV for pattern analysis.
        </p>
        <p style={styles.statusText}>
          OpenCV processing logic can be implemented when needed.
        </p>
      </div>

      <button onClick={onReset} style={styles.resetButton}>
        📸 Capture Another Image
      </button>
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
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  imageContainer: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  imageCaption: {
    padding: '12px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#f5f5f5',
  },
  statusCard: {
    padding: '32px',
    backgroundColor: 'white',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  statusIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  statusTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#667eea',
    marginBottom: '16px',
  },
  statusText: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    width: '100%',
  },
  metricCard: {
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  metricIcon: {
    fontSize: '32px',
    marginBottom: '8px',
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#667eea',
    marginBottom: '4px',
  },
  metricLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 500,
  },
  resetButton: {
    padding: '16px 48px',
    fontSize: '18px',
    fontWeight: 600,
    background: 'white',
    color: '#667eea',
    border: '3px solid #667eea',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(255,255,255,0.3)',
  },
};
