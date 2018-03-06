let TimeLockedWalletFactory = artifacts.require("TimeLockedWalletFactory");
let TikiToken = artifacts.require("TikiToken");

module.exports = function(deployer) {
  deployer.deploy(TimeLockedWalletFactory);
  deployer.deploy(TikiToken);
};
