import React from 'react';

// This is a Favorites component that shows a list of favorite properties.
const Favorites = ({
  favorites, // List of favorite properties.
  onRemoveFromFavorites, // Function to remove a single property from favorites.
  onDrop, // Function to handle dropping items.
  onRemoveAllFavorites, // Function to remove all favorite properties.
  onDragStart, // Function to handle starting a drag event.
}) => {
  return (
    <div
      className="w-1/4 p-3 bg-blue-100 rounded-lg shadow-lg mr-8"
      onDragOver={(event) => event.preventDefault()} // Prevents the default behavior so items can be dropped.
      onDrop={onDrop} // Calls the drop function when something is dropped here.
    >
      <div id="favorites"></div> {/* This is for adding a link anchor. */}
      <h2 className="text-xl font-semibold mb-2">Favorite Properties</h2>
      
      {/* Check if there are any favorite properties */}
      {favorites.length > 0 ? (
        <>
          {/* Button to remove all properties from favorites */}
          <button
            onClick={onRemoveAllFavorites} // Calls the function to remove all items.
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Remove All
          </button>

          <div className="space-y-4">
            {/* Show each favorite property */}
            {favorites.map((property) => (
              <div
                key={property.id} // Each property gets a unique key.
                className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center"
                draggable // Makes the property draggable.
                onDragStart={(event) => onDragStart(event, property)} // Starts a drag event with this property.
              >
                <div>
                  {/* Show the property title and price */}
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600">£{property.price}</p>
                </div>
                <button
                  onClick={() => onRemoveFromFavorites(property.id)} // Removes this property when the button is clicked.
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Message to show if there are no favorite properties.
        <p className="text-gray-600">No properties in favorites.</p>
      )}
    </div>
  );
};

export default Favorites; // Exports the Favorites component so it can be used elsewhere.
