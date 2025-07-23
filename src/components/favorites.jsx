import React from 'react';

const Favorites = ({ favorites, onRemoveFromFavorites, onDrop, onRemoveAllFavorites, onDragStart }) => {
  return (
    <div
      id="favorites"
      className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 p-4 rounded-2xl shadow-lg bg-blue-200/30 backdrop-blur-md border border-white/30"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <h2 className="text-xl font-bold mb-4 text-center text-navy-950">Favorite Properties</h2>

      {favorites.length > 0 ? (
        <>
          {/* 🟥 Remove All Button */}
        <button
          onClick={onRemoveAllFavorites}
          className="mb-4 w-full text-black px-4 py-2 rounded-2xl bg-red-300/60 backdrop-blur-sm border border-white/30 hover:bg-red-300/40 transition shadow-md"
        >
          Remove All
        </button>


          <div className="space-y-3">
            {favorites.map((property) => (
              <div
                key={property._id}
                className="bg-blue-200/30 backdrop-blur-md border border-white/30 shadow-md p-3 rounded-xl flex justify-between items-center hover:bg-blue-300/40 transition"
                draggable
                onDragStart={(event) => onDragStart(event, property)}
              >
                <div>
                  <h3 className="text-md font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-gray-700 text-sm">£{property.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onRemoveFromFavorites(property._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-700 text-center">No properties in favorites.</p>
      )}
    </div>
  );
};

export default Favorites;
