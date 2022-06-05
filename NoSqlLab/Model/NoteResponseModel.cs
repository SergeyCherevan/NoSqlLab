using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NoSqlLab.Model
{
    public class NoteResponseModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string UserName { get; set; }
        public DateTime? LastUpdate { get; set; }
    }
}
