const Web3 = require('web3');
const nftContractAbi = require('./transferAbi.json');

function initTransferMonitor() {
  try{
    console.log("start")
    const provider = new Web3.providers.WebsocketProvider('your websocket endpoint'
    ,{
      clientConfig: {
          keepalive: true,
          keepaliveInterval: 60000
      },
      reconnect: {
          auto: true,
          delay: 5000,
          maxAttempts: 5,
          onTimeout: false
      }
    });
    const web3 = new Web3(provider);
    const contractAddress = 'your smart contract address'; 
    const contractInstance = new web3.eth.Contract(nftContractAbi, contractAddress);

    contractInstance.events.Transfer({ fromBlock: 'latest' })
      .on('data', event => {
        const tokenId = event.returnValues.tokenId;
        const newOwner = event.returnValues.to;
        console.log(`Token ID: ${tokenId}, New Owner: ${newOwner}`);
      }).on('error', error => {
        console.error(error);
      }).on('close', () => {
        console.error("closed")
      }).on('end', () => {
        console.error("end")
      });
  }catch(e){
    console.error(e)
  }
}
initTransferMonitor();