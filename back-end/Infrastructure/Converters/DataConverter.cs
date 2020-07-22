﻿using Infrastructure.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Converters
{
    static class DataConverter
    {
        public static Abstractions.Model.Project ToProject(Project project)
        {
            return new Abstractions.Model.Project
            {
                Id = project.Id,
                Code = project.Code,
                Description = project.Description,
                DescriptionShort = project.DescriptionShort,
                DisplayName = project.DisplayName,
                PosterUrl = project.PosterUrl,
                PosterDescription = project.PosterDescription,
                ReleaseDate = project.ReleaseDate,
                Version = project.Version,
                Category = ToCategory(project.Category),
                ExternalUrls = ToExternalUrl(project.ExternalUrls)
            };
        }

        public static Abstractions.Model.ProjectPreview ToProjectPreview(Project project)
        {
            return new Abstractions.Model.ProjectPreview
            {
                Code = project.Code,
                Description = project.Description,
                DisplayName = project.DisplayName,
                PosterDescription = project.PosterDescription,
                PosterUrl = project.PosterUrl,
                ReleaseDate = project.ReleaseDate,
                Category = ToCategory(project.Category)
            };
        }


        private static Abstractions.Model.Category ToCategory(Category category)
        {
            return new Abstractions.Model.Category
            {
                Id = category.Id,
                Code = category.Code,
                DisplayName = category.DisplayName,
                IsEverything = category.IsEverything,
                TotalProjects = -1,
                Version = category.Version
            };
        }

        private static Abstractions.Model.ExternalUrl ToExternalUrl(ProjectExternalUrl dbEntity)
        {
            return new Abstractions.Model.ExternalUrl
            {
                DisplayName = dbEntity.ExternalUrl.DisplayName,
                Id = dbEntity.ExternalUrl.Id,
                Url = dbEntity.ExternalUrl.Url,
                Version = dbEntity.ExternalUrl.Version
            };
        }

        private static IEnumerable<Abstractions.Model.ExternalUrl> ToExternalUrl(ICollection<ProjectExternalUrl> externalUrls)
        {
            var result = new List<Abstractions.Model.ExternalUrl>();

            if (externalUrls == null || !externalUrls.Any())
                return result;

            return externalUrls.Select(x => ToExternalUrl(x));
        }

        public static Abstractions.Model.Introduction ToIntroduction(Introduction item)
        {
            return new Abstractions.Model.Introduction
            {
                Content = item.Content,
                PosterDescription = item.PosterDescription,
                PosterUrl = item.PosterUrl,
                Version = item.Version,
                ExternalUrls = ToExternalUrl(item.ExternalUrls)
            };
        }

        private static IEnumerable<Abstractions.Model.ExternalUrl> ToExternalUrl(ICollection<IntroductionExternalUrl> items)
        {
            return items.Select(x => ToExternalUrl(x));
        }

        private static Abstractions.Model.ExternalUrl ToExternalUrl(IntroductionExternalUrl item)
        {
            return new Abstractions.Model.ExternalUrl
            {
                Id = item.ExternalUrl.Id,
                DisplayName = item.ExternalUrl.DisplayName,
                Url = item.ExternalUrl.Url,
                Version = item.ExternalUrl.Version
            };
        }
    }
}