using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using API.DTOs;

namespace API.Controllers
{
    public class AccountsController : BaseAPIController
    {
       private readonly DataContext __context;
        public AccountsController(DataContext _context)
        {
            __context = _context;
        }
         
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register([FromBody] RegisterDTO registerDTO)
        {    
            //return await __context.MyProperty.ToListAsync();
                if(await UserExists(registerDTO.Username)) return BadRequest("user exists");
                var hmac=new HMACSHA512();
                AppUser user=new AppUser ()
                {
                    UserName=registerDTO.Username.ToLower(),
                    PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                    PasswordSalt=hmac.Key
                };

                __context.MyProperty.Add(user);
                await __context.SaveChangesAsync();
                return user;

        }
        
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDTO loginDTo)
        {
            AppUser user=await __context.MyProperty.SingleOrDefaultAsync(x=>x.UserName==loginDTo.Username.ToLower());
            if(user==null) return Unauthorized("invalid username"); 
            
           
                using HMAC hMAC=new HMACSHA512(user.PasswordSalt);
                var Computedpassword=hMAC.ComputeHash(Encoding.UTF8.GetBytes(loginDTo.Password));

                for(int i=0;i<Computedpassword.Length;i++)
                {
                    if(Computedpassword[i]!=user.PasswordHash[i])  return Unauthorized("Wrong password");
                }
               

            return user;
        }
        public async  Task<bool> UserExists(string username)
        {
            return await  __context.MyProperty.AnyAsync(x=>x.UserName==username.ToLower());
        }
    }
}