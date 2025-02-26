import React, { useState } from 'react';
import { Combobox, NumberPicker, DatePicker } from 'react-widgets'; // Import form components.
import 'react-widgets/styles.css'; // Import default styles for these widgets.

const SearchForm = ({ onSearch }) => {
  // State to store search criteria
  const [criteria, setCriteria] = useState({
    type: 'Any', 
    minPrice: null, 
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null, 
    postcode: '', 
    added: null, 
  });

  const [error, setError] = useState(''); // State to store validation errors.

  const handleChange = (name, value) => {
    // Update the specific field in the criteria.
    setCriteria({ ...criteria, [name]: value });
  };

  const validateCriteria = () => {
    // Regular expression for validating postcode format.
    const postcodePattern = /^([A-Z]{1,2}[0-9]{1,2}[A-Z]?[ ]?[0-9]?[A-Z]{0,2})$/i;

    // Check if minimum price is greater than maximum price.
    if (criteria.minPrice && criteria.maxPrice && criteria.minPrice > criteria.maxPrice) {
      setError('Minimum price cannot be greater than maximum price.');
      return false;
    }

    // Check if minimum bedrooms are greater than maximum bedrooms.
    if (criteria.minBedrooms && criteria.maxBedrooms && criteria.minBedrooms > criteria.maxBedrooms) {
      setError('Minimum bedrooms cannot be greater than maximum bedrooms.');
      return false;
    }

    // Check if postcode is valid.
    if (criteria.postcode && !postcodePattern.test(criteria.postcode)) {
      setError('Invalid postcode format.');
      return false;
    }

    setError(''); // Clear error if validation passes.
    return true;
  };

  const formatDate = (date) => {
    // Convert the date object into "YYYY-MM-DD" format.
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero.
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero.
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload.

    if (validateCriteria()) {
      // Format the criteria before submitting.
      const formattedCriteria = {
        ...criteria,
        added: formatDate(criteria.added), // Format the date.
      };

      // Filter out empty or default fields from the criteria.
      const activeCriteria = Object.fromEntries(
        Object.entries(formattedCriteria).filter(([key, value]) => value !== null && value !== '' && value !== 'Any')
      );

      onSearch(activeCriteria); // Call the parent function with the criteria.
    }
  };

  const handleScrollToFavorites = () => {
    // Scroll to the "favorites" section of the page.
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection) {
      favoritesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const propertyTypes = ['Any', 'House', 'Flat']; // Property types to choose from.

  return (
    <form
      onSubmit={handleSubmit} // Handle the form submission.
      className="bg-white p-7 w-full max-w-xlg mx-auto rounded-lg shadow-lg flex flex-col gap-2"
    >
      <h2 className="text-center text-3xl font-bold mb-4">Search Property</h2>

      {/* Display error message if validation fails */}
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      {/* Dropdown for selecting property type */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Type:</label>
        <Combobox
          data={propertyTypes}
          value={criteria.type}
          onChange={(value) => handleChange('type', value)}
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>

      {/* Date picker for selecting "date added" */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date Added:</label>
        <DatePicker
          value={criteria.added}
          onChange={(value) => handleChange('added', value)}
          placeholder="Select a date"
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>

      {/* Input fields for minimum and maximum price */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">Min Price:</label>
          <NumberPicker
            value={criteria.minPrice}
            onChange={(value) => handleChange('minPrice', value)}
            placeholder="Enter minimum price"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Max Price:</label>
          <NumberPicker
            value={criteria.maxPrice}
            onChange={(value) => handleChange('maxPrice', value)}
            placeholder="Enter maximum price"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Input fields for minimum and maximum bedrooms */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Min Bedrooms:</label>
          <NumberPicker
            value={criteria.minBedrooms}
            onChange={(value) => handleChange('minBedrooms', value)}
            placeholder="Enter minimum bedrooms"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Max Bedrooms:</label>
          <NumberPicker
            value={criteria.maxBedrooms}
            onChange={(value) => handleChange('maxBedrooms', value)}
            placeholder="Enter maximum bedrooms"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Dropdown for selecting postcode */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Postcode:</label>
        <Combobox
          data={['BR5', 'BR6', 'E14', 'SE1', 'SW1', 'W1', 'E2']} // Available postcodes.
          value={criteria.postcode}
          onChange={(value) => handleChange('postcode', value)}
          placeholder="Enter postcode (e.g., NW1)"
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>

      {/* Buttons for "Search" and "Favorites" */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition flex-1"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleScrollToFavorites} 
          // Scroll to the favorites section when clicked.
          className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 transition flex-shrink"
        >
          Favorites
        </button>
      </div>
    </form>
  );
};

export default SearchForm; // Export the SearchForm component for use in other parts of the app.
