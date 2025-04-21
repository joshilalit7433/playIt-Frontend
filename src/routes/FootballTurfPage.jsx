import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SportsListFilter from "../components/SportsListFilter.jsx";
import { TURF_API_END_POINT } from "../utils/constant.js";

const FootballTurfPage = () => {
  const { sport } = useParams(); // sport will be "football" based on the routing setup
  const [turfs, setTurfs] = useState([]);
  const [filters, setFilters] = useState({
    Location: "",
    Sports: sport,
    Price: "",
  });
  const navigate = useNavigate();

  // Function to normalize location (strip "East", "West", etc.)
  const normalizeLocation = (location) => {
    return location.split(" ")[0].toLowerCase(); // Extract base location
  };

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        // Filter only football turfs from the API response
        const approvedTurfs = response.data.turfs.filter(
          (turf) =>
            turf.state === true &&
            turf.sports_type &&
            turf.sports_type.toLowerCase() === "football"
        );
        setTurfs(approvedTurfs);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleFilterChange = (updatedFilters) => {
    setFilters({ ...updatedFilters, Sports: sport });
  };

  const handleTurfClick = (turf) => {
    navigate(`/turfs/${turf._id}`, { state: { turf } });
  };

  // Function to check if the turf price falls within the selected range
  const isPriceInRange = (price, range) => {
    if (!range) return true; // No filter applied
    const [min, max] = range.split("-").map(Number); // Split range into min and max values
    return price >= min && price <= max;
  };

  const filteredTurfs = turfs.filter((turf) => {
    const matchesLocation =
      !filters.Location ||
      normalizeLocation(turf.location) === normalizeLocation(filters.Location);
    const matchesPrice = isPriceInRange(turf.price, filters.Price); // Check if price is in the selected range
    return matchesLocation && matchesPrice; // Sports filter is redundant since the turfs are already filtered for football
  });

  return (
    <div className="mt-[65px] lg:mt-20 px-4 lg:mb-20">
      {/* Filter Component */}
      <div className="lg:w-[200px] lg:fixed lg:top-20">
        <SportsListFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Turfs Display */}
      <div className="lg:ml-[210px]">
        <h1 className="text-center text-2xl lg:text-3xl font-semibold mb-6 capitalize">
          Football Turfs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTurfs.map((turf) => (
            <div
              key={turf._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleTurfClick(turf)}
            >
              <img
                src={turf.images}
                alt={`${turf.name} turf`}
                className="w-full h-40 lg:h-60 object-cover"
                onError={(e) => (e.target.src = "./images/placeholder.jpg")}
              />
              <div className="p-4 text-center">
                <p className="text-lg lg:text-xl font-bold capitalize">
                  {turf.name}
                </p>
                <p className="text-gray-600 text-sm lg:text-base mt-1">
                  <strong>Location:</strong> {turf.location || "N/A"}
                </p>
                <p className="text-gray-600 text-sm lg:text-base mt-1">
                  <strong>Sport:</strong> {turf.sports_type || "N/A"}
                </p>
                <p className="text-gray-700 text-sm lg:text-base mt-2 font-semibold">
                  <strong>Price:</strong> ₹{turf.price || "N/A"} per hour
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FootballTurfPage;
