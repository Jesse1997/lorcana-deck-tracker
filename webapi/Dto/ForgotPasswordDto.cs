﻿using System.ComponentModel.DataAnnotations;

namespace webapi.Dto
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? ClientURI { get; set; }
    }
}
