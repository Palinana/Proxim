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
    DialogDescription,
    DialogFooter
  } from "@/components/ui/dialog";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "../api/actions/updateProfile";

export default function ProfileClient({ user }) {
    const [firstName, setFirstName] = useState(user.first_name || "");
    const [lastName, setLastName] = useState(user.last_name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();
 
    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 10); // only 10 digits
        const part1 = digits.slice(0, 3);
        const part2 = digits.slice(3, 6);
        const part3 = digits.slice(6, 10);
      
        if (!part2) return part1;
        if (!part3) return `(${part1}) ${part2}`;
        return `(${part1}) ${part2}-${part3}`;
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
                            onClick={() => setOpen(true)}
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

                            {user.phone ? (
                                <span className="text-gray-700">{user.phone}</span>
                            ) : (
                                <span className="px-2 py-1 rounded-md bg-yellow-100 text-gray-500 text-sm font-medium">
                                Phone is not set
                                </span>
                            )}
                        </div>
                    </div>

                    {/* EDIT POPUP */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="bg-white shadow-lg rounded-2xl max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Edit Contact Info</DialogTitle>
                                <DialogDescription>
                                    Update your profile information.
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                action={(formData) => {
                                    startTransition(async () => {
                                    await updateProfile(formData);
                                    router.refresh(); 
                                    setOpen(false); // close modal after save
                                    });
                                }}
                                className="space-y-4"
                            >
                                {/* First Name */}
                                <div>
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input
                                    name="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input
                                    name="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                                    placeholder="(123) 456-7890"
                                    />
                                </div>

                                <DialogFooter className="pt-4">
                                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isPending}>
                                    {   isPending ? "Saving..." : "Save"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
