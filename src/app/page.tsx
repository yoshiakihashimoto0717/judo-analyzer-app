// src/app/page.tsx
// このページは、動画のアップロードとAI解析結果の表示を行うメイン画面です。

import { Job } from '@/src/types'; // types.tsで定義した型をインポート

// 仮のデータ構造 (アプリ開発中の見た目を確認するため)
const DUMMY_JOB: Job = {
  id: 'job-12345',
  file: new File([""], "dummy_match.mp4", { type: "video/mp4" }),
  status: 'completed',
  progress: 100,
  result: {
    summary: "AI解析結果：【積極的な攻めは評価】ですが、組み手の際に相手のペースに乗ってしまう傾向が見られます。特に試合終盤でスタミナ切れによる消極的な姿勢が目立ちました。",
    timeline: [
      { time: 15, event: '大外刈り', player: 'A' },
      { time: 45, event: '指導', player: 'B' },
      { time: 90, event: '内股', player: 'A' },
      { time: 130, event: '有効', player: 'A' },
      { time: 180, event: '指導', player: 'A' },
      { time: 240, event: '大内刈り（不発）', player: 'B' },
      { time: 300, event: '一本勝ち', player: 'A' },
    ],
    analysis: "組み手争いで優位に立っている時間帯が全体の65%と高いです。しかし、そこから技に入るまでの時間が長く、相手にリカバリーの機会を与えています。改善点として、組んだ瞬間の反応速度を上げるトレーニング（特に釣り手）が必要です。スタミナ面では、試合後半の心拍数上昇が著しく、週に2回のインターバルトレーニングの導入を推奨します。",
    opponent_feature: "相手選手（B）は、左組みからの足払いに非常に長けており、特に内股後の崩しを得意としています。対策として、左組み相手への左釣り手の取り方と、技をかける際の重心移動を意識することが有効です。"
  },
  error: null,
};


export default function Home() {

  // 現在はダミーデータを使用
  const job = DUMMY_JOB;
  const isCompleted = job.status === 'completed';

  return (
    <div className="container py-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-2">JUDO ANALYZER 🥋</h1>
        <p className="text-secondary text-lg">AIによる柔道試合の自動解析 & トレーニング提案</p>
      </header>

      {/* --- STEP 1: ファイルアップロードエリア (現在はダミー) --- */}
      <div className="card mb-12">
        <h2 className="text-2xl text-text font-bold mb-4">動画ファイルをアップロード</h2>
        <p className="text-sm text-gray-400 mb-4">試合動画（MP4形式推奨）をアップロードしてください。AIが選手の動きとポイントを解析します。</p>
        <div className="border-2 border-dashed border-primary/50 p-10 rounded-lg text-center cursor-pointer hover:bg-card/50 transition duration-300">
          <p className="text-primary text-xl">
            [+] ここをクリックしてファイルを選択するか、ドラッグ＆ドロップしてください
          </p>
          <p className="text-sm text-gray-500 mt-2">（最大ファイルサイズ：200MB）</p>
        </div>
      </div>

      {/* --- STEP 2: 解析結果エリア --- */}
      <h2 className="text-3xl font-bold text-secondary mb-6">試合解析結果: {job.file.name}</h2>
      
      {/* 状態表示 */}
      <div className={`card mb-8 p-4 font-bold text-center ${isCompleted ? 'bg-primary/20' : 'bg-secondary/20'}`}>
          ステータス: <span className="text-text">{job.status === 'completed' ? '✅ 解析完了' : '⚙️ 解析処理中...'}</span>
      </div>

      {/* 解析結果カード (完了時のみ表示) */}
      {isCompleted && job.result && (
        <div className="space-y-8">
          
          {/* サマリーカード */}
          <div className="card border border-primary">
            <h3 className="text-xl font-bold text-primary mb-3">要約</h3>
            <p className="text-lg whitespace-pre-wrap">{job.result.summary}</p>
          </div>

          {/* タイムライン */}
          <div className="card">
            <h3 className="text-xl font-bold text-secondary mb-3">タイムライン (試合経過)</h3>
            <div className="space-y-2">
              {job.result.timeline.map((item, index) => (
                <div key={index} className="flex justify-between border-b border-card/50 pb-1">
                  <span className="font-mono text-primary mr-4">[{Math.floor(item.time / 60).toString().padStart(2, '0')}:{ (item.time % 60).toString().padStart(2, '0')}]</span>
                  <span className={`font-bold ${item.player === 'A' ? 'text-text' : 'text-gray-500'}`}>{item.player}選手:</span>
                  <span className="flex-grow ml-2">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 詳細分析と提案 */}
          <div className="card border border-primary">
            <h3 className="text-xl font-bold text-primary mb-3">詳細な改善点とトレーニング提案</h3>
            <p className="whitespace-pre-wrap">{job.result.analysis}</p>
          </div>

          {/* 相手選手の特徴 */}
          <div className="card border border-secondary">
            <h3 className="text-xl font-bold text-secondary mb-3">相手選手の特徴と対策</h3>
            <p className="whitespace-pre-wrap">{job.result.opponent_feature}</p>
          </div>
        </div>
      )}
    </div>
  );
}