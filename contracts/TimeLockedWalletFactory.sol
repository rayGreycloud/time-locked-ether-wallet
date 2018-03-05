pragma solidity 0.4.19;

import "./TimeLockedWallet.sol";

contract TimeLockedWalletFactory {
  // Create mapping of owner address to array of owner's wallets
  mapping(address => address[]) wallets;
  
  // Get user's wallets
  function getWallets(address _user)
    public
    view
    returns(address[])
  {
    return wallets[_user];
  }
  
  function newTimeLockedWallet(address _owner, uint256 _unlockDate)
    payable
    public 
    returns(address wallet)
  {
    // Create new wallet 
    wallet = new TimeLockedWallet(msg.sender, _owner, _unlockDate);
    
    // Add wallet to sender's wallets 
    wallets[msg.sender].push(wallet);
    
    // If sender != owner then add wallet to owner's 
    if (msg.sender != _owner) {
      wallets[_owner].push(wallet);
    }
    
    // Send ether from transaction to created contract 
    wallet.transfer(msg.value);
    
    // Emit event 
    Created(wallet, msg.sender, _owner, now, _unlockDate, msg.value);
  }
  
  // Prevents accidental ether transfer to factory 
  function () public {
    revert();
  }
  
  // Define Created event  
  event Created(
    address wallet, 
    address from,
    address to,
    uint256 createdAt,
    uint256 unlockDate,
    uint256 amount
  );
}
