// src/app/components/GitHubContributions.tsx
"use client";

import { useEffect, useState } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';

interface Contribution {
  date: Date;
  count: number;
  level: number;
}

const startDate = new Date('2024-01-01');
const today = new Date();


export default function GitHubContributions() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    async function fetchGithubContributions() {
      try {
        const response = await fetch('/contributions.json');
        const data = await response.json();

        const contributions: Contribution[] = data.contributions.map(
          (item: { date: string; count: number; level: number }) => ({
            date: new Date(item.date),
            count: item.count,
            level: item.level,
          })
        );

        setContributions(contributions);
      } catch (error) {
        console.error('Failed to fetch Contributions:', error);
      }
    }

    fetchGithubContributions();
  }, []);

  return (
    <section className="p-8 component bg-gradient">
      <h2 className="text-3xl mb-4">GitHub Contributions</h2>
      <div className="relative w-full max-w-lg mx-auto overflow-hidden blur-effect p-6 bg-white shadow-md rounded-lg">
        <h1>Here's my year from the lens of the code I wrote:</h1>
        <br />
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={contributions}
          classForValue={(value: { count: number; }) => {
            if (!value) return 'color-empty';
            return `color-github-${Math.min(value.count, 4)}`; // assuming 4 is the max level for color
          }}
          showWeekdayLabels={true}
          tooltipDataAttrs={(value: { date: { toDateString: () => any; }; count: any; }) => {
            if (!value.date) return { 'data-tip': 'No contributions' };
            return {
              'data-tip': `${value.date.toDateString()}: ${value.count} contributions`,
            };
          }}
        />
      </div>
    </section>
  );
}