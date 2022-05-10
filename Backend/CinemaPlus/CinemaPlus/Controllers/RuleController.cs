using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CinemaPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RuleController : ControllerBase
    {
        private readonly IRuleService _ruleService;

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ruleService.GetAllRuleAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var rule = await _ruleService.GetRuleByIdAsync(id);
            if (rule == null)
                throw new Exception("Not found");

            return Ok(rule);
        }
    }
}
