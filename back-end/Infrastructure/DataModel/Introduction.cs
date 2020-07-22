﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.DataModel
{
    [Table("introduction")]
    class Introduction
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("content")]
        public string Content { get; set; }

        [Column("poster_url")]
        public string PosterUrl { get; set; }

        [Column("poster_description")]
        public string PosterDescription { get; set; }

        /// <summary> Version </summary>
        [Column("version")]
        public long Version { get; set; }

        public ICollection<IntroductionExternalUrl> ExternalUrls { get; set; }
    }

}