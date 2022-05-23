using AutoMapper;
using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IRepository<Message> _messageRepository;
        private readonly IMessageService _messageService;

        public MessageController(IRepository<Message> messageRepository, IMessageService messageService)
        {
            _messageRepository = messageRepository;
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _messageService.GetAllMessageAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var message = await _messageService.GetMessageByIdAsync(id);
            if (message == null)
                throw new Exception("Not found");

            return Ok(message);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Message message)
        {
            message.IsDeleted = false;
            message.IsRead = false;

            await _messageService.AddAsync(message);

            return Ok(message);
        }
    }
}
