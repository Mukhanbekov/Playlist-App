export interface Artist {
  id: number;
  name: string;
  photo: string;
  info: string;
  isPublished: boolean;
}

export interface Album {
  id: number;
  name: string;
  year: number;
  coverImage: string;
  trackCount?: number;
  artist: Artist;
  isPublished: boolean;
}

export interface Track {
  youtubeUrl?: string;
  id: number;
  name: string;
  duration: string;
  trackNumber: number;
  isPublished: boolean;
  album: Album;
}
