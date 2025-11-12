import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
}

const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="stats-card-title">{title}</div>
      <div className="stats-card-value">{value}</div>
    </div>
  );
};

export default StatsCard;
