﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Infrastructure.DataModel
{
    [Table("external_url")]
    [ExcludeFromCodeCoverage]
    internal class ExternalUrl
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("display_name")]
        public string DisplayName { get; set; }

        [Required]
        [Column("url")]
        public string Url { get; set; }
        
        [Required]
        [Column("version")]
        public long Version { get; set; }
    }
}
