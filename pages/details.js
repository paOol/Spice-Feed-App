import React from 'react';
import NextSeo from 'next-seo';
import axios from 'axios';
import Layout from '../components/Layout';
import Tipcontainer from '../components/Tipcontainer';
import utils from './utils';

let base = `http://m.spice.network/media`;

export default class Details extends React.Component {
  static async getInitialProps({ query }) {
    let id = query.permalink;
    let post = await axios.get(`http://m.spice.network/api/${id}`);
    post = post.data;
    return { post };
  }

  componentDidMount() {}

  config = () => {
    const { post } = this.props;
    let url;
    let description = `The spice must flow.`;
    let total = utils.calculateTotalScore(post);
    if (post.original_message_mediapath !== null) {
      url = post.original_message_mediapath;
    }
    if (post.original_message !== 'undefined') {
      description = post.original_message;
    }

    let obj = {
      title: `${total} SPICE | ${post.tipped_user_name} - The Spice Must Flow.`,
      description: description,
      canonical: 'https://www.spice.network/',
      openGraph: {
        url: 'https://www.spice.network/',
        title: `${total} SPICE | ${
          post.tipped_user_name
        } - The Spice Must Flow.`,
        description: description,
        images: [
          {
            url: url,
            width: 600
          }
        ]
      }
    };

    return obj;
  };

  render() {
    const { post } = this.props;

    return (
      <Layout>
        <NextSeo config={this.config()} />
        <div>{post && <Tipcontainer post={post} isDetailsPage={true} />}</div>
      </Layout>
    );
  }
}
