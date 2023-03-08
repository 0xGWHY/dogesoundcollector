import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ReactComponent as Kaikas } from "./images/kaikas-logo.svg";

export const MakeDogeSound = ({ setModalOpen, mateId, setMateId, mateList, setMateList, account, setAccount, contract, contractMain, active, setActive }) => {
  const ref = useRef(null);
  const klaytn = window.klaytn;

  const connectWalletFunc = async () => {
    const address = await klaytn.enable();
    setAccount(address[0]);

    axios
      .get(`https://backend.webplus.one/klaytn/nfts?holder=${address[0]}`)
      .then((ele) => {
        setMateList(ele.data.filter((filter) => filter.address === "0xE47E90C58F8336A2f24Bcd9bCB530e2e02E1E8ae"));
      })
      .then(() => {
        setModalOpen(true);
      });
  };

  const writeDogeSound = async () => {};

  const menuHandler = (e) => {
    if (active && !ref.current?.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      menuHandler(e);
    });
    return window.removeEventListener("click", (e) => {
      menuHandler(e);
    });
  }, [active]);

  return (
    <Fixed
      ref={ref}
      active={active}
      isConnected={account.length !== 0}
      onClick={() => {
        if (!active) {
          setActive(true);
        }
      }}
    >
      {active ? (
        <>
          <div className="subtitle">나도 개소리 싸보기 🐶</div>
          <div className="description">클레이튼 블록체인에 기록되기 때문에 수정, 삭제가 불가능해. 알고있지?</div>
          <div className="body">
            <div className="profile-area">
              {mateId ? <img className="mate-image" src={`https://storage.googleapis.com/dsc-mate/336/dscMate-${mateId}.png`}></img> : <div className="mate-image"></div>}
              <div className="mate-id">{mateId}</div>
            </div>
            <div className="msg-area">
              <div className="angle"></div>
              <textarea className="msg-box" placeholder="저의 개소리는요.."></textarea>
              <div className="tx-send">
                {account ? (
                  <button
                    onClick={() => {
                      writeDogeSound();
                    }}
                  >
                    왈왈!!
                  </button>
                ) : (
                  //   <button
                  //     onClick={() => {
                  //       connectWalletFunc();
                  //     }}
                  //   >
                  //     <Kaikas />
                  //     <span>Connect to Kaikas</span>
                  //   </button>
                  <button>준비중</button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        "왈왈!!"
      )}
    </Fixed>
  );
};

const Fixed = styled.div`
  /* background-color: #5215fc; */
  position: fixed;
  bottom: 0;
  z-index: 90;
  background-color: var(--color-box-content);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.active ? "flex-start" : "center")};
  align-items: center;
  height: ${(props) => (props.active ? "20rem" : "2.5rem")};
  color: ${(props) => (props.active ? "white" : "yellow")};
  font-size: 1.2rem;
  border-top: 2px solid yellow;

  @media all and (max-width: 799px) {
    padding: 1rem;
  }
  @media all and (min-width: 800px) {
    padding: 1rem 0 1rem 0;
  }
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  transition: height 0.3s;

  .body {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    flex: 1 0 0;
    width: 100%;
  }

  .profile-area {
    .mate-image {
      background-color: var(--color-box-header);
      border-radius: 15px;
      width: 6rem;
      height: auto;
      min-height: 6rem;
      margin-bottom: 0.5rem;
    }
    .mate-id {
      height: 1.5rem;
      width: 100%;
      background-color: var(--color-box-header);
      border-radius: 15px;
    }
  }

  .msg-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    position: relative;
    .angle::after {
      // 삼각형 부분
      position: absolute;
      border-top: 0.75rem solid transparent;
      border-right: 0.75rem solid var(--color-box-header);
      border-bottom: 0.75rem solid transparent;
      content: "";
      height: 0;
      left: -0.75rem;
      top: 2rem;
      width: 0;
      color: black;
    }
    .msg-box {
      flex: 1 0 0;
      resize: none;
      padding: 1rem 1rem 2rem 1rem;
      background-color: var(--color-box-header);
      border: none;
      color: white;
      width: 100%;
      /* height: 100%; */
      outline: none;
      border-radius: 15px;
      line-height: 150%;
      margin: 0 0 1rem 0;
    }
  }

  .subtitle {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
  }
  .description {
    font-size: 0.8rem;
    margin: 0 0 2rem 0;
  }
  .tx-send {
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      border: none;
      height: 2rem;
      /* height: 1.5rem; */
      padding: 0.5rem 2rem 0.5rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      /* width: 6rem; */
      background-color: ${(props) => (props.isConnected ? "var(--color-box-header)" : "#3366ff")};
      color: ${(props) => (props.isConnected ? "yellow" : "white")};
      border: ${(props) => (props.isConnected ? "solid 1px yellow" : "none")};
      border-radius: calc(2rem * 0.35);
      font-weight: 500;
      cursor: pointer;
      svg {
        height: 1rem;
        width: auto;
        margin-right: calc(2rem * 0.35);
      }
    }
  }
`;
