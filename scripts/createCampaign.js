const hre = require("hardhat");

async function main() {
  // Load the module
  const module = require("../ignition/modules/CrowdFunding"); // Adjust the path

  // Get the contract instance
  const { crowdFunding } = module;

  // Use Hardhat's built-in ethers provider
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  // Define the parameters for the campaign
  const owner = deployer.address;
  const title = "New Campaign Title";
  const description = "Description of the campaign";
  const target = hre.ethers.parseEther("10.0"); // Target amount in ETH
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 1 week from now
  const image = "https://example.com/image.png";

  // Deploy the contract if it's not deployed yet
  //   if (!crowdFunding.address) {
  //     const CrowdFundingFactory = await hre.ethers.getContractFactory(
  //       "CrowdFunding"
  //     );
  //     const crowdFundingContract = await CrowdFundingFactory.deploy();
  //     await crowdFundingContract.deployed();
  //     console.log("CrowdFunding deployed to:", crowdFundingContract.address);
  //   }

  // Create a campaign
  try {
    const tx = await crowdFunding.createCampaign(
      owner,
      title,
      description,
      target,
      deadline,
      image
    );
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Campaign created successfully!");
  } catch (error) {
    console.error("Error creating campaign:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
