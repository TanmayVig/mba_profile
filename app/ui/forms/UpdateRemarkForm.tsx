"use client";
import React, { useState } from "react";
import { Restraunt } from "@/app/lib/definitions";

interface UpdateRemarkFormProps {
  restraunt: Restraunt;
  onUpdate: (id: string, remark: Restraunt['remark']) => void;
  onClose: () => void;
}

export default function UpdateRemarkForm({
  restraunt,
  onUpdate,
  onClose,
}: Readonly<UpdateRemarkFormProps>) {
  const [remark, setRemark] = useState<Restraunt['remark']>(restraunt.remark);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs"
        onSubmit={e => {
          e.preventDefault();
          onUpdate(restraunt.id, remark);
          onClose();
        }}
      >
        <h2 className="text-lg font-bold mb-4">Update Remark for {restraunt.name}</h2>
        <div className="mb-4">
          {["NA", "G", "B", "E", "H"].map(val => (
            <label key={val} className="mr-4">
              <input
                type="radio"
                name="remark"
                value={val}
                checked={remark === val}
                onChange={() => setRemark(val as any)}
                className="mr-1"
              />
              {val}
            </label>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-3 py-1 rounded bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}