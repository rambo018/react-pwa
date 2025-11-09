# Glass Pattern Recognition PWA

A Progressive Web App for capturing and analyzing glass patterns using computer vision (OpenCV.js).

## Features

- 📸 **High-Quality Camera Capture** - Capture glass images with optimized settings
- 🔍 **Pattern Analysis** - Detect edges, contours, and patterns in glass
- 📊 **Detailed Metrics** - Get symmetry scores, complexity levels, and edge strength
- 🎨 **Visual Feedback** - See detected patterns highlighted on your image
- 📱 **Mobile-First** - Optimized for mobile devices (iOS & Android)
- ⚡ **Async Processing** - Non-blocking image processing for smooth UX
- 🔌 **Offline Support** - Works offline with PWA capabilities

## Technology Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **OpenCV.js** - Computer vision library (WebAssembly)
- **react-webcam** - Camera integration
- **PWA** - Progressive Web App with service worker

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## How It Works

### 1. Image Capture
- User captures a high-resolution image of glass using their device camera
- Optimized camera settings for best quality (1920x1080)

### 2. Pattern Analysis (OpenCV.js)
The app performs several computer vision operations:

- **Grayscale Conversion** - Simplifies image for processing
- **Gaussian Blur** - Reduces noise
- **Canny Edge Detection** - Identifies edges in the pattern
- **Contour Detection** - Finds distinct pattern elements
- **Symmetry Analysis** - Compares left/right halves
- **Complexity Assessment** - Categorizes pattern complexity

### 3. Results Display
- Pattern elements count
- Edge strength percentage
- Symmetry score
- Complexity level (simple/moderate/complex)
- Visualized patterns with highlighted contours

## Project Structure

```
react-pwa/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── GlassCapture.tsx    # Camera capture component
│   │   └── PatternResults.tsx  # Results display component
│   ├── services/        # Business logic
│   │   └── patternAnalyzer.ts  # OpenCV analysis service
│   ├── hooks/           # Custom React hooks
│   │   └── useWebWorker.ts     # Web Worker hook (future use)
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Performance Considerations

### Mobile Optimization

- **Async Processing** - Image processing doesn't block UI
- **Memory Management** - Proper cleanup of OpenCV Mat objects
- **Progressive Enhancement** - Loading states and error handling
- **Battery Efficiency** - One-time capture vs continuous processing

### OpenCV.js Loading

- Loaded from CDN (cached by browser)
- ~8MB WASM file (loads once, cached)
- Progress indicator during load

## Browser Compatibility

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (Desktop & Mobile)
- ❌ Internet Explorer (not supported)

## PWA Features

- Installable on mobile devices
- Offline caching of assets
- Native app-like experience
- Add to home screen

## Future Enhancements

- [ ] Web Worker integration for true background processing
- [ ] Advanced pattern recognition (ML models)
- [ ] Pattern comparison and matching
- [ ] Database of glass patterns
- [ ] Export results as PDF/JSON
- [ ] Multi-language support

## Troubleshooting

### Camera not working
- Ensure HTTPS connection (required for camera access)
- Check browser permissions
- Try a different browser

### OpenCV.js fails to load
- Check internet connection (first load)
- Clear browser cache
- Disable ad blockers

### Processing is slow
- Use a modern device (2018+)
- Close other apps
- Reduce image quality in code if needed

## License

MIT License - feel free to use for your projects!

## Contributing

Contributions welcome! Please open an issue or PR.

## Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ using React, TypeScript, and OpenCV.js**
