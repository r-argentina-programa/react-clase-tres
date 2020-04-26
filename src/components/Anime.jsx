import React from 'react';
import useFetchWithCache from '../hooks/useFetch';
import jikan from '../jikan';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const withoutAutoplay = (url) =>
  url
    .split('&')
    .filter((component) => !component.includes('autoplay'))
    .join('&');

const Anime = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchWithCache(jikan.getAnimeById, id);

  if (!data || loading) return <Loading />;

  if (error) return 'Something went wrong';

  if (data)
    return (
      <>
        <h1>{data.title}</h1>
        <img src={data.image_url} alt={data.title} />
        <div>Score: {data.score}</div>
        <div>Episodes: {data.episodes}</div>
        {data.source === 'Original' ? (
          <div>Original anime</div>
        ) : (
          <div>Based on a {data.source.toLowerCase()}</div>
        )}
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          Check it out on MAL!
        </a>
        <p>{data.synopsis}</p>
        {data.trailer_url && (
          <iframe
            title={`Trailer for ${data.title}`}
            width="560"
            height="315"
            src={withoutAutoplay(data.trailer_url)}
            frameborder="0"
            allowfullscreen
          />
        )}
      </>
    );
};
export default Anime;
