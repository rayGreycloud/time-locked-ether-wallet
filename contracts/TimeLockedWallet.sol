pragma solidity 0.4.19;

import "./ERC20.sol";

contract TimeLockedWallet {
  // Define public variables (and getter methods)
  address public creator;
  address public owner;
  uint public unlockDate;
  uint public createdAt;
  
  // Restrict usage 
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
  
  // Constructor (must be same as contract name or else)
  function TimeLockedWallet(
    address _creator,
    address _owner,
    uint256 _unlockDate
  ) public {
    creator = _creator;
    owner = _owner;
    unlockDate = _unlockDate;
    createdAt = now;
  }
  
  // Keep all ether sent to this address - fallback function  
  function () payable public {
    Received(msg.sender, msg.value);
  }
  
  // Callable by owner only after specified lock time to transfer ether
  function withdraw() onlyOwner public {
    require(now >= unlockDate);
    // Send balance 
    msg.sender.transfer(this.balance);
    Withdrew(msg.sender, this.balance);
  }
  
  // Callable by owner only after specified lock time to transfer ERC20 tokens 
  function withdrawTokens(address _tokenContract) onlyOwner public {
    require(now >= unlockDate);
    ERC20 token = ERC20(_tokenContract);
    // Send token balance 
    uint256 tokenBalance = token.balanceOf(this);
    token.transfer(owner, tokenBalance);
    WithdrewTokens(_tokenContract, msg.sender, tokenBalance);
  }
  
  // Returns wallet info 
  function info() public view returns (address, address, uint256, uint256, uint256) {
    return (creator, owner, unlockDate, createdAt, this.balance);
  }
  
  // Events to create log entries
  event Received(address from, uint256 amount);
  event Withdrew(address to, uint256 amount);
  event WithdrewTokens(address tokenContract, address to, uint256 amount);  
}
