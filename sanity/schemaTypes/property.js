export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  fields: [
    { name: 'name', title: 'Property Name', type: 'string' },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'for sale' },
          { title: 'For Rent', value: 'for rent' },
        ],
      },
    },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'beds', title: 'Beds', type: 'number' },
    { name: 'baths', title: 'Baths', type: 'number' },
    { name: 'kitchen', title: 'Kitchen', type: 'number' },
    { name: 'balcony', title: 'Balcony', type: 'number' },
    { name: 'size', title: 'Size', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'videoUrl', title: 'Video URL', type: 'url' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { hotspot: true },
    },
    { name: 'lat', title: 'Latitude', type: 'number' },
    { name: 'lng', title: 'Longitude', type: 'number' },

    // ✅ FEATURED TOGGLE FIELD
    {
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      description: 'Mark this property as featured (it will appear on the homepage)',
      initialValue: false,
    },
  ],
};
