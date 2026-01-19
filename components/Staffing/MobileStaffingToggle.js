"use client";

import { useState } from "react";

const MobileStaffingToggle = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Button */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <button
                    onClick={() => setOpen(!open)}
                    className="px-4 py-2 rounded bg-primary text-white shadow"
                >
                    {open ? "Hide Staffings" : "Show Staffings"}
                </button>
            </div>

            {/* Panel */}
            {open && (
                <div className="md:hidden absolute bottom-16 left-0 right-0 max-h-[60vh] overflow-y-auto bg-surface border-t border-default z-10">
                    {children}
                </div>
            )}
        </>
    );
};

export default MobileStaffingToggle;
