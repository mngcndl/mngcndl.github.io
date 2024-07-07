// pages/comic.tsx

import React, { useEffect, useState } from 'react';
import styles from '../styles/Comic.module.css'; // Import CSS module
import { useRouter } from 'next/router';

interface Comic {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

const ComicComponent: React.FC = () => {
  const [comicData, setComicData] = useState<Comic | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchComic = async () => {
      const email = 'l.smirnova@innopolis.university';
      try {
        const params = new URLSearchParams({ email });
        const idResponse = await fetch(`https://fwd.innopolis.university/api/hw2?${params.toString()}`);

        if (!idResponse.ok) {
          throw new Error(`Failed to fetch comic ID: ${idResponse.statusText}`);
        }

        const comicId = await idResponse.json();

        const comicParams = new URLSearchParams({ id: comicId });
        const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);

        if (!comicResponse.ok) {
          throw new Error(`Failed to fetch comic data: ${comicResponse.statusText}`);
        }

        const comicData: Comic = await comicResponse.json();
        setComicData(comicData);

      } catch (error) {
        console.error('Error fetching comic data:', error);
      }
    };

    fetchComic();
  }, []);

  if (!comicData) {
    return null; // or loading indicator
  }

  const comicReleaseDate = new Date(
    parseInt(comicData.year),
    parseInt(comicData.month) - 1,
    parseInt(comicData.day)
  );

  return (
    <div className={styles['comic-container']}>
      <h2 className={styles['comic-header']}>Random XKCD Comic</h2>
      <div className={styles['comic-content']}>
        <img id="comic_img" src={comicData.img} alt={comicData.alt} className={styles['comic-img']} />
        <h3 id="comic_title" className={styles['comic-title']}>{comicData.safe_title}</h3>
        <p id="comic_date" className={styles['comic-date']}>{comicReleaseDate.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ComicComponent;
