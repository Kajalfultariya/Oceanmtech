import React from "react";
import styled from "styled-components";

const Switch1 = ({ on, onSwitch }) => {
  return (
    <Style>
      <button onClick={onSwitch} className={localStorage.getItem("ptype") === "Post" ? "on" : "off"}>
        <span />
      </button>
    </Style>
  );
};

const Style = styled.div`
  button {
    width: 60px;
    height: 27px;
    position: relative;
    background:  rgba(2, 79, 167, 0.538);
    border-radius: 50px;
    border: solid 1px #eee;
    outline: none;
    transition: background 0.4s;

    span {
      position: absolute;
      top: 2px;
      left: 5px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 40px;
      transition: all 0.2s cubic-bezier(0, 0, 0.46, 1.82);
      transition: all 0.2s cubic-bezier(0.24, 1.74, 0.92, 0.85);
    }

    &:active {
      span {
        width: 50px;
      }

      &.on span {
        margin-left: -74px;
      }
    }

    &.on {
      background:  rgb(1, 61, 129);;
      span {
        left: 100%;
        margin-left: -23px;
      }
    }
  }
`;

export default Switch1;
