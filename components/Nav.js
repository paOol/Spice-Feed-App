import React from 'react';
import Link from './Link';
import styled, { createGlobalStyle } from 'styled-components';

class Nav extends React.Component {
  componentDidMount() {
    let { store } = this.props;
  }
  componentWillUnmount() {
    let { store } = this.props;
  }

  render() {
    let { store } = this.props;
    return (
      <>
        <GlobalStyle />
        <Navbar>
          <div>
            <Link activeClassName='active' prefetch href='/'>
              <img src='../static/logo.png' alt='Spice Feed' />
            </Link>
            <h1>The spice must flow.</h1>
          </div>
          <div className='links'>
            <Link activeClassName='active' prefetch href='/top'>
              <a>Top</a>
            </Link>
            <Link activeClassName='active' prefetch href='/latest'>
              <a>Latest</a>
            </Link>
            <Link activeClassName='active' prefetch href='/hot'>
              <a>Hot</a>
            </Link>
            <Link activeClassName='active' prefetch href='/leaderboard'>
              <a>Leaderboard</a>
            </Link>
          </div>
        </Navbar>
      </>
    );
  }
}

const Navbar = styled.nav`
  text-align: center;
  img {
    margin: 0 auto;
    max-width: 100%;
    cursor: pointer;
  }
  h1 {
    font-size: 0.9rem;
    font-weight: 300;
    margin-bottom: 2.4rem;
  }
  .links {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 2rem;
    margin-bottom: 2rem;
    a.active {
      color: #f30000 !important;
    }
    a {
      font-size: 0.6rem;
      text-decoration: none;
      padding: 0.5rem 0.3rem;
      border: 1px solid rgba(180, 180, 180, 0.4);
      border-radius: 5px;
      color: black;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
  @media (max-width: 400px) {
    .links {
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,700');
  html{
    text-rendering: optimizeLegibility;
  }
  body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  }
  .media-only {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:1.5rem;
    a {
      font-size: 0.6rem;
      text-decoration: none;
      padding: 0.5rem 0.3rem;
      border: 1px solid rgba(180, 180, 180, 0.4);
      border-radius: 5px;
      color: black;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
  .wrap {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 9rem;
  @media (max-width: 1000px) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
`;

export default Nav;
