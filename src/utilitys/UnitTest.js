const sum = require('./sum');

test('দুটি সংখ্যা যোগ করা হলে সঠিক ফলাফল পেতে হবে', () => {
  expect(sum(1, 2)).toBe(3);
});
