"use client";

export default function MobileStaffingToggle({ open, setOpen, children }) {
    return (
        <div className="md:hidden w-full">
            {open && (
                <div className="absolute inset-x-0 bottom-16 z-40">
                    <div className="mobile-staffing-panel border-t border-default bg-white h-[35vh] flex flex-col">
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
