
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 1, firstname: 'Bal',
          lastname: 'Kumar Rai', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',
          email: 'bal@example.com',
          location: 'Hong Kong',
          status: 'manager'
        },
        {
          user_id: 2, firstname: 'Thomas',
          lastname: 'Lee', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'thomas@example.com',
          location: 'Kowloon',
          status: 'manager'
        },
        {
          user_id: 3, firstname: 'Tommy',
          lastname: 'Wong',
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'tommy@example.com',
          location: 'Hong Kong',
          status: 'manager'
        },
        {
          user_id: 4, firstname: 'Gordan',
          lastname: 'Chung', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'gordan@example.com',
          location: 'New Territories',
          status: 'manager'
        },
        {
          user_id: 5, firstname: 'Billy',
          lastname: 'Shim', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'billy@example.com',
          location: 'Kowloon',
          status: 'manager'
        },
        {
          user_id: 6, firstname: 'Hugo',
          lastname: 'Cheng', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'hugo@example.com',
          location: 'Kowloon',
          position: 'Right Wing',
          status: 'player'
        },
        {
          user_id: 7, firstname: 'Telford',
          lastname: 'Ho', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'telford@example.com',
          location: 'Hong Kong',
          position: 'Striker',
          status: 'player'
        },
        {
          user_id: 8, firstname: 'Allen',
          lastname: 'Chum', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'allen@example.com',
          location: 'Kowloon',
          position: 'Central Midfelder',
          status: 'player'
        },
        {
          user_id: 9, firstname: 'Charles',
          lastname: 'Chan', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'charles@example.com',
          location: 'Kowloon',
          position: 'Central Midfelder',
          status: 'player'
        },
        {
          user_id: 10, firstname: 'Seamus',
          lastname: 'y', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'seamus@example.com',
          location: 'Hong Kong',
          position: 'Striker',
          status: 'player'
        },
        {
          user_id: 11, firstname: 'Luke',
          lastname: 'Yeung', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'luke@example.com',
          location: 'New Territories',
          position: 'Right Wing',
          status: 'player'
        },
        {
          user_id: 12, firstname: 'Warren',
          lastname: 'Habimana', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'enoch@example.com',
          location: 'Kowloon',
          position: 'Right Wing',
          status: 'player'
        },
        {
          user_id: 13, firstname: 'Alex',
          lastname: 'Lau', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'alex@example.com',
          location: 'Kowloon',
          status: 'organizer'
        },
        {
          user_id: 14, firstname: 'Gordon',
          lastname: 'Lau', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'gordanlau@example.com',
          location: 'Hong Kong',
          status: 'organizer'
        },
        {
          user_id: 15, firstname: 'Michael',
          lastname: 'Fung', 
          password: '$2a$10$OJzbxagDDHmS1FNS1z9KyOQwNDEYLmDCK695I/7xxr8w8aZKDYueS',          
          email: 'Michael@example.com',
          location: 'Kowloon',
          status: 'organizer'
        },
      ]);
    });
};
