db.createUser(
    {
        user: "root",
        pwd: "chamomile123",
        roles: [
            {
                role: "readWrite",
                db: "Book_data_DB"
            }
        ]
    }
);

conn = new Mongo();
//db = conn.getDB("Book_data_DB");
// db.Book_data.createIndex({ "address.zip": 1 }, { unique: false });
// db.Book_data.insert({ "address": { "city": "Paris", "zip": "123" }, "name": "Mike", "phone": "1234" });
// db.Book_data.insert({ "address": { "city": "Marsel", "zip": "321" }, "name": "Helga", "phone": "4321" });
