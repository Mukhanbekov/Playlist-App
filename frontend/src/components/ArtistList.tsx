import { List, Card } from "antd";
import { Artist } from "../types/models";

interface ArtistListProps {
  artists: Artist[];
  onSelect: (artistId: number) => void;
}

function ArtistList({ artists, onSelect }: ArtistListProps) {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={artists}
      renderItem={(artist) => (
        <List.Item onClick={() => onSelect(artist.id)}>
          <Card hoverable cover={<img alt={artist.name} src={artist.photo} />}>
            <Card.Meta
              title={
                artist.isPublished
                  ? artist.name
                  : `${artist.name} (неопубликовано)`
              }
              description={artist.info}
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default ArtistList;
