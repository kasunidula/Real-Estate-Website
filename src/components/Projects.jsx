import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation between routes.

const Projects = ({ properties, onAddToFavorites, handleDragStart }) => { 
  
  return (
    <div
      className="container mx-auto py-4 px-6 md:px-20 lg:px-32 my-0 w-full"
      id="Projects" // Adds an ID for the "Properties" section.
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Properties
      </h1> 
      {/* Displays the heading "Properties" at the top of the section. */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Create a grid layout to display property cards. */}

        {properties.map((property) => (
          <div
            key={property.id} // Each property gets a unique key for React rendering.
            className="bg-white shadow-md rounded-xl overflow-hidden"
            draggable // Allows the card to be draggable.
            onDragStart={(event) => handleDragStart(event, property)} 
            // Handles the drag event when a property is dragged.
          >
            {/* Display property image */}
            <img
              src={property.image} // Property's image.
              alt={property.title} // Alternative text for accessibility.
              className="w-full h-64 object-cover" 
              // Makes the image fit the card and maintains proportions.
            />

            <div className="p-6">
              {/* Display property details */}
              <h3 className="text-lg font-semibold mb-2">{property.title}</h3> 
              <p className="text-gray-600 mb-1">£{property.price}</p> 
              <p className="text-gray-600 mb-1">{property.bedrooms} Bedrooms</p>
              <p className="text-gray-600">{property.postcode}</p>

              {/* Buttons for "Add to Favorites" and "More Info" */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <button
                  onClick={() => onAddToFavorites(property)} 
                  // Adds the property to favorites when clicked.
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add to Favorites
                </button>
                <Link
                  to={`/property/${property.id}`} 
                  // Links to a detailed page for the specific property.
                  className="bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600 transition"
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

export default Projects; // Export the Projects component for use in other parts of the app.
