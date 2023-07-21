import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
          name: 'Abdullah',
          email: 'abdullah.shah7839@gmail.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'Sami',
          email: 'sami@gmail.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ], cars: [
        {
          name: 'Car 1',
          image: 'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/7c0f1f2e1303456088b15eb4c90a45a5.jpg',
          capacity: 4,
          fuelType: 'Petrol',
          bookedTimeSlots: [],
          rentPerHour: 25,
        },
        {
          name: 'Lamborghani',
          image: 'https://tse2.mm.bing.net/th?id=OIP.Y2tEnDaBN-0JIs3MGSVKpwHaEo&pid=Api&P=0&h=180',
          capacity: 5,
          fuelType: 'Diesel',
          bookedTimeSlots: [],
          rentPerHour: 30,
        },
       
      ],
    
};
export default data;