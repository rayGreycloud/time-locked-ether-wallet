const TimeLockedWallet = artifacts.require("./TimeLockedWallet.sol");
const TikiToken = artifacts.require("./TikiToken.sol");

// Initialize variables 
let ethToSend = web3.toWei(1, "ether");
let someGas = web3.toWei(0.01, "ether");
let creator;
let owner;
let other; 

contract('TimeLockedWallet', (accounts) => {
  // Set up testing accounts before each test
  before(async () => {
    creator = accounts[0];
    owner = accounts[1];
    other = accounts[2];
  });
  
  it("should not allow anyone to withdraw funds before unlock date", async () => {
    
  });
  
  it("should allow owner to withdraw funds after unlock date", async () => {
    
  });
  
  it("should not allow others to withdraw funds after unlock date", async () => {
    
  });
  
  it("should not allow anyone to withdraw token before unlock date", async () => {
    
  });
  
  it("should allow owner to withdraw token after unlock date", async () => {
    
  });
  
  it("should not allow others to withdraw token after unlock date", async () => {
    
  });
  
  it("should allow anyone to get info about wallet", async () => {
    
  });  
});