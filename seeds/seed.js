const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const BlogData = require('./BlogData.json');

const seedDatabase = async () => {
  try {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const posts = await BlogPost.bulkCreate(BlogData, {
    individualHooks: true,
    returning: true,
  });

        
} catch (err) {
  console.log("message", err);
}


  process.exit(0);
};

seedDatabase();