import React from 'react';
import NextSeo from 'next-seo';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../components/Layout';
import Tipcontainer from '../components/Tipcontainer';

class Index extends React.Component {
  static async getInitialProps({ req, res, match }) {
    let feed = await axios.get('http://m.spice.network/api/hot/30/true');
    feed = feed.data;
    return { feed };
  }

  render() {
    let { feed } = this.props;

    return (
      <Layout>
        <NextSeo
          config={{
            title: 'Spice Feed | Hot',
            description: 'The spice must flow.',
            canonical: 'https://www.spice.network/',
            openGraph: {
              url: 'https://www.spice.network/',
              title: 'Spice Feed | Hot',
              description: 'The spice must flow.',
              images: [
                {
                  url: 'https://spice.network/static/logo.png'
                }
              ]
            }
          }}
        />
        <div>
          {feed &&
            feed.map((x, i) => {
              return <Tipcontainer key={i} post={x} />;
            })}
        </div>
      </Layout>
    );
  }
}

export default Index;
