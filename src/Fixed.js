import styled from "styled-components";
import { useEffect, useRef } from "react";

export const MakeDogeSound = ({ active, setActive }) => {
  const ref = useRef(null);
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
          <textarea placeholder="저의 개소리는요.."></textarea>
          <div className="tx-send">
            <button
              onClick={() => {
                console.log("ok");
              }}
            >
              준비중..
            </button>
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
  textarea {
    flex: 1 0 0;
    max-width: 600px;
    resize: none;
    padding: 1rem 1rem 2rem 1rem;
    background-color: var(--color-box-header);
    border: none;
    color: white;
    width: 100%;
    height: 5rem;
    outline: none;
    border-radius: 15px;
    line-height: 150%;
    margin: 0 0 1rem 0;
  }
  .subtitle {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
  }
  .description {
    font-size: 0.8rem;
    margin: 0 0 1rem 0;
  }
  .tx-send {
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      border: none;
      height: 1.5rem;
      width: 6rem;
      background-color: black;
      color: yellow;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;
