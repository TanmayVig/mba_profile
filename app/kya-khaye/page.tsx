"use client";
import React, { useEffect, useState } from "react";
import RestrauntForm from "../ui/forms/RestrauntForm";
import { Restraunt } from "@/app/lib/definitions";
import { getRestraunts, setRestraunts } from "@/app/lib/firebase";

// Haversine formula to calculate distance between two lat/lng points in km
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export default function KhanpanPage() {
  const [restrauntsList, setRestrauntsList] = useState<Restraunt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRestraunts();
      if (data && Array.isArray(data.restrauntsList)) {
        setRestrauntsList(data.restrauntsList);
      }
      setLoading(false);
    }
    fetchData();

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // Optionally handle error
          setUserLocation(null);
        }
      );
    }
  }, []);

  async function handleAddRestraunt(newRestraunt: Restraunt) {
    const updated = [...restrauntsList, newRestraunt];
    await setRestraunts({ restrauntsList: updated });
    setRestrauntsList(updated);
  }

  // Sort restaurants by distance if user location is available
  const sortedRestraunts = React.useMemo(() => {
    if (!userLocation) return restrauntsList;
    return [...restrauntsList].sort((a, b) => {
      const distA = getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        a.location.latitude,
        a.location.longitude
      );
      const distB = getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        b.location.latitude,
        b.location.longitude
      );
      return distA - distB;
    });
  }, [restrauntsList, userLocation]);

  return (
    <div className="min-h-screen px-2 pt-8">
      <div className="flex items-center justify-between max-w-xl pl-2">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-left">
          khanpan
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
          onClick={() => setShowForm(true)}
        >
          kuch naya mila?
        </button>
      </div>
      {showForm && (
        <RestrauntForm
          onSubmit={handleAddRestraunt}
          onClose={() => setShowForm(false)}
        />
      )}
      {loading ? (
        <div className="pl-2">Loading...</div>
      ) : (
        <div className="w-full max-w-xl pl-2 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Know More</th>
                <th className="px-4 py-2 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {sortedRestraunts.map((r, i) => {
                let remarkText = "";
                if (r.remark === "NA") {
                  remarkText = "N/A";
                } else if (r.remark === "G") {
                  remarkText = "Good";
                } else if (r.remark === "B") {
                  remarkText = "Bad";
                } else if (r.remark === "E") {
                  remarkText = "Excellent";
                }
                return (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2 font-semibold">{r.name}</td>
                    <td className="px-4 py-2 text-xs text-gray-600">
                      {r.location.latitude}, {r.location.longitude}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        Link
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-gray-200 rounded px-2 py-0.5 text-xs font-mono">
                          {remarkText}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
