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