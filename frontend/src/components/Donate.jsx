import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

const Donate = ({ state }) => {
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [donators, setDonators] = useState([]);
  const [donations, setDonations] = useState([]);
  const { campaignId } = useParams();
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!state.contract) return;

      try {
        const campaigns = await state.contract.getCampaigns();
        const campaignData = campaigns[campaignId];

        const deadlineInMs = Number(campaignData.deadline.toString()) * 1000;
        const deadlineDate = new Date(deadlineInMs);

        const currentTime = new Date();
        const daysLeft = Math.ceil(
          (deadlineDate - currentTime) / (1000 * 60 * 60 * 24)
        );

        const campaignDetails = {
          owner: campaignData.owner,
          title: campaignData.title,
          description: campaignData.description,
          target: ethers.formatEther(campaignData.target.toString()),
          deadline: deadlineDate.toLocaleDateString(),
          daysLeft,
          amountCollected: ethers.formatEther(
            campaignData.amountCollected.toString()
          ),
          image: campaignData.image
        };

        setCampaign(campaignDetails);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchCampaignDetails();
  }, [state.contract, campaignId]);

  const handleDonate = async () => {
    if (!state.contract || !state.signer) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      const tx = await state.contract.donateToCampaign(campaignId, {
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      alert("Donation successful!");
      fetchDonations(); // Update the donation list after a successful donation
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
      setAmount(""); // Reset the amount input field
    }
  };

  const fetchDonations = async () => {
    if (!state.contract) return;

    try {
      const [donatorAddresses, donationAmounts] =
        await state.contract.getDonators(campaignId);

      setDonators(donatorAddresses);
      setDonations(
        donationAmounts.map((amount) => ethers.formatEther(amount.toString()))
      );
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [state.contract, campaignId]);

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      {campaign ? (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {campaign.title}
            </h2>
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-400 mb-4">{campaign.description}</p>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm">Collected</p>
                <p className="text-lg font-bold">
                  {campaign.amountCollected} ETH
                </p>
                <p className="text-sm text-gray-400">
                  of {campaign.target} ETH
                </p>
              </div>
              <div>
                <p className="text-sm">Days Left</p>
                <p className="text-lg font-bold">{campaign.daysLeft}</p>
                <p className="text-sm text-gray-400">{campaign.deadline}</p>
              </div>
            </div>
          </div>

          {campaign.daysLeft > 0 ? (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">
                Donate to Campaign
              </h3>
              <div className="mb-4">
                <label className="block text-sm mb-2" htmlFor="amount">
                  Enter Amount (ETH)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 rounded bg-gray-900"
                  required
                />
              </div>
              <button
                onClick={handleDonate}
                className={`w-full p-2 rounded bg-blue-600 hover:bg-blue-700 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </div>
          ) : (
            <div className="text-center text-lg text-red-500 font-semibold">
              Campaign Ended
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">
              Previous Donations
            </h3>
            {donators.length === 0 ? (
              <p className="text-gray-400">No donations yet.</p>
            ) : (
              <ul className="space-y-2">
                {donators.map((donator, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-700 rounded"
                  >
                    <span className="text-gray-300">
                      {donator.slice(0, 6)}...{donator.slice(-4)}
                    </span>
                    <span className="text-white">{donations[index]} ETH</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">Loading campaign details...</div>
      )}
    </div>
  );
};

export default Donate;
