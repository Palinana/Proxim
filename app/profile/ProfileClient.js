"use client";

import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlinePencil } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

export default function ProfileClient({ user }) {
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [open, setOpen] = useState(false);

    const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

    const save = async () => {
        await fetch("/api/user/update-profile", {
          method: "POST",
          body: JSON.stringify({ email, phone }),
          headers: { "Content-Type": "application/json" },
        });
    
        setOpen(false);
        window.location.reload();
    };
    

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Top bar (same spacing as dashboard) */}
            <div className="border-b bg-background px-6 md:px-8 py-3">
                <h1 className="text-xl font-semibold">Profile</h1>
            </div>

            {/* Centered card */}
            <div className="flex flex-1 justify-center py-10">
                <div className="w-full max-w-3xl bg-white rounded-2xl p-8 shadow-sm">

                    {/* Header */}
                    <div className="flex flex-col items-center text-center">
                        <div className="h-24 w-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-3">
                            {initials}
                        </div>

                        <div className="text-2xl font-semibold">
                            {user.first_name} {user.last_name}
                        </div>

                        <div className="text-sm text-gray-500 capitalize">
                            {user.role}
                        </div>
                    </div>


                    {/* Contact Info */}
                    <div className="mt-8 border border-gray-200 bg-staffing-card rounded-xl p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setEditing(!editing)}
                        >
                        <HiOutlinePencil />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Contact Info</h2>

                        {/* Email */}
                        <div className="flex items-center gap-3 mb-3">
                            <HiOutlineMail className="text-gray-500" />
                            <span>{user.email}</span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3">
                            <HiOutlinePhone className="text-gray-500" />

                            {editing ? (
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Add phone number"
                                className="max-w-xs"
                            />
                            ) : user.phone ? (
                                <span className="text-gray-700">
                                    {user.phone}
                                </span>
                            ) : (
                                <span className="px-2 py-1 rounded-md bg-yellow-100 text-gray-500 text-sm font-medium">
                                    Phone is not set
                                </span>
                            )}
                        </div>

                        {editing && (
                            <div className="mt-4 flex gap-3">
                                <Button
                                onClick={() => {
                                    // TODO: save phone to DB
                                    setEditing(false);
                                }}
                                >
                                    Save
                                </Button>

                                <Button
                                variant="outline"
                                onClick={() => {
                                    setPhone(user.phone || "");
                                    setEditing(false);
                                }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
