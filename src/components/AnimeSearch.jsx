import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useFetchOnChange, useFetchReducer } from '../hooks/useSimpleFetch';
import { useDebouncedFetch } from '../hooks/useFetchWithCache';
import { NavLink } from 'react-router-dom';
import jikan from '../jikan';
import Loading from './Loading';

const SearchWrapper = styled.div`
  margin-bottom: 2em;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid white;
  outline: none;
  color: white;
`;

const ResultList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;
const ResultListItem = styled.li`
  margin-right: 1em;
  margin-bottom: 1em;
  width: 30%;
`;
const ResultItem = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Image = styled.img`
  margin-top: 1em;
  max-height: 20em;
`;

const AnimeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, loading } = useFetchOnChange(jikan.searchAnime, searchTerm, 500);

  return (
    <>
      <SearchWrapper>
        <span>Search for an anime: </span>
        <SearchInput onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      </SearchWrapper>
      {loading && <Loading />}
      {data && (
        <ResultList>
          {data.results.map((result) => (
            <ResultListItem key={result.mal_id}>
              <NavLink to={`/anime/${result.mal_id}`}>
                <ResultItem>
                  <div>{result.title}</div>
                  <Image src={result.image_url} alt={result.title} />
                </ResultItem>
              </NavLink>
            </ResultListItem>
          ))}
        </ResultList>
      )}

      {error && <div>{error}</div>}
    </>
  );
};
export default AnimeSearch;
