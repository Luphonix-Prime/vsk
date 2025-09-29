import PublicationCard from '../PublicationCard';

export default function PublicationCardExample() {
  return (
    <div className="max-w-md">
      <PublicationCard
        id="1"
        title="Cultural Heritage Preservation Guidelines"
        description="Comprehensive guide on preserving and promoting Gujarati cultural traditions in modern society. Includes practical strategies for community engagement and cultural education."
        publishDate="February 2024"
        fileSize="2.3 MB"
        downloadUrl="#"
        category="Guidelines"
        onDownload={() => console.log('Publication downloaded')}
      />
    </div>
  );
}