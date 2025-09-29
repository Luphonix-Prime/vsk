import ImportantDayCard from '../ImportantDayCard';

export default function ImportantDayCardExample() {
  return (
    <div className="max-w-md">
      <ImportantDayCard
        id="1"
        title="Navratri Celebration"
        date="October 15, 2024"
        time="6:00 PM"
        description="Join us for a vibrant celebration of Navratri with traditional dance, music, and authentic Gujarati cuisine. All community members and families are welcome."
        category="Festival"
        isUpcoming={true}
      />
    </div>
  );
}