import { List, Card } from "antd";
import { Album } from "../types/models";

interface AlbumListProps {
  albums: Album[];
  onSelect: (albumId: number) => void;
}

function AlbumList({ albums, onSelect }: AlbumListProps) {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={albums}
      renderItem={(album) => (
        <List.Item onClick={() => onSelect(album.id)}>
          <Card
            hoverable
            cover={<img alt={album.name} src={album.coverImage} />}
          >
            <Card.Meta
              title={
                album.isPublished
                  ? album.name
                  : `${album.name} (неопубликовано)`
              }
              description={`Год: ${album.year}, Треки: ${album.trackCount ?? 0}`}
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default AlbumList;
