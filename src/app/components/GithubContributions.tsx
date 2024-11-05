// src/app/components/GitHubContributions.tsx
"use client";

import { useEffect, useState } from "react";
import CalendarHeatmap, { TooltipDataAttrs } from 'react-calendar-heatmap';

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
    <section>
      <h2>GitHub Contributions</h2>
      <div className="github-card">
        <h3 className="github-title">Here is my year from the lens of the code I wrote:</h3>
        <br />
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={contributions}
          classForValue={(value) => {
            if (!value || !value.count) return 'color-empty';
            return `color-github-${Math.min(value.count, 4)}`;
          }}
          showWeekdayLabels={true}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) return { 'data-tip': 'No contributions' } as TooltipDataAttrs;
            return {
              'data-tip': `${value.date.toDateString()}: ${value.count} contributions`,
            } as TooltipDataAttrs;
          }}
        />
      </div>
    </section>
  );
}