import { useEffect, useRef, useState } from 'react';

export interface WorkerMessage {
  action: string;
  payload: any;
}

export const useWebWorker = (workerPath: string) => {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [workerError, setWorkerError] = useState<string | null>(null);

  useEffect(() => {
    try {
      workerRef.current = new Worker(new URL(workerPath, import.meta.url), { type: 'module' });
      setIsReady(true);

      workerRef.current.onerror = (error) => {
        setWorkerError(error.message);
      };
    } catch (err) {
      setWorkerError(err instanceof Error ? err.message : 'Worker initialization failed');
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerPath]);

  const sendMessage = (message: WorkerMessage) => {
    if (workerRef.current && isReady) {
      workerRef.current.postMessage(message);
    }
  };

  const onMessage = (callback: (data: any) => void) => {
    if (workerRef.current) {
      workerRef.current.onmessage = (event) => callback(event.data);
    }
  };

  return { sendMessage, onMessage, isReady, workerError };
};
