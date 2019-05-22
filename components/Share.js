import React from 'react';
import styled from 'styled-components';

class Share extends React.Component {
  state = {
    isVisible: false
  };

  toggleVisibility = () => {
    this.setState({ isVisible: true });

    setTimeout(() => {
      this.setState({
        isVisible: false
      });
    }, 2000);
  };

  render() {
    const { isVisible } = this.state;
    let { url } = this.props;

    return (
      <Container
        onClick={() => {
          this.toggleVisibility();
          navigator.clipboard.writeText(url);
        }}
      >
        <img src='../static/share.png' alt='' />
        Share
        <span className={isVisible ? 'tooltiptext visible' : 'tooltiptext'}>
          Copied!
        </span>
      </Container>
    );
  }
}

const Container = styled.div`
  display: inline-block;
  bottom: 125%;
  position: relative;

  .tooltiptext {
    visibility: hidden;
    width: 100px;
    background-color: rgba(0, 0, 0, 0.76);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: -35px;
    margin-left: -50px;
  }

  .visible {
    visibility: visible;
  }
`;

export default Share;
