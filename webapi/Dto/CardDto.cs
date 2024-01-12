namespace webapi.Dto;

public class CardDto
{
    public string Name { get; set; }
    public string Subname { get; set; }
    public string Type { get; set; }
    public decimal Price { get; set; }
    public int Amount { get; set; }
    public bool IsFoil { get; set; }
    public bool IsBorderless { get; set; }
}
