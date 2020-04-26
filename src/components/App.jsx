import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import AnimeSearch from './AnimeSearch';
import { CacheProvider } from '../CacheContext';
import Anime from './Anime';
import AnimeClass from './AnimeClass';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #222331;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  background: #262154;
  display: flex;
  padding: 1em;
  box-sizing: border-box;
`;

const Link = styled(NavLink)`
  background: none;
  border: none;
  border-radius: 1em;
  outline: none;
  color: white;
  padding: 0.5em;
  text-decoration: none;
  &:hover {
    background: #1f1b43;
  }
`;

const Layout = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <CacheProvider>
        <Router>
          <Header>
            <Link to="/">Home</Link>
          </Header>
          <Layout>
            <Switch>
              <Route path="/" exact>
                <AnimeSearch />
              </Route>
              <Route path="/anime/:id">
                <Anime />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </CacheProvider>
    </Wrapper>
  );
}

export default App;
