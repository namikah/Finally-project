using AutoMapper;
using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;

namespace CinemaPlus.Services.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<News, NewsDto>().ReverseMap();
        }
    }
}
