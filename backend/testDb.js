const sequelize = require('./config/db');
const { User, Assignment, Announcement } = require('./models/schema');

async function testDatabaseConnection() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');

    // Test model synchronization
    await sequelize.sync({ force: false });
    console.log('✅ Models synchronized successfully!');

    // Test creating a user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'testpassword',
      role: 'student'
    });
    console.log('✅ Test user created:', testUser.toJSON());

    // Test creating an assignment
    const testAssignment = await Assignment.create({
      title: 'Test Assignment',
      description: 'This is a test assignment',
      deadline: new Date(),
      UserId: testUser.id
    });
    console.log('✅ Test assignment created:', testAssignment.toJSON());

    // Test creating an announcement
    const testAnnouncement = await Announcement.create({
      title: 'Test Announcement',
      content: 'This is a test announcement',
    });
    console.log('✅ Test announcement created:', testAnnouncement.toJSON());

    // Test fetching data with associations
    const userWithAssignments = await User.findByPk(testUser.id, {
      include: [Assignment]
    });
    console.log('✅ User with assignments:', userWithAssignments.toJSON());

    // Clean up test data
    await testAssignment.destroy();
    await testAnnouncement.destroy();
    await testUser.destroy();
    console.log('✅ Test data cleaned up successfully!');

  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log('✅ Database connection closed');
  }
}

// Run the test
testDatabaseConnection(); 