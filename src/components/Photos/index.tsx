import React, { useCallback, useState } from 'react';
import { PhotoGrid } from '../PhotoGrid';

const PAGE_SIZE = 30;

type PhotosProps = {
  photos?: string[];
};

export const Photos: React.FC<PhotosProps> = ({ photos = [] }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const visiblePhotos = photos.slice(0, page * PAGE_SIZE);

  const loadMorePhotos = useCallback(() => {
    if (loading) return;
    const nextPage = page + 1;
    if (photos.length > visiblePhotos.length) {
      setLoading(true);
      setTimeout(() => {
        setPage(nextPage);
        setLoading(false);
      }, 300);
    }
  }, [photos.length, visiblePhotos.length, page, loading]);

  return (
    <PhotoGrid
      photos={visiblePhotos}
      loading={loading}
      loadMore={loadMorePhotos}
      numColumns={3}
    />
  );
};
