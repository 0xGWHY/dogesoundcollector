import logo from "./logo.svg";
import "./App.css";
import Caver from "caver-js";
import { useInfiniteQuery } from "react-query";
import { useState } from "react";

function App() {
  // const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");
  const caver = new Caver("wss://public-en-cypress.klaytn.net/ws");
  const [blockNumber, setBlockNumber] = useState(0);
  caver.rpc.klay.getBlock("latest").then((e) => setBlockNumber(caver.utils.hexToNumber(e.number)));
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
  const subscribe = contract.subscribe("allEvents", function (error, event) {
    console.log(event);
  });
  const allEvents = contract.events.allEvents((e) => {
    console.log(e);
  });
  const pastEvents = contract.getPastEvents("allEvents", { fromBlock: 114558433, toBlock: "latest" }).then((e) => e);

  // const query = useInfiniteQuery(
  //   ["logs"],
  //   async ({ pageParam = 1 }) => {
  //     let result = [];
  //     let tempBlockNumber = blockNumber;
  //     while (result.length < 21) {
  //       console.log(tempBlockNumber);
  //       let temp = contract.getPastEvents("allEvents", { fromBlock: tempBlockNumber - 1000, toBlock: tempBlockNumber });
  //       console.log(temp);
  //       result = [...temp, ...result];
  //       tempBlockNumber = tempBlockNumber - 1001;
  //     }
  //     setBlockNumber(tempBlockNumber);
  //     return { data: result, nextPage: pageParam + 1 };
  //   },
  //   { getNextPageParam: (lastPage) => lastPage.nextPage }
  // );

  // let tempBlockNumber = blockNumber;
  // if (tempBlockNumber !== 0) {
  //   let result = [];
  //   while (result.length < 21) {
  //     let temp = [];
  //     contract.getPastEvents("allEvents", { fromBlock: tempBlockNumber - 10000, toBlock: tempBlockNumber }).then((e) => {
  //       console.log(e);
  //       temp = [...e];
  //     });
  //     tempBlockNumber = tempBlockNumber - 10001;
  //     result = [...temp, ...result];
  //   }
  // }
  let tempBlockNumber = blockNumber;
  if (tempBlockNumber > 0) {
    let result = [];
    while (result.length < 21) {
      console.log(tempBlockNumber);
      contract.getPastEvents("allEvents", { fromBlock: tempBlockNumber - 10000, toBlock: tempBlockNumber }).then((e) => {
        result = [...e, ...result];
      });
      tempBlockNumber = tempBlockNumber - 10001;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
