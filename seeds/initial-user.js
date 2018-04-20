
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstname: 'Bal',
          lastname: 'Kumar Rai', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',
          email: 'bal@example.com',
          location: 'Hong Kong',
          status: 'manager'
        },
        {
          firstname: 'Thomas',
          lastname: 'Lee', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'thomas@example.com',
          location: 'Kowloon',
          status: 'manager'
        },
        {
          firstname: 'Tommy',
          lastname: 'Wong',
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'tommy@example.com',
          location: 'Hong Kong',
          status: 'manager'
        },
        {
          firstname: 'Gordan',
          lastname: 'Chung', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'gordan@example.com',
          location: 'New Territories',
          status: 'manager'
        },
        {
          firstname: 'Billy',
          lastname: 'Shim', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'billy@example.com',
          location: 'Kowloon',
          status: 'manager'
        },
        {
          firstname: 'Hugo',
          lastname: 'Cheng', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'hugo@example.com',
          location: 'Kowloon',
          position: 'Right Wing',
          status: 'player'
        },
        {
          firstname: 'Telford',
          lastname: 'Ho', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'telford@example.com',
          location: 'Hong Kong',
          position: 'Striker',
          status: 'player'
        },
        {
          firstname: 'Allen',
          lastname: 'Chum', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'allen@example.com',
          location: 'Kowloon',
          position: 'Central Midfelder',
          status: 'player'
        },
        {
          firstname: 'Charles',
          lastname: 'Chan', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'charles@example.com',
          location: 'Kowloon',
          position: 'Central Midfelder',
          status: 'player'
        },
        {
          firstname: 'Seamus',
          lastname: 'y', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'seamus@example.com',
          location: 'Hong Kong',
          position: 'Striker',
          status: 'player'
        },
        {
          firstname: 'Luke',
          lastname: 'Yeung', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'luke@example.com',
          location: 'New Territories',
          position: 'Right Wing',
          status: 'player'
        },
        {
          firstname: 'Warren',
          lastname: 'Habimana', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'enoch@example.com',
          location: 'Kowloon',
          position: 'Right Wing',
          status: 'player'
        },
        {
          firstname: 'Alex',
          lastname: 'Lau', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'alex@example.com',
          location: 'Kowloon',
          status: 'organizer'
        },
        {
          firstname: 'Gordon',
          lastname: 'Lau', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'gordanlau@example.com',
          location: 'Hong Kong',
          status: 'organizer'
        },
        {
          firstname: 'Michael',
          lastname: 'Fung', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'Michael@example.com',
          location: 'Kowloon',
          status: 'organizer'
        },
      ]);
    });
};
