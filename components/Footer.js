import React from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

class FooterComponent extends React.Component {
  state = {
    stats: ''
  };

  async componentDidMount() {
    let stats = await axios.get('http://m.spice.network/api/stats');
    this.setState({ stats: stats });
  }
  componentWillUnmount() {
    let { stats } = this.state;
  }

  render() {
    let { stats } = this.state;
    return (
      <>
        <Footer>over {stats && stats} tips given out.</Footer>
      </>
    );
  }
}

const Footer = styled.footer`
  text-align: center;

  @media (max-width: 400px) {
    .links {
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
    }
  }
`;

export default FooterComponent;
