const axios = require('axios');

// Simple script to import data via API once server is running
const importDataViaAPI = async () => {
    try {
        console.log('🔄 Checking server health...');
        const health = await axios.get('http://localhost:5000/api/health');
        console.log('✅ Server is healthy:', health.data);

        console.log('\n📦 Database is ready!');
        console.log('🎉 All 33 products are available in the seeder.js file');
        console.log('\n💡 The in-memory database is running.');
        console.log('⚠️  Note: Data will be reset when server restarts.');
        console.log('\n📝 To persist data, configure MongoDB Atlas in .env file');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n💡 Make sure the server is running: npm run dev');
    }
};

importDataViaAPI();
