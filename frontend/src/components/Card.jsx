import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="relative flex-shrink-0 w-60 h-80 rounded-[15px] bg-zinc-900 text-white overflow-hidden shadow-lg mb-5">
      <div className="h-[40%] w-full">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover rounded-t-[15px]"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[60%]">
        <div>
          <h3 className="text-lg font-bold">{campaign.title}</h3>
          <p className="text-gray-400">
            {campaign.description.length > 50
              ? campaign.description.slice(0, 50) + "..."
              : campaign.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm">{campaign.amountCollected}</p>
            <p className="text-xs text-gray-400">Raised of {campaign.target}</p>
          </div>
          <div>
            <p className="text-sm">{campaign.daysLeft}</p>
            <p className="text-xs text-gray-400">Days Left</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-400">
            {campaign.owner.slice(0, 30)}...
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ state }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCampaigns = async () => {
      const { contract } = state;
      try {
        const allCampaigns = await contract.getCampaigns();
        const campaignData = allCampaigns.map((campaign, i) => {
          const deadlineInMs = Number(campaign.deadline.toString()) * 1000;
          const deadlineDate = new Date(deadlineInMs);

          const currentTime = new Date();
          const daysLeft = Math.ceil(
            (deadlineDate - currentTime) / (1000 * 60 * 60 * 24)
          );

          return {
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()),
            deadline: deadlineDate.toLocaleDateString(),
            daysLeft,
            amountCollected: ethers.formatEther(
              campaign.amountCollected.toString()
            ),
            image: campaign.image,
            pId: i
          };
        });
        setCampaigns(campaignData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    getCampaigns();
  }, [state.contract]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800">
        <p className="text-xl font-semibold text-white">loading...</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800">
        <p className="text-xl font-semibold text-white">Connect your wallet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.pId} campaign={campaign} />
      ))}
    </div>
  );
};

export default Card;
