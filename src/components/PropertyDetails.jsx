import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyDetails = ({ onAddToFavorites }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Property Details:", data);
        setProperty(data);
      })
      .catch((error) => console.error("❌ Error fetching property details:", error));
  }, [id]);

  if (!property) {
    return <div className="text-center py-20">Property not found.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      {/* Glassy Card */}
      <div className="bg-white/30 backdrop-blur-md border border-white/30 shadow-lg rounded-3xl p-6">
        <h1 className="text-3xl font-medium mb-6 text-black text-center">{property.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Image */}
          <img src={property.image} alt={property.title} className="w-full h-96 object-cover rounded-xl" />

          {/* Property Info */}
          <div className="space-y-4 text-black">
            <h2 className="text-2xl text-blue-800">£{property.price}</h2>
            <p className="text-gray-800">{property.shortDescription}</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Type:</strong> {property.type}</li>
              <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
              <li><strong>Postcode:</strong> {property.postcode}</li>
              <li><strong>Date Added:</strong> {new Date(property.added).toLocaleDateString()}</li>
            </ul>
            <button
              onClick={() => onAddToFavorites(property)}
              className="text-black px-6 py-2 rounded-2xl bg-blue-200/40 
              backdrop-blur-md border border-white/30 shadow-md hover:bg-blue-300/60 
              transition w-full sm:w-1/2"
            >
              Add to Favorites
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs className="mt-10 text-black">
          <TabList>
            <Tab>Images</Tab>
            <Tab>Long Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Google Map</Tab>
          </TabList>

          {/* Images Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {property.images && property.images.length > 0 ? (
                property.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                ))
              ) : (
                <p className="text-gray-700">No images available.</p>
              )}
            </div>
          </TabPanel>

          {/* Long Description Tab */}
          <TabPanel>
            <div className="mt-4">
              <h3 className="text-2xl font-medium mb-4">Long Description</h3>
              <p className="text-gray-800">{property.longDescription || "No description available."}</p>
            </div>
          </TabPanel>

          {/* Floor Plan Tab */}
          <TabPanel>
            {property.floorPlan ? (
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                className="w-full h-96 object-contain rounded-xl"
              />
            ) : (
              <p className="text-gray-700 mt-4">No floor plan available.</p>
            )}
          </TabPanel>

          {/* Google Map Tab */}
          <TabPanel>
            {property.googleMap ? (
              <iframe
                src={property.googleMap}
                title="Google Map"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen=""
                className="rounded-xl mt-4"
              ></iframe>
            ) : (
              <p className="text-gray-700 mt-4">No Google Map available.</p>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyDetails;
