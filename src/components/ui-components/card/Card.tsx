// Updated Card component with props
function Card({ activity, logo }: { activity: string; logo: string }) {
  return (
    <div className="nihongo-activity-card-container">
      <h2>{activity}</h2>
    </div>
  );
}

export default Card;
