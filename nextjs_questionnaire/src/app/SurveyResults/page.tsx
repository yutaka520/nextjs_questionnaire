"use client";
import { useEffect, useState } from "react";
import { SurveyResponse } from "../api/survey/route"
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend);

const SurveyChart = () => {
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/survey");
        const data = await response.json();
        setSurveyData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const countByField = (field: "engineer_type" | "favorite_language") => {
    const countMap = new Map<string, number>();

    surveyData.forEach((item) => {
      const fieldValue = item[field];

      if (countMap.has(fieldValue)) {
        countMap.set(fieldValue, countMap.get(fieldValue)! + 1);
      } else {
        countMap.set(fieldValue, 1);
      }
    });

    return Array.from(countMap.values());
  };

  const generateColors = (count: number) => {
    const colors = [];
    const hueIncrement = 360 / count;

    for (let i = 0; i < count; i++) {
      const hue = i * hueIncrement;
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }

    return colors;
  };

  const chartDataEngineer = {
    labels: Array.from(new Set(surveyData.map((item) => item.engineer_type))),
    datasets: [
      {
        data: countByField("engineer_type"),
        backgroundColor: generateColors(countByField("engineer_type").length),
      },
    ],
  };

  const chartDataLanguage = {
    labels: Array.from(new Set(surveyData.map((item) => item.favorite_language))),
    datasets: [
      {
        data: countByField("favorite_language"),
        backgroundColor: generateColors(countByField("favorite_language").length),
      },
    ],
  };

  return (
    <div style={{ width: 300, margin: '50px auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <span>回答数: {surveyData.length}</span>
      </div>
      <div>
        <h2>エンジニア種別</h2>
        <Pie data={chartDataEngineer} />
      </div>
      <div>
        <h2>言語種別</h2>
        <Pie data={chartDataLanguage} />
      </div>
    </div>
  );
};

export default SurveyChart;
