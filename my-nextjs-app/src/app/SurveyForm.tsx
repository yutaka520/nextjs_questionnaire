"use client"
// SurveyForm.tsx
import { useState } from 'react';

// use client

const SurveyForm: React.FC = () => {
  const [engineerType, setEngineerType] = useState<string>('');
  const [favoriteLanguage, setFavoriteLanguage] = useState<string>('');
  const [otherEngineer, setOtherEngineer] = useState<string>('');
  const [otherLanguage, setOtherLanguage] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleEngineerTypeChange = (value: string) => {
    setEngineerType(value);

    // 「その他」が選択された場合、自由記述欄をクリア
    if (value !== 'other') {
      setOtherEngineer('');
    }
  };

  const handleLanguageChange = (value: string) => {
    setFavoriteLanguage(value);

    // 「その他」が選択された場合、自由記述欄をクリア
    if (value !== 'その他') {
      setOtherLanguage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      engineerType: engineerType === 'other' ? otherEngineer : engineerType,
      favoriteLanguage: favoriteLanguage === 'その他' ? otherLanguage : favoriteLanguage,
    };

    try {
      // APIにデータを送信
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('データベース保存成功');
        // 成功した場合の処理をここに追加
        setIsCompleted(true);
      } else {
        console.error('データベース保存失敗:', response.statusText);
        // 失敗した場合の処理をここに追加
      }
    } catch (error) {
      console.error('データベース保存エラー:', error);
      // エラーの場合の処理をここに追加
    }
  };

  return (

    <>
      {isCompleted ? (
        <>
          <p>送信が完了しました</p>
          <a href="/SurveyResults" style={{ color: '#008cff' }}>集計結果を見る</a>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', margin: '10px 0' }}>
            Q1. あなたは何系エンジニアですか？
            <select value={engineerType} onChange={(e) => handleEngineerTypeChange(e.target.value)}>
              <option value="">選択してください</option>
              <option value="web">Webエンジニア</option>
              <option value="ios">iOSエンジニア</option>
              <option value="android">Androidエンジニア</option>
              <option value="backend">バックエンドエンジニア</option>
              <option value="frontend">フロントエンジニア</option>
              <option value="infra">インフラエンジニア</option>
              <option value="data">データエンジニア</option>
              <option value="security">セキュリティエンジニア</option>
              <option value="game">ゲームエンジニア</option>
              <option value="devops">DevOpsエンジニア</option>
              <option value="ai">AIエンジニア</option>
              <option value="other">その他（自由記述）</option>
            </select>
          </label>

          {/* 「その他」が選択された場合に表示される自由記述欄 */}
          {engineerType === 'other' && (
            <label style={{ display: 'block' }}>
              その他（自由記述）：
              <input
                type="text"
                value={otherEngineer}
                onChange={(e) => setOtherEngineer(e.target.value)}
              />
            </label>
          )}
          <br />

          <label style={{ display: 'block', margin: '10px 0' }}>
            Q2. あなたの好きな言語は何ですか？
            <select value={favoriteLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
              <option value="">選択してください</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Go">Go</option>
              <option value="Swift">Swift</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Kotlin">Kotlin</option>
              <option value="PHP">PHP</option>
              <option value="HTML/CSS">HTML/CSS</option>
              <option value="Rust">Rust</option>
              <option value="C++">C++</option>
              <option value="Objective-C">Objective-C</option>
              <option value="Shell">Shell</option>
              <option value="R">R</option>
              <option value="Scala">Scala</option>
              <option value="MATLAB">MATLAB</option>
              <option value="Haskell">Haskell</option>
              <option value="その他">その他（自由記述）</option>
            </select>
          </label>

          {/* 「その他」が選択された場合に表示される自由記述欄 */}
          {favoriteLanguage === 'その他' && (
            <label style={{ display: 'block' }}>
              その他（自由記述）：
              <input
                type="text"
                value={otherLanguage}
                onChange={(e) => setOtherLanguage(e.target.value)}
              />
            </label>
          )}

          <br />

          <button type="submit" style={{
              display: 'block',
              padding: '5px 10px',
              borderRadius: 4,
              margin: '10px auto',
              backgroundColor: '#4900ff',
              boxShadow: '0px 0px 4px 2px #0000001f',
              color: 'white'
          }}>送信</button>
        </form>)
      }
    </>

  );
};

export default SurveyForm;
