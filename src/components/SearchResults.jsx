import React from 'react';

const SearchResults = ({ properties, onViewDetails }) => {
  // This component displays the search results as a list of property cards.
  return (
    <div className="results">
      {properties.map((property) => (
        // Loop through the properties array and create a card for each property.
        <div key={property.id} className="property-card">
          {/* Property Image */}
          <img 
            src={property.image} // Display the image of the property.
            alt={property.title} // Alt text for accessibility.
            className="w-full h-48 object-cover" // Style the image to fit the card.
          />

        
          <h3 className="text-lg font-semibold">{property.title}</h3>
          
          <p>£{property.price}</p>
       
          <p>{property.bedrooms} Bedrooms</p>
          
          <p>{property.postcode}</p>

          {/* Button to View More Details */}
          <button
            onClick={() => onViewDetails(property.id)} 
            // Call the function to view details of the specific property.
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults; // Export the SearchResults component for use in other parts of the app.
