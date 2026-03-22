import { useMemo } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function HomePage() {
  const { totalMembers, averageTeamScore, topPerformersCount, atRiskCount, members } =
    useOutletContext();

  const topPerformerPercent = totalMembers
    ? Math.round((topPerformersCount / totalMembers) * 100)
    : 0;
  const atRiskPercent = totalMembers ? Math.round((atRiskCount / totalMembers) * 100) : 0;

  const roleChartData = useMemo(() => {
    const roleMap = members.reduce((map, member) => {
      const role = member.role?.trim() || 'Unassigned';
      map[role] = (map[role] || 0) + 1;
      return map;
    }, {});

    return Object.entries(roleMap)
      .map(([role, count]) => ({
        role,
        count,
        percentage: totalMembers ? Math.round((count / totalMembers) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [members, totalMembers]);

  const departmentChartData = useMemo(() => {
    const departmentMap = members.reduce((map, member) => {
      const department = member.department?.trim() || 'Unassigned';
      map[department] = (map[department] || 0) + 1;
      return map;
    }, {});

    return Object.entries(departmentMap)
      .map(([department, count]) => ({
        department,
        count,
        percentage: totalMembers ? Math.round((count / totalMembers) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [members, totalMembers]);

  const teamChartData = useMemo(() => {
    const teamMap = members.reduce((map, member) => {
      const team = member.team?.trim() || 'Unassigned';
      map[team] = (map[team] || 0) + 1;
      return map;
    }, {});

    return Object.entries(teamMap)
      .map(([team, count]) => ({
        team,
        count,
        percentage: totalMembers ? Math.round((count / totalMembers) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [members, totalMembers]);

  const piePalette = ['#212121', '#333333', '#525252', '#666666', '#808080', '#999999', '#B0B0B0', '#C7C7C7'];

  const departmentPieData = useMemo(
    () => departmentChartData.map((item, index) => ({ ...item, color: piePalette[index % piePalette.length] })),
    [departmentChartData]
  );

  const teamPieData = useMemo(
    () => teamChartData.map((item, index) => ({ ...item, color: piePalette[index % piePalette.length] })),
    [teamChartData]
  );

  const scoreBuckets = useMemo(() => {
    const buckets = [
      { label: '0-39', count: 0 },
      { label: '40-59', count: 0 },
      { label: '60-79', count: 0 },
      { label: '80-100', count: 0 },
    ];

    members.forEach((member) => {
      const score = member.score ?? 0;
      if (score < 40) {
        buckets[0].count += 1;
      } else if (score < 60) {
        buckets[1].count += 1;
      } else if (score < 80) {
        buckets[2].count += 1;
      } else {
        buckets[3].count += 1;
      }
    });

    const maxCount = Math.max(...buckets.map((bucket) => bucket.count), 1);

    return buckets.map((bucket) => ({
      ...bucket,
      height: `${Math.max((bucket.count / maxCount) * 100, bucket.count ? 20 : 6)}%`,
      percentage: totalMembers ? Math.round((bucket.count / totalMembers) * 100) : 0,
    }));
  }, [members, totalMembers]);

  const commonLegendLabel = {
    color: '#666666',
    boxWidth: 12,
    boxHeight: 12,
    font: { size: 12 },
  };

  const miniLineData = useMemo(() => {
    const sample = members.map((member) => member.score ?? 0).slice(-8);
    const labels = sample.map((_, index) => `P${index + 1}`);
    return {
      labels,
      datasets: [
        {
          data: sample.length ? sample : [0],
          borderColor: '#212121',
          backgroundColor: '#212121',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.35,
        },
      ],
    };
  }, [members]);

  const miniLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false }, min: 0, max: 100 },
    },
    animation: { duration: 700 },
  };

  const miniBarData = useMemo(
    () => ({
      labels: scoreBuckets.map((bucket) => bucket.label),
      datasets: [
        {
          data: scoreBuckets.map((bucket) => bucket.count),
          backgroundColor: '#212121',
          borderRadius: 4,
          barThickness: 8,
        },
      ],
    }),
    [scoreBuckets]
  );

  const miniBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false }, beginAtZero: true },
    },
    animation: { duration: 700 },
  };

  const miniDonutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { duration: 700 },
  };

  const roleBarData = useMemo(
    () => ({
      labels: roleChartData.map((item) => item.role),
      datasets: [
        {
          label: 'Members',
          data: roleChartData.map((item) => item.count),
          backgroundColor: '#212121',
          borderRadius: 6,
        },
      ],
    }),
    [roleChartData]
  );

  const scoreBarData = useMemo(
    () => ({
      labels: scoreBuckets.map((bucket) => bucket.label),
      datasets: [
        {
          label: 'Members',
          data: scoreBuckets.map((bucket) => bucket.count),
          backgroundColor: '#333333',
          borderRadius: 6,
        },
      ],
    }),
    [scoreBuckets]
  );

  const bigBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#212121', titleColor: '#F5F5F5', bodyColor: '#F5F5F5' },
    },
    scales: {
      x: { ticks: { color: '#666666' }, grid: { display: false } },
      y: { beginAtZero: true, ticks: { color: '#666666' }, grid: { color: '#E5E7EB' } },
    },
    animation: { duration: 700 },
  };

  const roleBarHorizontalOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#212121', titleColor: '#F5F5F5', bodyColor: '#F5F5F5' },
    },
    scales: {
      x: { beginAtZero: true, ticks: { color: '#666666' }, grid: { color: '#E5E7EB' } },
      y: { ticks: { color: '#666666' }, grid: { display: false } },
    },
    animation: { duration: 700 },
  };

  const departmentPieChartData = useMemo(
    () => ({
      labels: departmentPieData.map((item) => item.department),
      datasets: [
        {
          data: departmentPieData.map((item) => item.count),
          backgroundColor: departmentPieData.map((item) => item.color),
          borderWidth: 1,
          borderColor: '#ffffff',
        },
      ],
    }),
    [departmentPieData]
  );

  const teamPieChartData = useMemo(
    () => ({
      labels: teamPieData.map((item) => item.team),
      datasets: [
        {
          data: teamPieData.map((item) => item.count),
          backgroundColor: teamPieData.map((item) => item.color),
          borderWidth: 1,
          borderColor: '#ffffff',
        },
      ],
    }),
    [teamPieData]
  );

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: commonLegendLabel,
      },
      tooltip: { backgroundColor: '#212121', titleColor: '#F5F5F5', bodyColor: '#F5F5F5' },
    },
    animation: { duration: 700 },
  };

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold text-[#212121] md:text-3xl">Team Performance Tracker</h1>
        <p className="mt-1 text-sm text-[#666666]">Track, score, and manage your team efficiently.</p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-base text-[#999999]">Total Members</p>
              <p className="mt-3 text-4xl font-bold text-[#333333]">{totalMembers}</p>
            </div>
            <div className="h-14 w-16">
              <Bar data={miniBarData} options={miniBarOptions} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-base text-[#999999]">Average Team Score</p>
              <p className="mt-3 text-4xl font-bold text-[#333333]">{averageTeamScore}</p>
            </div>
            <div className="h-14 w-36">
              <Line data={miniLineData} options={miniLineOptions} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-base text-[#999999]">Top Performers</p>
              <p className="mt-3 text-4xl font-bold text-[#333333]">{topPerformersCount}</p>
            </div>
            <div className="relative h-16 w-16">
              <Doughnut
                data={{
                  labels: ['Top', 'Others'],
                  datasets: [
                    {
                      data: [topPerformerPercent, Math.max(100 - topPerformerPercent, 0)],
                      backgroundColor: ['#212121', '#E5E7EB'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={miniDonutOptions}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#666666]">
                {topPerformerPercent}%
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-base text-[#999999]">At Risk</p>
              <p className="mt-3 text-4xl font-bold text-[#333333]">{atRiskCount}</p>
            </div>
            <div className="relative h-16 w-16">
              <Doughnut
                data={{
                  labels: ['At Risk', 'Others'],
                  datasets: [
                    {
                      data: [atRiskPercent, Math.max(100 - atRiskPercent, 0)],
                      backgroundColor: ['#666666', '#E5E7EB'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={miniDonutOptions}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#666666]">
                {atRiskPercent}%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#212121]">Role Distribution</h2>
            <p className="text-sm text-[#666666]">Member count by role</p>
          </div>

          {roleChartData.length === 0 ? (
            <p className="text-sm text-[#666666]">No data available yet.</p>
          ) : (
            <div className="h-64">
              <Bar data={roleBarData} options={roleBarHorizontalOptions} />
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#212121]">Score Distribution</h2>
            <p className="text-sm text-[#666666]">Team performance bands</p>
          </div>

          {totalMembers === 0 ? (
            <p className="text-sm text-[#666666]">No data available yet.</p>
          ) : (
            <div className="h-64">
              <Bar data={scoreBarData} options={bigBarOptions} />
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#212121]">Department Distribution</h2>
            <p className="text-sm text-[#666666]">Members by department</p>
          </div>

          {departmentPieData.length === 0 ? (
            <p className="text-sm text-[#666666]">No department data available yet.</p>
          ) : (
            <div className="h-72">
              <Pie data={departmentPieChartData} options={pieOptions} />
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#212121]">Project Team Distribution</h2>
            <p className="text-sm text-[#666666]">Members by project teams</p>
          </div>

          {teamPieData.length === 0 ? (
            <p className="text-sm text-[#666666]">No team data available yet.</p>
          ) : (
            <div className="h-72">
              <Pie data={teamPieChartData} options={pieOptions} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;