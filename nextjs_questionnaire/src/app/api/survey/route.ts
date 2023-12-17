// pages/api/survey.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2';

export interface SurveyResponse {
  id: number;
  engineer_type: string;
  favorite_language: string;
  created_at: string;
}


// PostgreSQL接続情報
const params = {
  connectionLimit: 10,
  host: process.env.NEXTJS_QUESTIONNARE_DB_HOST,
  user: process.env.NEXTJS_QUESTIONNARE_DB_USER,
  password: process.env.NEXTJS_QUESTIONNARE_DB_PASSWORD,
  database: process.env.NEXTJS_QUESTIONNARE_DB_NAME,
  port: Number(process.env.NEXTJS_QUESTIONNARE_DB_PORT),
};

export async function POST(req: Request) {
  const pool = mysql.createPool(params);
  try {
    const formData = await req.json();

    await new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO survey_responses (engineer_type, favorite_language) VALUES (?, ?)',
        [formData.engineerType, formData.favoriteLanguage],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    return NextResponse.json({
      success: true,
      error: ''
    });
  } catch (error) {
    console.error('データベース保存エラー:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // プールのクローズ（必要に応じて）
    pool.end();
  }
}

export async function GET(req: Request) {
  const pool = mysql.createPool(params);
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM survey_responses', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    // データが result に格納されている
    console.log(result);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // プールのクローズ（必要に応じて）
    pool.end();
  }
}

