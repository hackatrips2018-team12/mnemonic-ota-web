// Hardcoded constants:
const contractAddress = "0x1012b627b910e13739b466be1313afa954b77101";
const otaAddress = "0xbcDda8a84852dC328f90c4E881B3AC30D6a7AC51";
const otaPrivateKey = "cc343a48408ac9c8172d8507fd686364279db418af3ed764964f3a0cb2da3dc0";
const blockChainNodeUrl = "https://ropsten.infura.io";
const ipfsHost = "ipfs.infura.io";
const ipfsPort = 5001;

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import mnemonicABI from '../contracts/MnemonicVault.json';

var mnemonicContract = web3.eth.contract(mnemonicABI.abi);
var mnemonic = mnemonicContract.at(contractAddress);

const ipfsAPI = require('ipfs-api');
const ethUtil = require('ethereumjs-util');
const ipfs = ipfsAPI({host: ipfsHost, port: ipfsPort, protocol: 'http'})


window.App = {
  start: function() {
    var self = this;

    $("#mnemonic-icon").click(function() {
	$("#mnemonic-address").val(contractAddress);
	$("#mnemonic-container").toggle();
    });

    $("#mnemonic-form").submit(function(event) {
      let params = {
          "document-name": "Hotel Mercure París (2 nights)",
	  "document-key": "MER-1",
	  "issuer-name": "OTA",
	  "expiration-time": "",
 	  "offchain-url": "https://ipfs.io/ipfs/ab32567982c",
      };	  
      addDocumentByOTA(params);
      event.preventDefault();
    });      
      
  }
};

function addDocumentByUser(params) {
  console.log("Add document with pararms: " + params);
    
  let expiration_time = Math.round(new Date() / 1000) + (parseInt(params["expiration-time"]) * 24 * 60 * 60);
   
  var code = mnemonic.addDocument.getData(
    params["document-name"],
    params["document-key"],
    params["issuer-name"],
    expiration_time,
    params["offchain-url"]);
    
  web3.eth.sendTransaction({to: contractAddress, from: web3.eth.accounts[0], data: code}, function(err, txHash) {
      if (!err) {
        console.log("Tx done! https://ropsten.etherscan.io/tx/" + txHash);
        $("#msg").html("Great! Your voucher <a href='https://ropsten.etherscan.io/tx/" + txHash + "'>has been saved</a> in your Mnemonic Vault");
        $("#msg").show();  
      }
    });    
}

function addDocumentByOTA(params) {
  console.log("Add document with pararms: " + params);
    
  let expiration_time = Math.round(new Date() / 1000) + (parseInt(params["expiration-time"]) * 24 * 60 * 60);
   
  var code = mnemonic.addDocument.getData(
    params["document-name"],
    params["document-key"],
    params["issuer-name"],
    expiration_time,
    params["offchain-url"]);

  var Tx = require('ethereumjs-tx');
  var privateKey = new Buffer(otaPrivateKey, 'hex')

  web3.eth.getTransactionCount(otaAddress, function(err, result) {
      if (!err) {	
	
  var rawTx = {
    nonce: result,
    gasPrice: '0x9502F9000', // 40000000000 (40 Gwei)
    gasLimit: '0x61A80', // 400000
    to: contractAddress, 
    value: '0x00', 
    data: code
  }

  var tx = new Tx(rawTx);
  tx.sign(privateKey);

  var serializedTx = tx.serialize();


  web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, txHash) {
    if (!err)
      console.log("Tx done! https://ropsten.etherscan.io/tx/" + txHash);
      $("#msg").html("Great! Your voucher <a href='https://ropsten.etherscan.io/tx/" + txHash + "'>has been saved</a> in your Mnemonic Vault");
      $("#msg").show();  
    }
  );
  
      } else {
	  console.error(err);
      }
  });    
}

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("Using blockchain node: " + blockChainNodeUrl);
    window.web3 = new Web3(new Web3.providers.HttpProvider(blockChainNodeUrl));
  }
        
  App.start();
});
