import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/leadService";
import {
  Users,
  CalendarDays,
  CalendarRange,
  BarChart3,
} from "lucide-react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  const cards = [
    {
      title: "Today's Leads",
      value: stats.today,
      icon: <CalendarDays size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "This Week",
      value: stats.week,
      icon: <CalendarRange size={28} />,
      color: "bg-purple-600",
    },
    {
      title: "This Month",
      value: stats.month,
      icon: <BarChart3 size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Total Leads",
      value: stats.total,
      icon: <Users size={28} />,
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-slate-900 rounded-2xl border border-slate-800 p-6"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3 text-white">
                {card.value}
              </h2>

            </div>

            <div
              className={`${card.color} h-14 w-14 rounded-xl flex items-center justify-center text-white`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}