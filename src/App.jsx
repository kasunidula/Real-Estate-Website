import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Projects from './components/Projects';
import Favorites from './components/Favorites';
import PropertyDetails from './components/PropertyDetails';

const App = () => {
  const [filteredProperties, setFilteredProperties] = useState([]); // Store properties from MongoDB
  const [favorites, setFavorites] = useState([]);

  // Fetch properties from MongoDB when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/api/properties") // Replace with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setFilteredProperties(data);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  // Function to filter properties based on search criteria
  const handleSearch = (criteria) => {
    const filtered = filteredProperties.filter((property) => {
      const propertyDate = new Date(property.added).toISOString().split('T')[0];
      const criteriaDate = criteria.added
        ? new Date(criteria.added).toISOString().split('T')[0]
        : null;
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

  // Function to add a property to favorites
  const handleAddToFavorites = (property) => {
    if (!favorites.find((fav) => fav._id === property._id)) {
      setFavorites([...favorites, property]);
    }
  };

  // Function to remove a single property from favorites
  const handleRemoveFromFavorites = (id) => {
    setFavorites(favorites.filter((property) => property._id !== id));
  };

  // Function to remove all properties from favorites
  const handleRemoveAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <Router>
      <div className="font-sans">
        <Header onSearch={handleSearch} />

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex">
                <div className="flex-1 p-4">
                  <Projects
                    properties={filteredProperties}
                    onAddToFavorites={handleAddToFavorites}
                  />
                </div>

                <Favorites
                  favorites={favorites}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                  onRemoveAllFavorites={handleRemoveAllFavorites}
                />
              </div>
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetails onAddToFavorites={handleAddToFavorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
