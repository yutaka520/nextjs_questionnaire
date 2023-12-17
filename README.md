# nextjs_questionnaire
これは、next.jsにてアンケート収集、結果をグラフで表示するプロジェクトです。  
  
・アンケート画面  
<img width="396" alt="スクリーンショット 2023-12-18 0 55 23" src="https://github.com/yutaka520/nextjs_questionnaire/assets/72373889/82c6a2ce-e2d9-409e-9bb7-c5d01d3780e4">
  
・集計画面
<img width="1401" alt="スクリーンショット 2023-12-18 0 55 08" src="https://github.com/yutaka520/nextjs_questionnaire/assets/72373889/e59e0f54-710c-40c1-9c3e-b0fa598ef8c5">

## セットアップ
1. まずはdockerを立ち上げます。
    ```
    docker-compose up -d
    ```
2. nodeを立ち上げます。
   ```
   npm run dev
   ```
3. ブラウザで`http://localhost:3000`にアクセスします。
  
集計結果は`http://localhost:3000/SurveyResults`から閲覧できます。
