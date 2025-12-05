// src/types.ts

// 柔道解析ジョブの状態を定義する型
export type Job = {
  id: string;                               // ジョブの一意な識別子
  file: File;                               // アップロードされた元の動画ファイル
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error'; // 解析の現在の状態
  progress: number;                         // 進捗度 (0から100)
  result: ApiResult | null;                 // 解析完了後の結果データ
  error: string | null;                     // エラーメッセージ
};

// 解析APIから返ってくる最終結果の型
export type ApiResult = {
  summary: string;                         // 解析サマリー（上部のカード表示用）
  timeline: {                              // 試合タイムライン（技や出来事）
    time: number;                          // 発生時間（秒）
    event: string;                         // 出来事（技名、指導、ポイントなど）
    player: 'A' | 'B';                     // 選手 ('A'または'B')
  }[];
  analysis: string;                        // 詳細な改善点やトレーニング提案
  opponent_feature: string;                // 相手選手の特徴（Geminiで自動生成）
};

// ステータス表示用の日本語マッピング
export const STATUS_MAP: { [key in Job['status']]: string } = {
  pending: '待機中',
  uploading: 'アップロード中',
  processing: 'AI解析中',
  completed: '✅ 解析完了',
  error: '❌ エラー発生',
};