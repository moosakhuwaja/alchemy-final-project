import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

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

  useEffect(() => {
    console.log("Updated campaigns:", campaigns);
  }, [campaigns]);

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (campaigns.length === 0) {
    return <div>No campaigns found.</div>;
  }
  return (
    <div className="relative flex-shrink-0 w-60 h-80 rounded-[15px] bg-zinc-900 text-white overflow-hidden shadow-lg mb-5">
      <div className="h-[40%] w-full">
        <img
          src={campaigns[4].image}
          alt={campaigns[4].title}
          className="w-full h-full object-cover rounded-t-[15px]"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[60%]">
        <div>
          <h3 className="text-lg font-bold">{campaigns[4].title}</h3>
          <p className="text-gray-400">{campaigns[4].description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm">{campaigns[4].amountCollected}</p>
            <p className="text-xs text-gray-400">
              Raised of {campaigns[4].target}
            </p>
          </div>
          <div>
            <p className="text-sm">{campaigns[4].daysLeft}</p>
            <p className="text-xs text-gray-400">Days Left</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-400">
            {campaigns[4].owner.slice(0, 30)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
