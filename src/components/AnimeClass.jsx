import React, { Component } from 'react';
import jikan from '../jikan';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withCache } from '../CacheContext';

class AnimeClass extends Component {
  state = {
    data: null,
    loading: false,
    error: null,
  };

  fetchData = async () => {
    const { id } = this.props.match.params;

    this.setState({ loading: true, data: null, error: null });
    try {
      const resource = await jikan.getAnimeById(id);
      this.setState({ loading: false, data: resource });
      this.props.cache.dispatch({ type: 'SET_CACHE', payload: { key: id, value: resource } });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData();
    }
  }

  withoutAutoplay = (url) =>
    url
      .split('&')
      .filter((component) => !component.includes('autoplay'))
      .join('&');

  render() {
    const { data, loading, error } = this.state;

    if (loading) return <Loading />;

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
              src={this.withoutAutoplay(data.trailer_url)}
              frameborder="0"
              allowfullscreen
            />
          )}
          <NavLink to={`/anime/${Number(this.props.match.params.id) + 1}`}>Next</NavLink>
        </>
      );

    return null;
  }
}

export default withRouter(withCache(AnimeClass));
