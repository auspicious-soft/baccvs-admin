"use client";
import React, { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

export default function PromotionModal() {
  const [showModal, setShowModal] = useState(true);
  const [priority, setPriority] = useState("Featured Event");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState([18, 70]);
  const [subscription, setSubscription] = useState("Elite");
  const [music, setMusic] = useState("Underground");
  const [loading, setLoading] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    // This is the cleanup function
    document.body.style.overflow = "auto";
  };
}, [showModal]);

  const handleStartPromotion = async () => {
    setLoading(true);
    const values = { priority, gender, ageRange: age, subscription, music };
    console.log("Promotion Settings:", values);
    await new Promise((res) => setTimeout(res, 2000)); // simulate API call
    setLoading(false);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-[#120a1f] text-white rounded-2xl p-6 w-[90%] max-w-lg space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-2">
          Priority Placement
        </h2>

        {/* Priority Placement */}
        <div>
          <p className="mb-2 text-sm text-gray-300">Priority Placement</p>
          <div className="flex gap-3">
            {["Top Banner", "Featured Event"].map((opt) => (
              <button
                key={opt}
                onClick={() => setPriority(opt)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  priority === opt
                    ? "border-[#8B5CF6] bg-[#2b1e45]"
                    : "border-gray-600 bg-[#1b1130]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <p className="mb-2 text-sm text-gray-300">Gender to reach</p>
          <div className="flex gap-3 flex-wrap">
            {["Female", "Male", "Every One"].map((opt) => (
              <button
                key={opt}
                onClick={() => setGender(opt)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  gender === opt
                    ? "border-[#8B5CF6] bg-[#2b1e45]"
                    : "border-gray-600 bg-[#1b1130]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div>
          <p className="mb-2 text-sm text-gray-300">Age range</p>
          <input
            type="range"
            min="18"
            max="70"
            value={age[0]}
            onChange={(e) => setAge([+e.target.value, age[1]])}
            className="w-full accent-[#8B5CF6]"
          />
          <input
            type="range"
            min="18"
            max="70"
            value={age[1]}
            onChange={(e) => setAge([age[0], +e.target.value])}
            className="w-full accent-[#8B5CF6] mt-2"
          />
          <p className="text-xs text-gray-400 mt-1">
            {age[0]} years - {age[1]} years
          </p>
        </div>

        {/* Subscription */}
        <div>
          <p className="mb-2 text-sm text-gray-300">Subscription</p>
          <div className="flex gap-3 flex-wrap">
            {["Basic", "Elite", "Prestige"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSubscription(opt)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  subscription === opt
                    ? "border-[#8B5CF6] bg-[#2b1e45]"
                    : "border-gray-600 bg-[#1b1130]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Music Interest */}
        <div>
          <p className="mb-2 text-sm text-gray-300">Music interest</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Underground",
              "Disco/Funk/soul",
              "Hip-hop / R&B",
              "Tech-House",
              "House",
              "Commercial",
              "Afrovibe",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => setMusic(opt)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  music === opt
                    ? "border-[#8B5CF6] bg-[#2b1e45]"
                    : "border-gray-600 bg-[#1b1130]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Start Promotion Button */}
        <button
          onClick={handleStartPromotion}
          disabled={loading}
          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-full flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Starting...
            </>
          ) : (
            "Start Promotion"
          )}
        </button>
      </div>
    </div>
  );
}

