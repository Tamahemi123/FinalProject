const mongoose = require('mongoose');

// মঙ্গোডিবি সার্ভারের সাথে কানেকশন স্থাপন
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('সার্ভারের সাথে সফলভাবে সংযোগ স্থাপন করা হয়েছে'))
  .catch((error) => console.error('সার্ভারের সাথে সংযোগ স্থাপনে সমস্যা হয়েছে:', error));

const db = mongoose.connection;

// কানেকশনের ইভেন্ট লিসেনার
db.on('error', console.error.bind(console, 'মঙ্গোডিবি কানেকশন এরর:'));
db.once('open', function() {
  console.log('মঙ্গোডিবি সার্ভারে সফলভাবে সংযোগ স্থাপন হয়েছে');
});
