using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Database;
using webapi.Database.Models;
using webapi.Dto;

namespace webapi.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CardsController : ControllerBase
{
    private readonly ILogger<CardsController> _logger;
    private readonly DisneyContext _dbContext;

    public CardsController(ILogger<CardsController> logger, DisneyContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet("All")]
    public IEnumerable<CardDto> GetAll()
    {
        var user = GetCurrentUser();

        var deckCardsDto = new List<CardDto>();

        foreach (var card in _dbContext.Cards)
        {
            deckCardsDto.Add(new CardDto
            {
                Name = card.Name,
                Subname = card.Subname ?? "",
                Price = card.Price,
                Type = card.Type,
                Amount = user.Deck.DeckCards.SingleOrDefault(x => x.Card.Name.Equals(card.Name) && (card.Subname == null || card.Subname.Equals(card.Subname)) && x.Card.IsFoil == card.IsFoil && x.Card.IsBorderless == card.IsBorderless)?.Amount ?? 0,
                IsFoil = card.IsFoil,
                IsBorderless = card.IsBorderless
            });
        }

        return deckCardsDto;
    }

    [HttpGet(Name = "GetCards")]
    public IEnumerable<CardDto> Get()
    {
        var user = GetCurrentUser();

        return GetAllUserDeckCards(user);
    }

    [HttpPost(Name = "AddCards")]
    public async Task<IEnumerable<CardDto>> AddAsync([FromBody] CardDto card)
    {
        var user = GetCurrentUser();

        var deckCards = user.Deck.DeckCards;

        var foundCard = deckCards.SingleOrDefault(x => x.Card.Name.Equals(card.Name) && (card.Subname == null || card.Subname.Equals(card.Subname)) && x.Card.IsFoil == card.IsFoil && x.Card.IsBorderless == card.IsBorderless);

        if (foundCard != null)
        {
            foundCard.Amount += 1;
        } else
        {
            var newCard = _dbContext.Cards.Single(x => x.Name.Equals(card.Name) && (x.Subname == null || x.Subname.Equals(card.Subname)) && x.IsFoil == card.IsFoil && x.IsBorderless == card.IsBorderless);
            deckCards.Add(new DeckCard
            {
                Amount = 1,
                CardId = newCard.Id,
                DeckId = user.DeckId
            });
        }

        _dbContext.SaveChanges();

        return GetAllUserDeckCards(user);
    }

    [HttpPost("Delete")]
    public IEnumerable<CardDto> Delete(CardDto card)
    {
        var user = GetCurrentUser();

        var deckCards = user.Deck.DeckCards;

        var foundCard = deckCards.SingleOrDefault(x => x.Card.Name.Equals(card.Name) && (card.Subname == null || card.Subname.Equals(card.Subname)) && x.Card.IsFoil == card.IsFoil && x.Card.IsBorderless == card.IsBorderless);

        if (foundCard.Amount == 1) {
            deckCards.Remove(foundCard);
        }else
        {
            foundCard.Amount -= 1;
        }

        _dbContext.SaveChanges();

        return GetAllUserDeckCards(user);
    }

    [HttpGet("Privacy")]
    [Authorize(Roles = "Administrator")]
    public IActionResult Privacy()
    {
        var claims = User.Claims
            .Select(c => new { c.Type, c.Value })
            .ToList();
        return Ok(claims);
    }

    private User GetCurrentUser()
    {
        string? userEmail = User.Identity?.Name;

        if (string.IsNullOrEmpty(userEmail))
        {
            _logger.LogError("No email address found for current user");
            // return BadRequest();
        }

        var user = _dbContext.Users.Include(x => x.Deck).ThenInclude(x => x.DeckCards).ThenInclude(x => x.Card).FirstOrDefault(x => x.Email == userEmail);

        if (user is null)
        {
            _logger.LogError($"No existing user found email address '{userEmail}'");
            // return BadRequest();
        }

        return user;
    }

    private static IEnumerable<CardDto> GetAllUserDeckCards(User user)
    {
        var deckCardsDto = new List<CardDto>();

        foreach (var deckCard in user.Deck.DeckCards)
        {
            deckCardsDto.Add(new CardDto
            {
                Name = deckCard.Card.Name,
                Subname = deckCard.Card.Subname ?? "",
                Price = deckCard.Card.Price,
                Type = deckCard.Card.Type,
                Amount = deckCard.Amount,
                IsFoil = deckCard.Card.IsFoil,
                IsBorderless = deckCard.Card.IsBorderless
            });
        }

        return deckCardsDto;
    }
}
