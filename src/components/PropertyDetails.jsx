import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to access route parameters.
import propertiesData from '../properties.json'; // Import property data from a JSON file.
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // Import Tabs components for tabbed content.
import 'react-tabs/style/react-tabs.css'; // Import default styles for tabs.

const PropertyDetails = ({ onAddToFavorites }) => {
  const { id } = useParams(); // Get the property ID from the route.
  const property = propertiesData.find((p) => p.id === parseInt(id)); 
  // Find the property with the matching ID.

  if (!property) {
    // Show this message if the property is not found.
    return <div className="text-center py-20">Property not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Property Title */}
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Image */}
        <img
          src={property.image} // Main property image.
          alt={property.title} // Image description for accessibility.
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Property Info Section */}
        <div className="space-y-4">
          {/* Price and Description */}
          <h2 className="text-xl font-semibold text-blue-600">£{property.price}</h2>
          <p className="text-gray-700">{property.shortDescription}</p>
          {/* List of Property Details */}
          <ul>
            <li>Type: {property.type}</li>
            <li>Bedrooms: {property.bedrooms}</li>
            <li>Postcode: {property.postcode}</li>
            <li>Date Added: {property.added}</li>
          </ul>
          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => onAddToFavorites(property)} 
              // Adds the property to favorites.
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Favorites
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs className="mt-8">
        <TabList>
          <Tab>Images</Tab> 
          <Tab>Long Description</Tab> 
          <Tab>Floor Plan</Tab> 
          <Tab>Google Map</Tab> 
        </TabList>

        {/* Images Tab Content */}
        <TabPanel>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {property.images.map((img, index) => (
              <img
                key={index} // Assign a unique key to each image.
                src={img} // Display property images.
                alt={`Property ${index + 1}`} // Image description for accessibility.
                className="w-50 h-50 object-cover rounded-lg"
              />
            ))}
          </div>
        </TabPanel>

        {/* Long Description Tab Content */}
        <TabPanel>
          <div className="mt-4">
            <h3 className="text-2xl font-bold mb-4">Long Description</h3>
            <p className="text-gray-700">{property.longDescription}</p> 
            {/* Detailed description of the property. */}
          </div>
        </TabPanel>

        {/* Floor Plan Tab Content */}
        <TabPanel>
          <img
            src={property.floorPlan} // Floor plan image.
            alt="Floor Plan" // Image description for accessibility.
            className="w-full h-96 object-contain rounded-lg"
          />
        </TabPanel>

        {/* Google Map Tab Content */}
        <TabPanel>
          <iframe
            src={property.googleMap} // Embed Google Map for the property's location.
            title="googleMap" // Title for accessibility.
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen="" 
            className="rounded-lg"
          ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails; // Export the PropertyDetails component for use in other parts of the app.
