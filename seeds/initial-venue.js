
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('venue').del()
    .then(function () {
      // Inserts seed entries
      return knex('venue').insert([
        {venue_id: 1, street: '1 Hing Fat Street', district: 'Causeway Bay', park_name: 'Victoria Park'},
        {venue_id: 2, street: 'Lok Man Road', district: 'Chai Wan', park_name: 'Chai Wan North Service Reservoir Playground'},
        {venue_id: 3, street: 'Cloud View Road', district: 'North Point', park_name: 'Cloud View Road Service Reservoir Playground'},
        {venue_id: 4, street: 'Chai Wan Road', district: 'Chai Wan', park_name: 'Hing Wah Estate Playground No. 1'},
        {venue_id: 5, street: 'Siu Sai Wan Road', district: 'Siu Sai Wan', park_name: 'Hing Wah Estate Playground No. 1Siu Sai Wan Promenade'},
        {venue_id: 6, street: 'Argyle Street', district: 'Kowloon', park_name: 'Argyle Street Playground'},
        {venue_id: 7, street: 'Carpenter Road', district: 'Kowloon City', park_name: 'Carpenter Road Park'},
        {venue_id: 8, street: 'No.1 Chung Yee Street', district: 'Ho Man Tin', park_name: 'Ho Man Tin Park'},
        {venue_id: 9, street: '195 Junction Road', district: 'Kowloon City', park_name: 'Junction Road Park'},
        {venue_id: 10, street: 'No. 77, Ko Shan Road', district: 'Kowloon', park_name: 'Ko Shan Road Park'},
        {venue_id: 11, street: '17, Hiu Ming Street', district: 'Kwun Tong', park_name: 'Hiu Ming Street Playground'},
        {venue_id: 12, street: 'Kai Lok Street', district: 'Kowloon Bay', park_name: 'Kowloon Bay Playground'},
        {venue_id: 13, street: 'Yau Tong Road', district: 'Yau Tong', park_name: 'Yau Tong Road Playground'},
        {venue_id: 14, street: '20 Sau Ming Road', district: 'Kwun Tong', park_name: 'Sau Ming Road Park'},
        {venue_id: 15, street: '199 Kwun Tong Road', district: 'Kwun Tong', park_name: 'Ngau Tau Kok Park'}
      ]);
    });
};
