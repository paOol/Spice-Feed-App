import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';

let base = `https://res.cloudinary.com/spicefeed/image/upload/v1556245960/media/`;

class Leaderboardcontainer extends React.Component {
  format(item) {
    const { type } = this.props;
    let amount;
    if (type === 'received') {
      amount = item.total_received;
    }
    if (type === 'tipped') {
      amount = item.total_tipped;
    }

    let precision = new BigNumber(`${amount}e-8`).toPrecision();
    return this.formatToCommas(precision);
  }

  formatToCommas(string) {
    let number = parseFloat(string);
    let formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8
    }).format(number);
    return formatted;
  }

  render() {
    let { item, position } = this.props;

    return (
      <Container>
        {position + 1}
        <img src={`${base}/${item.mediapath}`} alt='' />
        <div className='username'>{item.username}</div>
        <div className='amount'>🌶️&nbsp;&nbsp;{this.format(item)}</div>
      </Container>
    );
  }
}

const Container = styled.div`
  margin-bottom: 1rem;

  font-size: 18px;
  display: grid;
  grid-template-columns: 2.3rem 50px 1fr 1fr;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 100%;
  }
  .username {
    background: #ffffff;
    box-sizing: border-box;
  }
  .amount {
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

export default Leaderboardcontainer;
