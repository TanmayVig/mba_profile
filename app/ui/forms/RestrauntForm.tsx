"use client";
import React, { useState } from "react";
import { RemarksEnum, RestrauntFormData } from "@/app/lib/definitions";

interface RestrauntFormProps {
  onSubmit: (data: RestrauntFormData) => void;
  onClose: () => void;
}

export default function RestrauntForm({
  onSubmit,
  onClose,
}: Readonly<RestrauntFormProps>) {
  const [name, setName] = useState("");
  const [latitudeLongitude, setLatitudeLongitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  const [link, setLink] = useState("");
  const [remarks, setRemarks] = useState<RemarksEnum>(RemarksEnum.NA);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      location: {
        latitude: parseFloat(latitudeLongitude.split(",")[0].trim()),
        longitude: parseFloat(latitudeLongitude.split(",")[1].trim()),
      },
      link,
      remark: remarks,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Restraunt</h2>
        <label className="block mb-2 font-medium">
          Name
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-2 mb-4">
          <label className="flex-1 font-medium">
            Coordinates
            <input
              className="w-full border rounded px-2 py-1 mt-1"
              value={latitudeLongitude}
              onChange={(e) => setLatitudeLongitude(e.target.value)}
              required
              type="string"
              step="any"
            />
          </label>
          {/* <label className="flex-1 font-medium">
            Longitude
            <input
              className="w-full border rounded px-2 py-1 mt-1"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              type="number"
              step="any"
            />
          </label> */}
        </div>
        <label className="block mb-2 font-medium">
          Google Maps Link
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            type="url"
          />
        </label>
        <label className="block mb-4 font-medium">
          Remarks
          <div className="flex gap-2 mt-1">
            {(Object.values(RemarksEnum) as RemarksEnum[]).map((val) => (
              <label key={val} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={val}
                  checked={remarks.includes(val)}
                  onChange={(e) => {
                    if (e.target.checked) setRemarks(val);
                  }}
                />
                {val}
              </label>
            ))}
          </div>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}
