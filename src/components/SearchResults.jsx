import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ properties }) => {
  return (
    <div className="container mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Search Results</h1>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property._id} className="bg-white shadow-md rounded-xl overflow-hidden">
              {/* Property Image */}
              <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />

              <div className="p-6">
                {/* Property Details */}
                <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-1">£{property.price}</p>
                <p className="text-gray-600 mb-1">{property.bedrooms} Bedrooms</p>
                <p className="text-gray-600">{property.location}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                  <Link
                    to={`/property/${property._id}`}
                    className="bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No properties match your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
