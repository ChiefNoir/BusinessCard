﻿using Abstractions.IRepository;
using BusinessService.Logic.Supervision;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers.Public
{
    [ApiController]
    [Route("api/v1/")]
    public class PublicCategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public PublicCategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await Supervisor.SafeExecuteAsync(() =>
            {
                return _categoryRepository.GetCategories();
            });

            return new JsonResult(result);
        }

        [HttpGet("categories/{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var result = await Supervisor.SafeExecuteAsync(() =>
            {
                return _categoryRepository.GetCategory(id);
            });

            return new JsonResult(result);
        }

        [HttpGet("categories/everything")]
        public async Task<IActionResult> GetEverythingCategory()
        {
            var result = await Supervisor.SafeExecuteAsync(() =>
            {
                return _categoryRepository.GetEverythingCategory();
            });

            return new JsonResult(result);
        }

    }
}