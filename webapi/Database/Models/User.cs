using Microsoft.AspNetCore.Identity;

namespace webapi.Database.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public Deck Deck { get; set; }
        public Guid DeckId { get; set; }
    }
}
