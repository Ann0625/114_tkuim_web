db = db.getSiblingDB('week12');
db.createCollection('users');
db.createCollection('participants');

// 建立管理員 (密碼雜湊為 qwe123rty456)
db.users.insertOne({
  email: "admin@example.com",
  passwordHash: "$2b$10$7RGEqxWUM19W9.9O6t5Y6unlK3fTfK5N.oH5n6/W17XmS9yJ9K0K.",
  role: "admin"
});