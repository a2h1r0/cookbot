'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // PWAがすでにインストールされているかチェック
    const checkIfInstalled = () => {
      // スタンドアロンモードかどうかをチェック
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      // iOS Safari のホーム画面から起動されているかチェック
      if (
        (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true
      ) {
        setIsInstalled(true);
        return;
      }
    };

    checkIfInstalled();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // バナーを表示するかどうかの判定
      const lastShown = localStorage.getItem('pwa-install-prompt-last-shown');
      const dismissed = localStorage.getItem('pwa-install-prompt-dismissed');

      if (!dismissed) {
        if (
          !lastShown ||
          Date.now() - parseInt(lastShown) > 7 * 24 * 60 * 60 * 1000
        ) {
          setShowInstallBanner(true);
        }
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'dismissed') {
      localStorage.setItem('pwa-install-prompt-dismissed', 'true');
    }

    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem(
      'pwa-install-prompt-last-shown',
      Date.now().toString()
    );
  };

  const handleDismissForever = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-prompt-dismissed', 'true');
  };

  // iOS Safari用の手動インストール案内
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  if (isInstalled || !showInstallBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/icon.png"
            alt="CookBot"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              CookBotをインストール
            </h3>
            <p className="text-xs text-gray-600">
              ホーム画面から簡単にアクセス（要ネット接続）
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="閉じる"
        >
          <X size={16} />
        </button>
      </div>

      {isIOS() ? (
        <div className="space-y-2 text-xs text-gray-600">
          <p>
            Safari の共有ボタン
            <span className="inline-block mx-1 p-1 bg-blue-100 rounded text-blue-600">
              □↗
            </span>
            から「ホーム画面に追加」を選択してください
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded text-xs hover:bg-gray-50"
            >
              後で
            </button>
            <button
              onClick={handleDismissForever}
              className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded text-xs hover:bg-gray-50"
            >
              表示しない
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={handleDismiss}
            className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded text-xs hover:bg-gray-50"
          >
            後で
          </button>
          <button
            onClick={handleInstallClick}
            className="flex-1 px-3 py-2 bg-[#8fdeb1] text-white rounded text-xs hover:bg-[#7bc8a4] transition-colors"
          >
            インストール
          </button>
        </div>
      )}
    </div>
  );
}
