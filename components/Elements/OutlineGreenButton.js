import React from "react";

const OutlineButton = ({ children, onClick, className = "", type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                inline-flex items-center gap-2
                px-3 py-1.5
                text-sm font-medium
                text-green-600
                border border-green-600
                rounded
                hover:bg-green-600 hover:text-white
                transition
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default OutlineButton;
