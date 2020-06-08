﻿using Abstractions.Model;
using System.Threading.Tasks;

namespace Abstractions.IRepository
{
    /// <summary>Projects repository</summary>
    public interface IProjectRepository
    {
        /// <summary> Get <seealso cref="ProjectPreview"/> (with paging)</summary>
        /// <param name="start">Start</param>
        /// <param name="length">Length</param>
        /// <param name="categoryCode">Category code</param>
        /// <returns><seealso cref="ProjectPreview"/></returns>
        Task<ProjectPreview[]> GetProjectsPreview(int start, int length, string categoryCode);

        /// <summary> Get full specific <seealso cref="Project"/></summary>
        /// <param name="code">Project code</param>
        /// <returns>Full specific <seealso cref="Project"/></returns>
        Task<Project> GetProject(string code);
    }
}
