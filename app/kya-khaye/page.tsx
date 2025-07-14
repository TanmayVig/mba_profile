"use client";
import React, { useEffect, useState } from "react";
import RestrauntForm from "../ui/forms/RestrauntForm";
import UpdateRemarkForm from "../ui/forms/UpdateRemarkForm";
import { Restraunt, RestrauntFormData } from "@/app/lib/definitions";
import {
  getRestraunts,
  setRestraunts,
  updateRestraunt,
} from "@/app/lib/firebase";

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
  const [updateId, setUpdateId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRestraunts();
      if (data && Array.isArray(data.restrauntsList)) {
        setRestrauntsList(data.restrauntsList);
      }
      console.log("Fetched restaurants data:", data);
      setLoading(false);
    }
    fetchData();
    console.log("Fetching restaurants data...", restrauntsList);
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

  async function handleAddRestraunt(newRestraunt: RestrauntFormData) {
    const id = crypto.randomUUID(); // Generate a unique ID for the new restaurant
    const newRestrauntWithId: Restraunt = {
      ...newRestraunt,
      id,
    };
    const updated = [...restrauntsList, newRestrauntWithId];
    await setRestraunts({ restrauntsList: updated });
    setRestrauntsList(updated);
  }

  function handleUpdateRemark(id: string, newRemark: Restraunt["remark"]) {
    const restrauntToUpdate = restrauntsList.find((r) => r.id === id);
    const updatedList = restrauntsList.map((r) =>
      r.id === id ? { ...r, remark: newRemark } : r
    );
    setRestrauntsList(updatedList);
    if (!restrauntToUpdate) {
      throw new Error("Restraunt not found");
    }
    console.log("Updating restaurant:", id, newRemark);
    updateRestraunt(id, newRemark);
  }

  // Sort restaurants by distance if user location is available
  const sortedRestraunts = React.useMemo(() => {
    console.log(restrauntsList);
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
                <th className="px-4 py-2 text-left">Know More</th>
                <th className="px-4 py-2 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {sortedRestraunts.map((r) => {
                let remarkText = "";
                if (r.remark === "NA") remarkText = "N/A";
                else if (r.remark === "G") remarkText = "Good";
                else if (r.remark === "B") remarkText = "Bad";
                else if (r.remark === "E") remarkText = "Excellent";
                else if (r.remark === "H") remarkText = "Homely";
                console.log(r.id);
                return (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-2 font-semibold">{r.name}</td>
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
                      <div className="flex flex-wrap gap-1 items-center">
                        <span className="bg-gray-200 rounded px-2 py-0.5 text-xs font-mono">
                          {remarkText}
                        </span>
                        <button
                          className="ml-2 text-xs text-blue-600 underline"
                          onClick={() => setUpdateId(r.id)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {updateId && (
        <UpdateRemarkForm
          restraunt={restrauntsList.find((r) => r.id === updateId)!}
          onUpdate={handleUpdateRemark}
          onClose={() => setUpdateId(null)}
        />
      )}
    </div>
  );
}
