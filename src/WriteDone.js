import styled from "styled-components";
import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { ReactComponent as DSClabel } from "./images/dsc.svg";

export const WriteDone = ({ setMateId, queryControl, setQueryControl, setDogeSound, setIsWriteDone, mateId, dogeSound, receipt }) => {
  console.log(receipt);

  const toScope = (tx) => {
    const url = `https://scope.klaytn.com/tx/${tx}?tabId=inputData`;
    window.open(url, "_blank");
  };

  const closeFunc = () => {
    setIsWriteDone(false);
    setDogeSound("");
    setQueryControl(queryControl + 1);
    setMateId("");
  };

  return (
    <ModalBackground>
      <ModalBox>
        <Label>
          <DSClabel />
        </Label>
        <div className="box-profile">
          <img src={`https://storage.googleapis.com/dsc-mate/336/dscMate-${mateId}.png`} alt={mateId}></img>
        </div>
        <div className="box-body">
          <div className="box-header">
            <div className="mate-name">{`MATE #${mateId}${mateId === "5268" ? " 🍕" : ""}`}</div>
          </div>
          <div className="box-content">
            <div className="angle"></div>
            <p>{dogeSound}</p>
          </div>
          <div className="check-tx">
            <p className="block-number">{`#${receipt.blockNumber}`}</p>
            <p className="scope" onClick={() => toScope(receipt.transactionHash)}>
              블록체인에서 확인하기
            </p>
            <button className="close-button" onClick={closeFunc}>
              닫기
            </button>
          </div>
        </div>
      </ModalBox>
    </ModalBackground>
  );
};

export const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 1);

  .close-button {
    position: absolute;
    left: 50%;
    bottom: -2.5rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: 1px solid yellow;
    color: yellow;
    border-radius: 10px;
    background-color: transparent;
    transform: translateX(-50%);
    cursor: pointer;
  }
`;

export const Label = styled.div`
  /* opacity: 0; */
  @keyframes stamp {
    0% {
      width: 20rem;
      opacity: 0;
    }
    95% {
      width: 20rem;
      opacity: 0;
    }
    98% {
      width: 20rem;
      opacity: 0.9;
      rotate: 0deg;
    }
    100% {
      width: 7rem;
      opacity: 0.9;
    }
  }
  @keyframes stampMobile {
    0% {
      width: 10rem;
      opacity: 0;
    }
    95% {
      width: 10rem;
      opacity: 0;
    }
    98% {
      width: 10rem;
      opacity: 0.9;
      rotate: 0deg;
    }
    100% {
      width: 4rem;
      opacity: 0.9;
    }
  }

  /* animation-timing-function: ease; */

  @media all and (max-width: 799px) {
    position: absolute;
    top: 0rem;
    right: -1rem;
    transform-origin: center;
    z-index: 1000;
    svg {
      height: auto;
      rotate: 20deg;
      animation: stampMobile 1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }
  }
  @media all and (min-width: 800px) {
    position: absolute;
    top: -1rem;
    right: -1rem;
    transform-origin: center;
    z-index: 1000;
    svg {
      height: auto;
      rotate: 20deg;
      animation: stamp 1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }
  }
`;

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: var(--color-background); */
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
  line-height: 110%;

  @media all and (max-width: 799px) {
    width: 90%;
    height: 50%;
  }
  @media all and (min-width: 800px) {
    width: 70%;
    height: 50%;
    padding: 1rem;
  }

  .box-profile {
    /* height: 100%; */
    /* display: flex; */
    /* align-items: flex-start; */
    /* justify-content: center; */
    margin-top: 2rem;
    @media all and (max-width: 799px) {
      margin-right: 1rem;
    }
    @media all and (min-width: 800px) {
      margin-right: 2rem;
    }
    img {
      @media all and (max-width: 799px) {
        width: 2.5rem;
        height: auto;
        min-height: 2.5rem;
      }
      @media all and (min-width: 800px) {
        width: 7rem;
        height: auto;
        min-height: 7rem;
      }

      /* background-color: var(--color-background); */
      border-radius: 10000px;
      cursor: pointer;
    }
  }
  .box-header {
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
    div {
      @media all and (max-width: 799px) {
        font-size: 0.9rem;
      }
      @media all and (min-width: 800px) {
        font-size: 1.3rem;
      }
      color: yellow;
    }
    .mate-name {
      cursor: pointer;
    }
  }
  .box-body {
    flex: 1 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .box-content {
    position: relative;
    background-color: var(--color-box-header);
    padding: 1rem 1.5rem 0.75rem 1.5rem;
    border-radius: 10px;
    @media all and (max-width: 799px) {
      min-height: 5rem;
    }
    @media all and (min-width: 800px) {
      min-height: 7rem;
    }

    .angle::after {
      // 삼각형 부분
      @media all and (max-width: 799px) {
        border-top: 0.75rem solid transparent;
        border-right: 0.75rem solid var(--color-box-header);
        border-bottom: 0rem solid transparent;
        left: -0.73rem;
      }
      @media all and (min-width: 800px) {
        border-top: 1.3rem solid transparent;
        border-right: 1.3rem solid var(--color-box-header);
        border-bottom: 0rem solid transparent;
        left: -1.2rem;
      }

      position: absolute;
      content: "";
      height: 0;

      top: 0.75rem;
      width: 0;
      color: black;
    }

    p {
      word-break: break-all;
      width: 100%;
      height: 100%;
      overflow: auto;
      cursor: default;
      @media all and (max-width: 799px) {
        line-height: 150%;
        font-size: 0.8rem;
      }
      @media all and (min-width: 800px) {
        line-height: 150%;
        font-size: 1.2rem;
      }
    }
  }
  .check-tx {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 0.5rem;
    position: relative;
    .block-number {
      color: white;
      margin-bottom: 0.3rem;
      cursor: default;
      @media all and (max-width: 799px) {
        font-size: 0.8rem;
      }
      @media all and (min-width: 800px) {
      }
    }
    .scope {
      color: yellow;
      cursor: pointer;
      @media all and (max-width: 799px) {
        font-size: 0.8rem;
      }
      @media all and (min-width: 800px) {
      }
    }
  }
`;
