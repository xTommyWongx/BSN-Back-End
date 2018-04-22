
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('venue').del()
    .then(function () {
      // Inserts seed entries
      return knex('venue').insert([
        {street: '1 Hing Fat Street', district: 'Causeway Bay', park_name: 'Victoria Park'},
        {street: 'Lok Man Road', district: 'Chai Wan', park_name: 'Chai Wan North Service Reservoir Playground'},
        {street: 'Cloud View Road', district: 'North Point', park_name: 'Cloud View Road Service Reservoir Playground'},
        {street: 'Chai Wan Road', district: 'Chai Wan', park_name: 'Hing Wah Estate Playground No. 1'},
        {street: 'Siu Sai Wan Road', district: 'Siu Sai Wan', park_name: 'Hing Wah Estate Playground No. 1Siu Sai Wan Promenade'},
        {street: 'Argyle Street', district: 'Kowloon', park_name: 'Argyle Street Playground'},
        {street: 'Carpenter Road', district: 'Kowloon City', park_name: 'Carpenter Road Park'},
        {street: 'No.1 Chung Yee Street', district: 'Ho Man Tin', park_name: 'Ho Man Tin Park'},
        {street: '195 Junction Road', district: 'Kowloon City', park_name: 'Junction Road Park'},
        {street: 'No. 77, Ko Shan Road', district: 'Kowloon', park_name: 'Ko Shan Road Park'},
        {street: '17, Hiu Ming Street', district: 'Kwun Tong', park_name: 'Hiu Ming Street Playground'},
        {street: 'Kai Lok Street', district: 'Kowloon Bay', park_name: 'Kowloon Bay Playground'},
        {street: 'Yau Tong Road', district: 'Yau Tong', park_name: 'Yau Tong Road Playground'},
        {street: '20 Sau Ming Road', district: 'Kwun Tong', park_name: 'Sau Ming Road Park'},
        {street: '199 Kwun Tong Road', district: 'Kwun Tong', park_name: 'Ngau Tau Kok Park'}
      ]);
    });
};
