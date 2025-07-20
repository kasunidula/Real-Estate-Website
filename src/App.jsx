import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Properties from './components/Projects';
import Favorites from './components/favorites';
import PropertyDetails from './components/PropertyDetails';

const App = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/properties");
      console.log("✅ Properties Fetched:", response.data);
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("❌ Error fetching properties:", error);
    }
  };

  const handleSearch = (criteria) => {
    const filtered = properties.filter((property) => {
      const propertyDate = new Date(property.added).toISOString().split('T')[0]; 
      const criteriaDate = criteria.added ? new Date(criteria.added).toISOString().split('T')[0] : null;

      return (
        (criteria.type === 'Any' || !criteria.type || property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= Number(criteria.minPrice)) &&
        (!criteria.maxPrice || property.price <= Number(criteria.maxPrice)) &&
        (!criteria.minBedrooms || property.bedrooms >= Number(criteria.minBedrooms)) &&
        (!criteria.maxBedrooms || property.bedrooms <= Number(criteria.maxBedrooms)) &&
        (!criteria.postcode || property.postcode.startsWith(criteria.postcode)) &&
        (!criteria.added || propertyDate === criteriaDate)
      );
    });

    setFilteredProperties(filtered);
  };

  const handleAddToFavorites = (property) => {
    if (!favorites.find((fav) => fav._id === property._id)) {
      setFavorites([...favorites, property]);
    }
  };

  const handleRemoveFromFavorites = (_id) => {
    setFavorites(favorites.filter((property) => property._id !== _id));
  };

  const handleRemoveAllFavorites = () => {
    setFavorites([]);
  };

  const handleDragStart = (event, property) => {
    event.dataTransfer.setData('propertyId', property._id);
  };

  const handleDrop = (event, isFavoritesDropZone) => {
    const propertyId = event.dataTransfer.getData('propertyId');
    const property = properties.find((p) => p._id === propertyId);

    if (!isFavoritesDropZone && property) {
      handleRemoveFromFavorites(property._id);
    } else if (isFavoritesDropZone && property) {
      handleAddToFavorites(property);
    }
  };

  return (
    <Router>
      <div className="font-sans">
        <Header />

        {/* ✅ Add spacing between the Header and Search Form */}
        <div className="mt-12"> 
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Main content layout: Properties on the left, Favorites on the right */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex gap-10 px-4 py-4">
                {/* Left side - Properties (Projects) */}
                <div
                  className="flex-1 p-4"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, false)}
                >
                  <Properties
                    properties={filteredProperties}
                    onAddToFavorites={handleAddToFavorites}
                    handleDragStart={handleDragStart}
                  />
                </div>

                {/* Right side - Favorites */}
                <Favorites
                  favorites={favorites}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                  onRemoveAllFavorites={handleRemoveAllFavorites}
                  onDragStart={handleDragStart}
                  onDrop={(event) => handleDrop(event, true)}
                />
              </div>
            }
          />
          <Route path="/property/:id" element={<PropertyDetails onAddToFavorites={handleAddToFavorites} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
