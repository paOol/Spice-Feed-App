import React, { Component } from 'react';
import styled from 'styled-components';

export default class Toggle extends Component {
  state = {
    checked: false
  };
  toggleChecked = () => {
    const { checked } = this.state;
    const { toggleState } = this.props;

    this.setState({ checked: !checked });
    toggleState();
  };

  render() {
    const { checked } = this.state;
    return (
      <ToggleContainer>
        <input type='checkbox' checked={checked ? true : ''} />
        <span className='slider' onClick={this.toggleChecked} />
      </ToggleContainer>
    );
  }
}

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.7rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 1.7rem;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 1.2rem;
    width: 1.2rem;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #f7861ce6;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.2rem);
    -ms-transform: translateX(1.2rem);
    transform: translateX(1.2rem);
  }
`;
