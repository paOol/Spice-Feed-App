import React from 'react';
import NextSeo from 'next-seo';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../components/Layout';
import Leaderboardcontainer from '../components/Leaderboardcontainer';

class Index extends React.Component {
  static async getInitialProps({ req, res, match }) {
    let topReceived = await axios.get(
      'http://m.spice.network/api/leaderboard/received/50'
    );
    topReceived = topReceived.data;
    let topTipped = await axios.get(
      'http://m.spice.network/api/leaderboard/tipped/50'
    );
    topTipped = topTipped.data;
    return { topReceived, topTipped };
  }

  render() {
    let { topReceived, topTipped } = this.props;

    return (
      <Layout>
        <NextSeo
          config={{
            title: 'Spice Feed | Leaderboard',
            description: 'The spice must flow.',
            canonical: 'https://www.spice.network/',
            openGraph: {
              url: 'https://www.spice.network/',
              title: 'Spice Feed | Leaderboard',
              description: 'The spice must flow.',
              images: [
                {
                  url: 'https://spice.network/static/logo.png'
                }
              ]
            }
          }}
        />

        <h2>Most tips received</h2>
        {topReceived &&
          topReceived.map((x, i) => {
            return (
              <Leaderboardcontainer
                key={i}
                position={i}
                item={x}
                type='received'
              />
            );
          })}

        <h2>Most tips given</h2>
        {topTipped &&
          topTipped.map((x, i) => {
            return (
              <Leaderboardcontainer
                key={i}
                position={i}
                item={x}
                type='tipped'
              />
            );
          })}
      </Layout>
    );
  }
}

export default Index;
