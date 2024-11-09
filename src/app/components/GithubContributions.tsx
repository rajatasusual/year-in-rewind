// src/app/components/GitHubContributions.tsx

import { useEffect, useState } from "react";
import CalendarHeatmap, { TooltipDataAttrs } from "react-calendar-heatmap";
import { FaCalendarAlt, FaCode, FaProjectDiagram } from "react-icons/fa";

interface Contribution {
  date: Date;
  count: number;
  level: number;
}

interface Project {
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  languages: Record<string, string>;
  topics: string[];
}

const startDate = new Date('2024-01-01');
const today = new Date();

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [topRepoContributions, setTopRepoContributions] = useState<string[]>([]);
  const [monthlyContributions, setMonthlyContributions] = useState<number[]>([]);

  useEffect(() => {
    async function fetchGithubContributions() {
      try {
        const response = await fetch('contributions.json');
        const data = await response.json();

        const contributions: Contribution[] = data.contributions.map(
          (item: { date: string; count: number; level: number }) => ({
            date: new Date(item.date),
            count: item.count,
            level: item.level,
          })
        );

        const total = contributions.reduce((acc, curr) => acc + curr.count, 0);
        const monthly = Array(12).fill(0);
        contributions.forEach((c) => monthly[c.date.getMonth()] += c.count);

        const topRepos = (await (await fetch('projects.json')).json()).slice(1, 4).map((repo: Project) => repo.name);

        setContributions(contributions);
        setTotalContributions(total);
        setMonthlyContributions(monthly);
        setTopRepoContributions(topRepos);
      } catch (error) {
        console.error('Failed to fetch Contributions:', error);
      }
    }

    fetchGithubContributions();
  }, []);

  return (
    <section>
      <h2>GitHub Contributions</h2>
      <div className="github-contributions">
        {/* Contribution Summary */}
        <div className="gh-contribution">
          <FaCode className="gh-icon" />
          <span className="gh-text"><b>Total Contributions: </b>{totalContributions}</span>
        </div>
        <div className="gh-contribution">
          <FaCalendarAlt className="gh-icon" />
          <span className="gh-text"><b>Busiest Month: </b>{Math.max(...monthlyContributions)}</span>
        </div>
        <div className="gh-contribution">
          <FaProjectDiagram className="gh-icon" />
          <span className="gh-text"><b>Top Projects: </b>{topRepoContributions.join(', ')}</span>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="github-card">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={contributions}
          classForValue={(value) => {
            if (!value || !value.count) return 'color-empty';
            return `color-github-${Math.min(value.count, 4)}`;
          }}
          showWeekdayLabels={false}
          showMonthLabels={false}
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