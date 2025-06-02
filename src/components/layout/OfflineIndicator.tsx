'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    // 初期状態の設定
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);

      // 5秒後にメッセージを自動で隠す
      setTimeout(() => {
        setShowOfflineMessage(false);
      }, 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage && isOnline) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        showOfflineMessage || !isOnline
          ? 'transform translate-y-0 opacity-100'
          : 'transform -translate-y-full opacity-0'
      }`}
    >
      <div
        className={`mx-auto max-w-sm rounded-lg shadow-lg p-3 ${
          isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        <div className="flex items-center space-x-2">
          {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
          <span className="text-sm font-medium">
            {isOnline
              ? 'インターネットに再接続されました'
              : 'オフライン - 一部機能が制限されます'}
          </span>
        </div>
        {!isOnline && (
          <p className="text-xs mt-1 opacity-90">
            保存されたレシピは引き続き閲覧できます
          </p>
        )}
      </div>
    </div>
  );
}
