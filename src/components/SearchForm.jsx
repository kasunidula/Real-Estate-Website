import React, { useState } from 'react';
import { Combobox, NumberPicker, DatePicker } from 'react-widgets';
import 'react-widgets/styles.css';

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
  const postcodes = ['BR5', 'BR6', 'E14', 'SE1', 'SW1', 'W1', 'E2'];

  return (
<form
  onSubmit={handleSubmit}
  className="bg-white/30 backdrop-blur-lg p-8 w-full max-w-3xl mx-auto rounded-3xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl text-black"
>
  <h2 className="text-center text-3xl sm:text-4xl font-heading font-medium mb-6 text-black tracking-wide">
    Discover Your Dream Property
  </h2>

  {/* Error Message */}
  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-center">
      {error}
    </div>
  )}

  {/* Property Type */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-black mb-2 ">
      Property Type
    </label>
    <Combobox
      data={propertyTypes}
      value={criteria.type}
      onChange={(value) => handleChange('type', value)}
      placeholder="Select property type"
      className="w-full rounded-xl border-gray-300"
    />
  </div>

  {/* Price Range */}
  <div className="grid md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Minimum Price
      </label>
      <NumberPicker
        value={criteria.minPrice}
        onChange={(value) => handleChange('minPrice', value)}
        min={0}
        placeholder="Enter min price"
        className="w-full rounded-xl border-gray-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Maximum Price
      </label>
      <NumberPicker
        value={criteria.maxPrice}
        onChange={(value) => handleChange('maxPrice', value)}
        min={0}
        placeholder="Enter max price"
        className="w-full rounded-xl border-gray-300"
      />
    </div>
  </div>

  {/* Bedrooms Range */}
  <div className="grid md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Minimum Bedrooms
      </label>
      <NumberPicker
        value={criteria.minBedrooms}
        onChange={(value) => handleChange('minBedrooms', value)}
        min={0}
        placeholder="Enter min bedrooms"
        className="w-full rounded-xl border-gray-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Maximum Bedrooms
      </label>
      <NumberPicker
        value={criteria.maxBedrooms}
        onChange={(value) => handleChange('maxBedrooms', value)}
        min={0}
        placeholder="Enter max bedrooms"
        className="w-full rounded-xl border-gray-300"
      />
    </div>
  </div>

  {/* Property Size */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-black mb-2">
      Property Size (sq ft)
    </label>
    <NumberPicker
      value={criteria.size}
      onChange={(value) => handleChange('size', value)}
      min={0}
      placeholder="Enter size in sq ft"
      className="w-full rounded-xl border-gray-300"
    />
  </div>

  {/* Date Added & Postcode */}
  <div className="grid md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Date Added
      </label>
      <DatePicker
        value={criteria.added}
        onChange={(value) => handleChange('added', value)}
        placeholder="Select date"
        className="w-full rounded-xl border-gray-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Postcode
      </label>
      <Combobox
        data={postcodes}
        value={criteria.postcode}
        onChange={(value) => handleChange('postcode', value)}
        placeholder="Enter postcode"
        className="w-full rounded-xl border-gray-300"
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 mt-6">
    <button
      type="submit"
      className="w-full sm:w-1/2 text-black px-5 py-3 rounded-2xl bg-blue-200/40 
      backdrop-blur-md border border-white/30 shadow-md hover:bg-blue-300/50 
      transition flex items-center justify-center"
    >
      Search Properties
    </button>
    <button
      type="button"
      onClick={handleScrollToFavorites}
      className="w-full sm:w-1/2 text-black px-5 py-3 rounded-2xl bg-blue-200/40 
      backdrop-blur-md border border-white/30 shadow-md hover:bg-blue-300/50 
      transition flex items-center justify-center"
    >
      View Favorites
    </button>
  </div>
</form>


  );
};

export default SearchForm;