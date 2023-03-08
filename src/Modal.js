import styled from "styled-components";

export const Modal = ({ setModalOpen, mateId, setMateId, mateList }) => {
  let dummy = [];
  for (let i = 0; i < 30; i++) {
    dummy.push(mateList[0]);
  }
  const selectMate = (id) => {
    setMateId(id);
    setModalOpen(false);
  };
  return (
    <ModalBackground>
      <ModalBox>
        <div className="header">메이트 고르기</div>
        <div className="mate-wrapper">
          {dummy &&
            dummy.map((map, idx) => (
              <div onClick={() => selectMate(map.tokenId)} className={`mate ${map.tokenId}`} key={`${map.tokenId}-${idx}`}>
                <p>
                  <img src={`https://storage.googleapis.com/dsc-mate/336/dscMate-${map.tokenId}.png`} alt={map.tokenId}></img>
                </p>
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
  padding: 1rem;
  line-height: 110%;
  @media all and (max-width: 799px) {
    width: 90%;
    height: 80%;
  }
  @media all and (min-width: 800px) {
    width: 70%;
    height: 60%;
  }
  .header {
    margin: 1rem 0 2rem 0;
    font-size: 1.5rem;
  }
  .mate-wrapper {
    display: grid;
    overflow-y: auto;
    @media all and (max-width: 799px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media all and (min-width: 800px) {
      grid-template-columns: repeat(4, 1fr);
    }
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    width: 100%;
  }
  .mate {
    margin: 0.5rem;
    border-radius: 10px;
    transition: all 0.3s;
    cursor: pointer;
    @media (hover: hover) {
      &:hover {
        @media all and (min-width: 800px) {
          transform: scale(1.1);
          box-shadow: rgba(255, 255, 0, 0.5) 0px 0px 10px;
        }
      }
    }
    img {
      height: auto;
      width: 100%;
      border-radius: 10px;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
    }
  }
`;
