import React from 'react';
import { Link } from 'react-router-dom';

const Properties = ({ properties, onAddToFavorites, handleDragStart }) => {
  console.log("✅ Rendering Properties:", properties);

  if (!properties || properties.length === 0) {
    return <h2 className="text-center text-gray-600">No properties found.</h2>;
  }

  return (
    <div className="container mx-auto py-10 px-6 md:px-20 lg:px-32" id="Properties">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-navy-900">
        Properties
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white/30 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition flex flex-col"
            draggable
            onDragStart={(event) => handleDragStart(event, property)}
          >
            {/* Image */}
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col justify-between">
              {/* Price & Title */}
              <div className="mb-2">
                <p className="text-xl font-bold text-navy-900 mb-1">
                  £{property.price.toLocaleString()}
                </p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>
              </div>

              {/* 📝 Short Description */}
              {property.shortDescription && (
                <p className="text-sm text-gray-700 mt-1 mb-3 line-clamp-3">
                  {property.shortDescription.length > 100
                    ? property.shortDescription.substring(0, 100) + '...'
                    : property.shortDescription}
                </p>
              )}

  

  {/* Glassmorphism Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
    <button
      onClick={() => onAddToFavorites(property)}
      className="w-full sm:w-auto text-black px-5 py-2 rounded-2xl bg-blue-200/40 backdrop-blur-md border border-white/30 shadow-md hover:bg-blue-300/60 transition"
    >
      Add to Favorites
    </button>
    <Link
      to={`/property/${property._id}`}
      className="w-full sm:w-auto text-black px-5 py-2 rounded-2xl bg-blue-200/40 backdrop-blur-md border border-white/30 shadow-md hover:bg-blue-300/60 transition text-center"
    >
      More Info
    </Link>
  </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
