export interface PatternAnalysisResult {
  contourCount: number;
  edgeStrength: number;
  symmetryScore: number;
  complexityLevel: 'simple' | 'moderate' | 'complex';
}

export class GlassPatternAnalyzer {
  private cv: any;

  constructor(opencvInstance: any) {
    this.cv = opencvInstance;
  }

  analyzeGlassPattern(sourceMatrix: any): PatternAnalysisResult {
    const grayImg = new this.cv.Mat();
    const blurredImg = new this.cv.Mat();
    const edgeMap = new this.cv.Mat();
    const contourVector = new this.cv.MatVector();
    const hierarchyMat = new this.cv.Mat();

    try {
      // Step 1: Convert to grayscale
      this.cv.cvtColor(sourceMatrix, grayImg, this.cv.COLOR_RGBA2GRAY);

      // Step 2: Reduce noise with Gaussian blur
      const kernelSize = new this.cv.Size(7, 7);
      this.cv.GaussianBlur(grayImg, blurredImg, kernelSize, 1.5);

      // Step 3: Detect edges
      this.cv.Canny(blurredImg, edgeMap, 40, 120);

      // Step 4: Find contours
      this.cv.findContours(
        edgeMap,
        contourVector,
        hierarchyMat,
        this.cv.RETR_TREE,
        this.cv.CHAIN_APPROX_SIMPLE
      );

      // Calculate metrics
      const significantContours = this.filterSignificantContours(contourVector);
      const edgeStrength = this.calculateEdgeDensity(edgeMap);
      const symmetryScore = this.assessSymmetry(grayImg);
      const complexityLevel = this.determineComplexity(significantContours);

      return {
        contourCount: significantContours,
        edgeStrength,
        symmetryScore,
        complexityLevel
      };
    } finally {
      // Cleanup
      grayImg.delete();
      blurredImg.delete();
      edgeMap.delete();
      contourVector.delete();
      hierarchyMat.delete();
    }
  }

  private filterSignificantContours(contours: any): number {
    let count = 0;
    const minAreaThreshold = 150;

    for (let i = 0; i < contours.size(); i++) {
      const contour = contours.get(i);
      const area = this.cv.contourArea(contour);
      if (area > minAreaThreshold) {
        count++;
      }
    }
    return count;
  }

  private calculateEdgeDensity(edgeMatrix: any): number {
    const totalPixels = edgeMatrix.rows * edgeMatrix.cols;
    let edgePixels = 0;

    for (let i = 0; i < edgeMatrix.rows; i++) {
      for (let j = 0; j < edgeMatrix.cols; j++) {
        if (edgeMatrix.ucharPtr(i, j)[0] > 0) {
          edgePixels++;
        }
      }
    }

    return Math.round((edgePixels / totalPixels) * 100);
  }

  private assessSymmetry(grayMatrix: any): number {
    const width = grayMatrix.cols;
    const height = grayMatrix.rows;
    let symmetryMatch = 0;
    let totalComparisons = 0;

    // Compare left and right halves
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < Math.floor(width / 2); col++) {
        const leftPixel = grayMatrix.ucharPtr(row, col)[0];
        const rightPixel = grayMatrix.ucharPtr(row, width - col - 1)[0];
        const difference = Math.abs(leftPixel - rightPixel);
        
        if (difference < 30) {
          symmetryMatch++;
        }
        totalComparisons++;
      }
    }

    return Math.round((symmetryMatch / totalComparisons) * 100);
  }

  private determineComplexity(contourCount: number): 'simple' | 'moderate' | 'complex' {
    if (contourCount < 10) return 'simple';
    if (contourCount < 30) return 'moderate';
    return 'complex';
  }

  visualizePatterns(sourceMatrix: any, outputMatrix: any): void {
    const grayImg = new this.cv.Mat();
    const edgeMap = new this.cv.Mat();
    const contourVector = new this.cv.MatVector();
    const hierarchyMat = new this.cv.Mat();

    try {
      this.cv.cvtColor(sourceMatrix, grayImg, this.cv.COLOR_RGBA2GRAY);
      this.cv.GaussianBlur(grayImg, grayImg, new this.cv.Size(7, 7), 1.5);
      this.cv.Canny(grayImg, edgeMap, 40, 120);
      
      this.cv.findContours(
        edgeMap,
        contourVector,
        hierarchyMat,
        this.cv.RETR_TREE,
        this.cv.CHAIN_APPROX_SIMPLE
      );

      this.cv.cvtColor(sourceMatrix, outputMatrix, this.cv.COLOR_RGBA2RGB);

      // Draw detected patterns
      for (let i = 0; i < contourVector.size(); i++) {
        const contour = contourVector.get(i);
        const area = this.cv.contourArea(contour);
        
        if (area > 150) {
          const color = new this.cv.Scalar(255, 165, 0); // Orange color
          this.cv.drawContours(outputMatrix, contourVector, i, color, 3);
        }
      }
    } finally {
      grayImg.delete();
      edgeMap.delete();
      contourVector.delete();
      hierarchyMat.delete();
    }
  }
}
