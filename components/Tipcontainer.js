import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from '../routes';
import BigNumber from 'bignumber.js';
import path from 'path';
import Share from './Share';
import utils from '../pages/utils';

let base = `http://m.spice.network/media`;
let youtubeRegex = /^(http(s)?:\/\/)?(m?.?)((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i;

class Tipcontainer extends React.Component {
  youtubeContainer = url => {
    return (
      <div className='iframewrap'>
        <iframe
          width='600'
          height='315'
          src={url}
          frameBorder='0'
          allowFullScreen
        />
      </div>
    );
  };
  renderMedia = () => {
    const { post } = this.props;
    let extension;

    let showYoutube = youtubeRegex.test(post.original_message);
    let url = showYoutube ? post.original_message.match(youtubeRegex)[0] : '';

    if (post.original_message_mediapath !== null) {
      extension = path.extname(post.original_message_mediapath);
    }
    let allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

    let cleanText = utils.removeUrlsFromText(post.original_message);

    if (extension !== undefined && extension.includes('.mp4')) {
      return (
        <div className='message'>
          <video autoPlay controls muted loop>
            <source src={post.original_message_mediapath} type='video/mp4' />
          </video>
          <br />
          {post.original_message !== 'undefined' && post.original_message}
          {showYoutube ? this.youtubeContainer(url) : ''}
        </div>
      );
    } else if (extension !== undefined && extension.includes('.ogg')) {
      return (
        <div className='message'>
          <audio controls>
            <source src={post.original_message_mediapath} type='audio/ogg' />
          </audio>
          {post.original_message !== 'undefined' && post.original_message}{' '}
          {showYoutube ? this.youtubeContainer(url) : ''}
        </div>
      );
    } else if (
      extension !== undefined &&
      utils.isInArray(extension, allowedExtensions)
    ) {
      return (
        <div className='message'>
          <img
            src={post.original_message_mediapath}
            alt='SpiceFeed | Bitcoin Cash'
          />
          <br />
          {post.original_message !== 'undefined' && post.original_message}{' '}
          {showYoutube ? this.youtubeContainer(url) : ''}
        </div>
      );
    } else {
      return (
        <div className='message'>
          {post.original_message}{' '}
          {showYoutube ? this.youtubeContainer(url) : ''}
        </div>
      );
    }
  };

  spicyDetails = () => {
    let { post } = this.props;

    return (
      <>
        <div className='footer'>
          <div>
            {post.tweet_source !== null && (
              <a
                target='_blank'
                rel='nofollow'
                href={`https://twitter.com/${post.tweet_source}`}
              >
                <img src='../static/details.png' alt='' />
                Go to Source
              </a>
            )}
          </div>
          <Share url={`https://spice.network/details/${post.permalink}`} />
        </div>
        <div className='details'>
          <h2>Spicy Details</h2>
          {post.chat_name !== 'null' ? <h5>from {post.chat_name}</h5> : ''}
        </div>
        <div className='border'>
          <div className='first-tipper'>
            Tipped {utils.formatToCommas(post.string_amount)} SPICE by&nbsp;
            {post.tipper_user} {moment(post.created_at).fromNow()}
          </div>
          {post.additional_tippers.length > 0 &&
            post.additional_tippers.map((x, i) => {
              let timeAgo = moment(x.tipper_message_date * 1000).fromNow();
              return (
                <div className='additional-tipper' key={i}>
                  Tipped&nbsp;
                  {/* <img src={x.mediapath} alt={x.username} /> */}
                  {new BigNumber(`${x.int_amount}e-8`).toPrecision()} SPICE
                  by&nbsp;
                  {x.username}
                  &nbsp;{timeAgo}
                </div>
              );
            })}
        </div>
      </>
    );
  };

  detailsBodyView = () => {
    let { post } = this.props;
    let timeAgo = moment(post.created_at).fromNow();
    return (
      <div className='body'>
        <div className='content'>
          <div className='replyingTo'>
            <div className='info'>
              {post.tipped_user_name} on {post.service} {timeAgo}
            </div>
            {this.renderMedia()}
          </div>
          <div className='info tipper'>{post.tipper_user}</div>
          {post.tipper_message}
        </div>
      </div>
    );
  };

  render() {
    let { post, isDetailsPage } = this.props;

    let timeAgo = moment(post.created_at).fromNow();
    let total = utils.calculateTotalScore(post);

    return (
      <Container>
        <div className='header'>{total} SPICE&nbsp;&nbsp; 🌶️</div>
        {this.detailsBodyView()}
        {isDetailsPage ? (
          this.spicyDetails()
        ) : (
          <div className='footer'>
            <div>
              <Link route='details' params={{ permalink: post.permalink }}>
                <a>
                  <img src='../static/details.png' alt='' />
                  Details
                </a>
              </Link>
            </div>
            <Share url={`https://spice.network/details/${post.permalink}`} />
          </div>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  margin-bottom: 1rem;
  a {
    color: #ffffff;
    text-decoration: none;
  }

  video {
    width: 100% !important;
    height: auto !important;
  }
  video.vsc-initialized {
    width: 100%;
  }
  .replyingTo {
    border-left: 4px solid #2f44ff;
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
  .header {
    background: rgba(0, 0, 0, 0.76);
    padding: 0.4rem 1rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-weight: bold;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }
  .body {
    background: #faf8f8;
    padding: 1rem;
    font-weight: bold;
    font-size: 18px;
    color: #000000;
    .content {
      padding: 0.5rem 1rem;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      box-sizing: border-box;
    }
    .info {
      font-size: 12px;
      font-weight: bold;
      color: #6587ff;
      margin-bottom: 1rem;
      &.tipper {
        margin-bottom: 0.3rem;
      }
    }
    .message {
      word-break: break-word;
      overflow-wrap: break-word;
      img {
        margin: 0 auto;
        max-width: 100%;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #b5b5b5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: #ffffff;
    padding: 0.6rem;
    img {
      margin-right: 0.5rem;
    }
    div,
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
  .border {
    border: 1px solid #d7d7d7;
    padding: 1rem;
    font-weight: bold;
    .additional-tipper,
    .first-tipper {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      img {
        width: 40px;
        height: 40px;
        object-fit: contain;
        border-radius: 100%;
        margin-right: 1rem;
      }
    }
  }
  .details {
    background: rgba(255, 96, 96, 0.76);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: #ffffff;
    padding: 0.6rem;
    text-align: center;
    h2 {
      margin: 0;
      padding: 0;
    }
    h5 {
      margin: 0;
      padding-top: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .iframewrap {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
  }
  .iframewrap iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (min-width: 700px) {
    .links {
      display: grid;
      grid-column-gap: 3rem;
    }
  }

  @media (max-width: 500px) {
    .body {
      font-size: 13px;
      padding: 0.5rem;
    }
    .header {
      padding: 0.2rem 1rem;
    }
    .footer {
      padding: 0.4rem;
      font-size: 0.8rem;
    }
  }
`;

export default Tipcontainer;
