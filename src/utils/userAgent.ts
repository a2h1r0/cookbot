/**
 * Google Apps Script (GAS) からのアクセスを検出するユーティリティ
 */

/**
 * リクエストがGoogle Apps Scriptからのものかどうかを判定
 * @param headers - リクエストヘッダー（Headers または ReadonlyHeaders）
 * @returns GASからのアクセスの場合true
 */
export function isGoogleAppsScriptRequest(
  headers: Headers | { get: (name: string) => string | null }
): boolean {
  const userAgent = headers.get('user-agent')?.toLowerCase() || '';
  const referer = headers.get('referer')?.toLowerCase() || '';

  // Google Apps ScriptのUser-Agentパターンをチェック
  const gasUserAgentPatterns = [
    'google-apps-script',
    'googleappsscript',
    'google apps script',
    'urlfetchapp',
  ];

  // RefererがGoogle関連のURLかチェック
  const gasRefererPatterns = [
    'script.google.com',
    'script.googleusercontent.com',
  ];

  // User-Agentパターンをチェック
  const isGasUserAgent = gasUserAgentPatterns.some((pattern) =>
    userAgent.includes(pattern)
  );

  // Refererパターンをチェック
  const isGasReferer = gasRefererPatterns.some((pattern) =>
    referer.includes(pattern)
  );

  return isGasUserAgent || isGasReferer;
}
