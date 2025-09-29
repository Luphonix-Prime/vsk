import GalleryCard from '../GalleryCard';
import danceImage from '@assets/generated_images/Traditional_dance_performance_44f13591.png';

export default function GalleryCardExample() {
  const sampleItem = {
    id: "1",
    type: "image" as const,
    src: danceImage,
    thumbnail: danceImage,
    title: "Traditional Dance Performance",
    description: "Annual cultural festival showcasing traditional Gujarati dance forms"
  };

  return (
    <div className="max-w-sm">
      <GalleryCard 
        item={sampleItem}
        onClick={() => console.log('Gallery card clicked')}
      />
    </div>
  );
}