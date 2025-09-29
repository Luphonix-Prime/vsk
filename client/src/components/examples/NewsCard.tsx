import NewsCard from '../NewsCard';
import culturalEventImage from '@assets/generated_images/Cultural_event_photo_4cfc2141.png';

export default function NewsCardExample() {
  return (
    <div className="max-w-sm">
      <NewsCard
        id="1"
        title="Annual Cultural Festival 2024 Celebrates Rich Heritage"
        excerpt="Join us for our biggest cultural celebration of the year featuring traditional performances, authentic cuisine, and community activities that bring together families from across Gujarat."
        image={culturalEventImage}
        date="March 15, 2024"
        author="VSK Team"
        category="Events"
        onClick={() => console.log('News card clicked')}
      />
    </div>
  );
}