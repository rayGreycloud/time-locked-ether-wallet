const TimeLockedWallet = artifacts.require("./TimeLockedWallet.sol");
const TikiToken = artifacts.require("./TikiToken.sol");

// Initialize variables 
let ethToSend = web3.toWei(1, "ether");
let someGas = web3.toWei(0.01, "ether");
let amountOfTokens = 1000000000;
let creator;
let owner;
let other; 

async function createAndLoadWallet(creator, owner, unlockDate) {
  let timeLockedWallet = await TimeLockedWallet.new(creator, owner, unlockDate);
  await timeLockedWallet.send(ethToSend, {from: creator});
  let tikiToken = await TikiToken.new({from: creator});
  await tikiToken.transfer(timeLockedWallet.address, amountOfTokens, {from: creator});
}

contract('TimeLockedWallet', (accounts) => {
  // Set up testing accounts before each test
  before(async () => {
    creator = accounts[0];
    owner = accounts[1];
    other = accounts[2];
    
    const futureDate = Math.floor(new Date(2018, 12, 31) / 1000);
    const pastDate = Math.floor(new Date(2017, 12, 31) / 1000);
  });
  
  it("should not allow anyone to withdraw funds before unlock date", async () => {
    createAndLoadWallet(creator, owner, futureDate);
    
    try {
      await timeLockedWallet.withdraw({from: owner});
      assert(false, "Expected error not received");
    } catch (error) {} // expected
    
    try {
      await timeLockedWallet.withdraw({from: creator});
      assert(false, "Expected error not received");
    } catch (error) {} // expected
        
    try {
      await timeLockedWallet.withdraw({from: other});
      assert(false, "Expected error not received");
    } catch (error) {} // expected
    
    assert(ethToSend == await web3.eth.getBalance(timeLockedWallet.address));
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