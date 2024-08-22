const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CrowdFundingModule", (m) => {
  const crowdFunding = m.contract("CrowdFunding", [], {});
  m.call(crowdFunding, "createCampaign", []);

  return { crowdFunding };
});
