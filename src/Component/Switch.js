import React from "react";
import styled from "styled-components";

const Switch = ({ on, onSwitch }) => {
  return (
    <Style>
      <button onClick={onSwitch} className={on ? "on" : "off"}>
        <span />
      </button>
    </Style>
  );
};

const Style = styled.div`
  button {
    width: 80px;
    height: 40px;
    position: relative;
    background:  rgba(2, 79, 167, 0.538);
    border-radius: 50px;
    border: solid 1px #eee;
    outline: none;
    transition: background 0.4s;

    span {
      position: absolute;
      top: 4px;
      left: 5px;
      width: 30px;
      height: 30px;
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
        margin-left: -54px;
      }
    }

    &.on {
      background:  rgb(1, 61, 129);;
      span {
        left: 100%;
        margin-left: -33px;
      }
    }
  }
`;

export default Switch;
