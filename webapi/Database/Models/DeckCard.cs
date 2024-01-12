namespace webapi.Database.Models
{
    public class DeckCard
    {
        public Guid Id { get; set; }
        public Deck Deck { get; set; }
        public Guid DeckId { get; set; }
        public Card Card { get; set; }
        public int CardId { get; set; }
        public int Amount { get; set; }
    }
}
