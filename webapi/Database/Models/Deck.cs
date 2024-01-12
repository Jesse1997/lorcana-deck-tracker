namespace webapi.Database.Models
{
    public class Deck
    {
        public Guid Id { get; set; }
        public List<DeckCard> DeckCards { get; set; }
    }
}
