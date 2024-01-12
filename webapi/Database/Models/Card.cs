namespace webapi.Database.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Subname { get; set; }
        public string Type { get; set; }
        public bool IsFoil { get; set; }
        public bool IsBorderless { get; set; }
        public decimal Price { get; set; }
        public short Cost { get; set; }
        public short? Strength { get; set; }
        public short? Willpower { get; set; }
        public string Release { get; set; }
    }
}
