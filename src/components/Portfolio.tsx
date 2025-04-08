import React from "react";

function Portfolio() {
  return (
    <div className="w-screen min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio items will go here */}
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Portfolio Item 1</h2>
            <p className="text-gray-700">Description of portfolio item 1.</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Portfolio Item 2</h2>
            <p className="text-gray-700">Description of portfolio item 2.</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Portfolio Item 3</h2>
            <p className="text-gray-700">Description of portfolio item 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
