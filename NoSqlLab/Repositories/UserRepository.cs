using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using NoSqlLab.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NoSqlLab.Repositories
{
    public class UserRepository
    {
        private readonly IMongoCollection<User> collection;

        public UserRepository(IConfiguration configuration)
        {
            var connString = configuration.GetConnectionString("MongoDBConnection");

            collection = new MongoClient(connString).GetDatabase("notes_db").GetCollection<User>("users");
        }

        public User Insert(User user)
        {
            var existingUser = GetByUsername(user.UserName);

            if (existingUser != null)
                throw new Exception("User with same username already exists");

            user.Id = Guid.NewGuid();
            collection.InsertOne(user);

            return user;
        }

        public IReadOnlyCollection<User> GetAll()
        {
            return collection.Find(x => true).ToList();
        }

        public User GetById(Guid id)
        {
            return collection.Find(x => x.Id == id).FirstOrDefault();
        }

        public User GetByUsername(string username)
        {
            return collection.Find(x => x.UserName == username).FirstOrDefault();
        }

        public User GetByUsernameAndPassword(string username, string password)
        {
            return collection.Find(x => x.UserName == username && x.Password == password).FirstOrDefault();
        }

        public void ChangePassword(string username, string newPassword)
        {
            User user = GetByUsername(username);
            user.Password = newPassword;

            collection.ReplaceOne(x => x.Id == user.Id, user);
        }

        public async void CreateIndexes()
        {
            await collection.Indexes
                .CreateOneAsync(new CreateIndexModel<User>(Builders<User>.IndexKeys.Ascending(_ => _.Id)))
                .ConfigureAwait(false);

            await collection.Indexes
                .CreateOneAsync(new CreateIndexModel<User>(Builders<User>.IndexKeys.Ascending(_ => _.UserName)))
                .ConfigureAwait(false);
        }
    }
}
