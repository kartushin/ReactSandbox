import React, { Component } from "react";
import gotService from "../../services/gotServices";
import styled from "styled-components";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 0.25rem !important;
`;

const RandomHeading = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

const Term = styled.span`
  font-weight: bold;
`;

export default class RandomChar extends Component {
  gotService = new gotService();
  state = {
    char: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });
  };

  onError = (err) => {
    this.setState = {
      error: true,
      loading: false
    };
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    //const id = 130000;
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    console.log("render");
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <RandomBlock>
        {errorMessage}
        {spinner}
        {content}
      </RandomBlock>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  const borned = born || `unknown`;
  const dieding = died || `unknown`;
  const cultured = culture || `unknown`;
  return (
    <>
      <RandomHeading>Random Character: {name}</RandomHeading>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender </Term>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born </Term>
          <span>{borned}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died </Term>
          <span>{dieding}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{cultured}</span>
        </li>
      </ul>
    </>
  );
};
