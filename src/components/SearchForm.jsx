import React, { useState } from 'react';
import { Combobox, NumberPicker, DatePicker } from 'react-widgets';
import 'react-widgets/styles.css';

const SearchForm = ({ onSearch }) => {
  // ✅ Load from localStorage or default
  const [criteria, setCriteria] = useState(() => {
    const saved = localStorage.getItem('searchCriteria');
    return saved
      ? JSON.parse(saved)
      : {
          type: 'Any',
          minPrice: null,
          maxPrice: null,
          minBedrooms: null,
          maxBedrooms: null,
          postcode: '',
          added: null,
          size: null,
        };
  });

  const [error, setError] = useState('');

  // ✅ Update field & save to localStorage
  const handleChange = (name, value) => {
    const updated = { ...criteria, [name]: value };
    setCriteria(updated);
    localStorage.setItem('searchCriteria', JSON.stringify(updated));
  };

  // ✅ Reset form & clear localStorage
  const resetForm = () => {
    localStorage.removeItem('searchCriteria');
    setCriteria({
      type: 'Any',
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      postcode: '',
      added: null,
      size: null,
    });
  };

  const validateCriteria = () => {
    const postcodePattern = /^([A-Z]{1,2}[0-9]{1,2}[A-Z]?[ ]?[0-9]?[A-Z]{0,2})$/i;

    if (criteria.minPrice && criteria.maxPrice && criteria.minPrice > criteria.maxPrice) {
      setError('Minimum price cannot be greater than maximum price.');
      return false;
    }

    if (criteria.minBedrooms && criteria.maxBedrooms && criteria.minBedrooms > criteria.maxBedrooms) {
      setError('Minimum bedrooms cannot be greater than maximum bedrooms.');
      return false;
    }

    if (criteria.postcode && !postcodePattern.test(criteria.postcode)) {
      setError('Invalid postcode format.');
      return false;
    }

    setError('');
    return true;
  };

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCriteria()) {
      const formattedCriteria = {
        ...criteria,
        added: formatDate(criteria.added),
      };

      const activeCriteria = Object.fromEntries(
        Object.entries(formattedCriteria).filter(
          ([, value]) => value !== null && value !== '' && value !== 'Any'
        )
      );

      onSearch(activeCriteria);
    }
  };

  const handleScrollToFavorites = () => {
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection) {
      favoritesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const propertyTypes = ['Any', 'House', 'Flat'];
  const postcodes = ['BR5', 'BR6', 'E14', 'SE1', 'SW1', 'W1', 'E2'];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 backdrop-blur-lg p-8 w-full max-w-3xl mx-auto rounded-3xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl text-black"
    >
      <h2 className="text-center text-3xl sm:text-4xl font-heading font-medium mb-6 text-black tracking-wide">
        Discover Your Dream Property
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-center">
          {error}
        </div>
      )}

      {/* Property Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-2">
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
          <label className="block text-sm font-medium text-black mb-2">Minimum Price</label>
          <NumberPicker
            value={criteria.minPrice}
            onChange={(value) => handleChange('minPrice', value)}
            min={0}
            className="w-full rounded-xl border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">Maximum Price</label>
          <NumberPicker
            value={criteria.maxPrice}
            onChange={(value) => handleChange('maxPrice', value)}
            min={0}
            className="w-full rounded-xl border-gray-300"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Minimum Bedrooms</label>
          <NumberPicker
            value={criteria.minBedrooms}
            onChange={(value) => handleChange('minBedrooms', value)}
            min={0}
            className="w-full rounded-xl border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">Maximum Bedrooms</label>
          <NumberPicker
            value={criteria.maxBedrooms}
            onChange={(value) => handleChange('maxBedrooms', value)}
            min={0}
            className="w-full rounded-xl border-gray-300"
          />
        </div>
      </div>

      {/* Property Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-2">Property Size (sq ft)</label>
        <NumberPicker
          value={criteria.size}
          onChange={(value) => handleChange('size', value)}
          min={0}
          className="w-full rounded-xl border-gray-300"
        />
      </div>

      {/* Date & Postcode */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Date Added</label>
          <DatePicker
            value={criteria.added}
            onChange={(value) => handleChange('added', value)}
            className="w-full rounded-xl border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">Postcode</label>
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
      <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center">
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

        <button
          type="button"
          onClick={resetForm}
          title="Reset Form"
          className="w-10 h-10 rounded-full bg-gray-100/70 hover:bg-gray-200/80 
          border border-white/20 flex items-center justify-center transition"
        >
          🔄
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
