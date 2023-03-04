import logo from "./logo.svg";
import "./App.css";
import Caver from "caver-js";
import { useInfiniteQuery } from "react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { MakeDogeSound } from "./Fixed";

function App() {
  // const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");
  const caver = new Caver("wss://public-en-cypress.klaytn.net/ws");
  // const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");
  const [data, setData] = useState("");
  const [latestBlock, setLatestBlock] = useState();
  const [hasBlock, setHasBlock] = useState(false);
  const contract = caver.contract.create(
    [
      {
        constant: true,
        inputs: [],
        name: "mate",
        outputs: [
          {
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "mateName",
        outputs: [
          {
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "mateId",
            type: "uint256",
          },
          {
            name: "index",
            type: "uint256",
          },
        ],
        name: "record",
        outputs: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "message",
            type: "string",
          },
          {
            name: "blockNumber",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "interval",
            type: "uint256",
          },
        ],
        name: "setChangeInterval",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "mateId",
            type: "uint256",
          },
          {
            name: "message",
            type: "string",
          },
        ],
        name: "set",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "mateId",
            type: "uint256",
          },
        ],
        name: "lastMessage",
        outputs: [
          {
            name: "message",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "mateId",
            type: "uint256",
          },
        ],
        name: "remainBlocks",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
          {
            name: "",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "isOwner",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "uint256",
          },
          {
            name: "",
            type: "uint256",
          },
        ],
        name: "records",
        outputs: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "message",
            type: "string",
          },
          {
            name: "blockNumber",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "mateId",
            type: "uint256",
          },
        ],
        name: "recordCount",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "changeInterval",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            name: "_mate",
            type: "address",
          },
          {
            name: "_mateName",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "mateId",
            type: "uint256",
          },
          {
            indexed: true,
            name: "owner",
            type: "address",
          },
          {
            indexed: false,
            name: "name",
            type: "string",
          },
          {
            indexed: false,
            name: "message",
            type: "string",
          },
        ],
        name: "Set",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
    ],
    "0x1a693c175e510959f37d54acff0fac0dac8d9a2d"
  );
  const [active, setActive] = useState(false);

  // const subscribe = contract.subscribe("allEvents", function (error, event) {
  //   console.log(event);
  // });
  // const allEvents = contract.events.allEvents((e) => {
  //   console.log(e);
  // });
  const pastEvents = contract.getPastEvents("allEvents", { fromBlock: 114558433, toBlock: "latest" }).then((e) => e);

  const toDSC = (number) => {
    const url = `https://v3.dogesound.club/mates/${number}`;
    window.open(url, "_blank");
  };
  const toScope = (tx) => {
    const url = `https://scope.klaytn.com/tx/${tx}?tabId=inputData`;
    window.open(url, "_blank");
  };

  const fetch = async (block) => {
    let blockCount = block;
    let result = [];
    while (result.length < 20 && blockCount > 0) {
      await contract.getPastEvents("allEvents", { fromBlock: blockCount - 100000, toBlock: blockCount }).then((e) => {
        result = [...e, ...result];
      });
      blockCount -= 100000;
    }
    return { data: result.reverse(), lastBlock: blockCount };
  };

  caver.rpc.klay
    .getBlock("latest")
    .then((e) => {
      setLatestBlock(caver.utils.hexToNumber(e.number));
    })
    .then(() => setHasBlock(true));

  const dogeSounds = useInfiniteQuery(["dogeSounds"], ({ pageParam = latestBlock }) => fetch(pageParam), {
    getNextPageParam: (lastPage) => lastPage.lastBlock,
    refetchOnWindowFocus: false,
    enabled: hasBlock,
  });

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        // console.log("fetch");
        dogeSounds.fetchNextPage();
      }
    },
  });

  const skeletonHandler = () => {
    let temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push(
        <SkeletonUnit key={i}>
          <div className="box-profile">
            <div className="img-skeleton skeleton-animation"></div>
          </div>
          <div className="box-body">
            <div className="box-header">
              <div className="mate-name skeleton-animation"></div>
            </div>
            <div className="box-content">
              <div className="description skeleton-animation"></div>
            </div>
          </div>
        </SkeletonUnit>
      );
    }
    return temp;
  };

  return (
    <div className="App">
      <Header>
        <div>Doge Sound Collector</div>
        <p>"너의 개소리가 들려"</p>
      </Header>
      <MakeDogeSound active={active} setActive={setActive} />
      {dogeSounds.data?.pages
        ?.flatMap((flatMap) => flatMap.data)
        .map((map) => (
          <MsgUnit key={map.transactionHash}>
            <div className="box-profile">
              <img src={`https://storage.googleapis.com/dsc-mate/336/dscMate-${map.returnValues.mateId}.png`} alt={map.returnValues.mateId} onClick={() => toDSC(map.returnValues.mateId)}></img>
            </div>
            <div className="box-body">
              <div className="box-header">
                <div className="mate-name" onClick={() => toDSC(map.returnValues.mateId)}>{`MATE #${map.returnValues.mateId}${map.returnValues.name ? ` - ${map.returnValues.name}` : ""}`}</div>
              </div>
              <div className="box-content">
                <p>{map.returnValues.message}</p>
              </div>
              <div className="check-tx">
                <p onClick={() => toScope(map.transactionHash)}>블록체인에서 확인하기</p>
              </div>
            </div>
          </MsgUnit>
        ))}
      {dogeSounds.isFetching ? skeletonHandler() : ""}
      {dogeSounds.isFetching ? "" : <div className="cursor" ref={ref}></div>}
    </div>
  );
}

export default App;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  @media all and (max-width: 799px) {
    margin: 1rem 1rem 2rem 1rem;
  }
  @media all and (min-width: 800px) {
    margin: 1rem 1rem 3rem 1rem;
  }

  div {
    @media all and (max-width: 799px) {
      font-size: 2rem;
    }
    @media all and (min-width: 800px) {
      font-size: 4rem;
    }
  }
`;

const MsgUnit = styled.div`
  display: flex;

  background-color: var(--color-box-content);
  border-radius: 15px;
  padding: 1rem 1rem 1.5rem 1rem;
  max-width: 800px;
  transition: all 0.3s;

  @media all and (max-width: 799px) {
    width: 90%;
    margin-bottom: 1rem;
  }
  @media all and (min-width: 800px) {
    width: 100%;
    margin: 0 1rem 1rem 1rem;
  }

  &:hover {
    @media all and (min-width: 800px) {
      transform: scale(1.05);
      box-shadow: rgba(255, 255, 0, 0.5) 0px 0px 10px;
    }
  }
  .box-profile {
    margin-right: 1.5rem;
    img {
      width: 4rem;
      height: auto;
      min-height: 4rem;
      background-color: var(--color-background);
      border-radius: 1000px;
      cursor: pointer;
    }
  }
  .box-header {
    display: flex;
    margin-bottom: 0.5rem;
    div {
      font-size: 1.3rem;
      color: yellow;
    }
    .mate-name {
      cursor: pointer;
    }
  }
  .box-body {
    flex: 1 0 0;
  }
  .box-content {
    background-color: var(--color-box-content);
    p {
      line-height: 150%;
      word-break: break-all;
      width: 100%;
      cursor: default;
    }
  }
  .check-tx {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    p {
      color: yellow;
      cursor: pointer;
    }
  }
`;

const SkeletonUnit = styled.div`
  display: flex;
  margin: 0 1rem 1rem 1rem;
  background-color: var(--color-box-content);
  border-radius: 15px;
  padding: 1rem;
  /* width: 100%; */
  height: 7rem;
  width: 100%;
  max-width: 800px;

  .skeleton-animation {
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    background-image: linear-gradient(-90deg, var(--color-background), var(--color-box-header), var(--color-background));
    animation: gradient 2s ease infinite;
    background-size: 200% auto;
  }
  .box-profile {
    margin-right: 1.5rem;
    div {
      width: 4rem;
      height: 4rem;
      border-radius: 1000px;
    }
  }
  .box-header {
    display: flex;
    margin-bottom: 1rem;

    div {
      font-size: 1.3rem;
      color: yellow;
    }
    .mate-name {
      width: 7rem;
      height: 1.5rem;
      border-radius: 1000px;
    }
  }
  .box-body {
    flex: 1 0 0;
  }
  .box-content {
    background-color: var(--color-box-content);
    div {
      word-break: break-all;
      width: 100%;
      height: 1.5rem;
      border-radius: 1000px;
    }
  }
`;
