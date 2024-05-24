import React from 'react';

const SubmitButton = ({ onClick, btnTitle, loading, bgColor, style }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative cursor-pointer px-6 py-1 text-xl font-semibold text-white border-2 border-${bgColor}-600 hover:bg-${bgColor}-700 bg-${bgColor}-600 mx-auto rounded-full transition-transform duration-300 ease-in-out overflow-hidden group w-40 h-12`}
      style={style}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white mx-auto" />
      ) : (
        btnTitle
      )}
    </button>
  );
};

export default SubmitButton;