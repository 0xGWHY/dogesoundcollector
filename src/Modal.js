import styled from "styled-components";
import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";

export const Modal = ({ contract, setActive, modalRef, modalOpen, setModalOpen, mateId, setMateId, mateList }) => {
  // let dummy = [];
  // for (let i = 0; i < 30; i++) {
  //   dummy.push(mateList[0]);
  // }
  const remainBlocks = useQueries(
    mateList.map((map) => {
      return {
        queryKey: ["remainBlock", map.tokenId],
        queryFn: () => {
          return contract.call("remainBlocks", map.tokenId).then((res) => ({ res: res, id: map.tokenId }));
        },
        refetchOnWindowFocus: false,
        refetchInterval: 1000,
      };
    })
    // {
    //   refetchOnWindowFocus: false,
    //   refetchInterval: 1000,
    // }
  );

  const selectMate = (id) => {
    if (remainBlocks.filter((filter) => filter.data.id === id)[0].data.res === "0") {
      setMateId(id);
      setModalOpen(false);
    }
  };

  const backgroundClick = (e) => {
    e.stopPropagation();
    if (modalOpen && !modalRef.current?.contains(e.target)) {
      setModalOpen(false);
    }
  };

  // console.log(remainBlocks.filter((filter) => filter.data.id === "5268")[0].data.res === "0");

  return (
    <ModalBackground onClick={(e) => backgroundClick(e)}>
      <ModalBox ref={modalRef}>
        <div className="header">메이트 고르기</div>
        <div className="mate-wrapper">
          {mateList &&
            mateList.map((map, idx) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  selectMate(map.tokenId);
                }}
                className={`mate ${map.tokenId} ${remainBlocks.filter((filter) => filter?.data?.id === map.tokenId)[0]?.data.res === "0" ? "" : "disabled"}`}
                key={`${map.tokenId}-${idx}`}
              >
                <p>
                  <img className={`${remainBlocks.filter((filter) => filter?.data?.id === map.tokenId)[0]?.data.res === "0" ? "" : "disabled"}`} src={`https://storage.googleapis.com/dsc-mate/336/dscMate-${map.tokenId}.png`} alt={map.tokenId}></img>
                </p>
                {remainBlocks.filter((filter) => filter?.data?.id === map.tokenId)[0]?.data.res === "0" || remainBlocks.filter((filter) => filter?.data?.id === map.tokenId)[0]?.data.res === undefined ? (
                  ""
                ) : (
                  <p className="remain-block">{remainBlocks.filter((filter) => filter?.data?.id === map.tokenId)[0]?.data.res}</p>
                )}
                <p>#{map.tokenId}</p>
              </div>
            ))}
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
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-box-header);
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* padding: 1rem; */
  line-height: 110%;

  @media all and (max-width: 799px) {
    width: 90%;
    height: 80%;
  }
  @media all and (min-width: 800px) {
    width: 70%;
    height: 80%;
  }
  .header {
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
  }
  .mate-wrapper {
    padding: 1rem;
    display: grid;
    overflow-y: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    @media all and (max-width: 799px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media all and (min-width: 800px) and (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media all and (min-width: 1201px) {
      grid-template-columns: repeat(5, 1fr);
    }
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    width: 100%;
  }
  .mate {
    margin: 0.5rem;
    border-radius: 10px;
    transition: all 0.3s;
    position: relative;
    cursor: pointer;
    @media (hover: hover) {
      &:hover {
        @media all and (min-width: 800px) {
          transform: scale(1.1);
          box-shadow: rgba(255, 255, 0, 0.5) 0px 0px 10px;
        }
      }
    }
    &.disabled:hover {
      transform: scale(1) !important;
      box-shadow: none !important;
      cursor: default !important;
    }
    img {
      height: auto;
      width: 100%;
      border-radius: 10px;
      &.disabled {
        filter: grayscale(100%);
      }
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
    }
  }
  .remain-block {
    position: absolute;
    background-color: lightgray;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid red;
    padding: 0.2rem 1rem 0.2rem 1rem;
    color: red;
    font-weight: 500;
    font-size: 1.2rem !important;
  }
`;
