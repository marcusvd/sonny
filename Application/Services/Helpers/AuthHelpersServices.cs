using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Application.Contracts.Authentication;
using Application.Dto.Authentication;
using Application.Exceptions;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Helpers
{

    public class AuthHelpersServices : IAuthHelpersServices
    {
        private readonly UserManager<MyUser> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _iMapper;
        private readonly IUrlHelper _url;
        private readonly IConfiguration _configuration;
        private readonly IConfigurationSection _jwtSettings;
        public AuthHelpersServices(
            UserManager<MyUser> userManager,
            IUrlHelper url,
            RoleManager<Role> roleManager,
            IMapper iMapper,
           IConfiguration configuration
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _iMapper = iMapper;
            _url = url;
            _configuration = configuration;
            _jwtSettings = _configuration.GetSection("JwtSettings");

        }
        public void ObjIsNull(object obj)
        {
            if (obj == null) throw new AuthServicesException("Objeto usuário era nulo.");

        }
        public async Task<bool> NameIsDuplicate(string userName)
        {
            var myUser = await _userManager.FindByNameAsync(userName);

            if (myUser != null) throw new AuthServicesException("Nome de usuário ja cadastrado.");

            return false;
        }
        public async Task<bool> EmailIsDuplicate(string email)
        {
            var myUser = await _userManager.FindByEmailAsync(email);

            if (myUser != null) throw new AuthServicesException("Email ja cadastrado.");

            return false;
        }
        public async Task<bool> IsLockedOutAsync(MyUser myUser)
        {
            return !await _userManager.IsLockedOutAsync(myUser);
        }
        public async Task<bool> IsEmailConfirmedAsync(MyUser myUser)
        {
            if (!await _userManager.IsEmailConfirmedAsync(myUser))
                throw new AuthServicesException("Email precisa ser confirmado! Acesse seus emails, caso não o encontre na caixa de entrada olhe na caixa de spam. Obrigado!");

            return true;
        }
        public async Task<bool> CheckPasswordAsync(MyUser myUser, string user)
        {
            var result = await _userManager.CheckPasswordAsync(myUser, user);
            if (result)
            {
                await _userManager.ResetAccessFailedCountAsync(myUser);
                return true;
            }
            else
            {
                await _userManager.AccessFailedAsync(myUser);
            }
            throw new AuthServicesException("Usuário ou senha incorreto.");
        }
        public async Task<bool> GetTwoFactorEnabledAsync(MyUser myUser)
        {
            return await _userManager.GetTwoFactorEnabledAsync(myUser);
        }
        public async Task<IList<string>> GetValidTwoFactorProvidersAsync(MyUser myUser)
        {
            return await _userManager.GetValidTwoFactorProvidersAsync(myUser);
        }
        public async Task<string> GenerateTwoFactorTokenAsync(MyUser myUser, string provider)
        {
            if (provider == null) throw new AuthServicesException("provedor era nulo");

            return await _userManager.GenerateTwoFactorTokenAsync(myUser, provider);
        }
        public async Task<MyUser> UpdateUserAsync(int id, MyUser user)
        {
            if (id != user.Id) throw new AuthServicesException("Dados inválidos. id's não coincidem.");

            var myUser = await _userManager.FindByIdAsync(id.ToString());

            if (myUser == null) throw new AuthServicesException("Usuário não encontrado.");

            myUser = user;

            await _userManager.UpdateAsync(myUser);


            return myUser;
        }
        public async Task<MyUser> FindUserByEmailAsync(string email)
        {
            var myUser = await _userManager.FindByEmailAsync(email);

            if (myUser == null) throw new AuthServicesException("Usuário não encontrado.");

            return myUser;
        }
        public async Task<List<MyUser>> FindAllUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            if (users == null) throw new AuthServicesException("Nenhum Usuário não encontrado.");

            return users;
        }
        public async Task<MyUser> FindUserByNameAsync(string name)
        {
            var myUser = await _userManager.Users.Include(x => x.Company).SingleAsync(x => x.UserName == name);

            if (myUser == null) throw new AuthServicesException("Usuário não encontrado.");

            return myUser;
        }
        public async Task<MyUser> FindUserByIdAsync(int id)
        {
            var myUser = await _userManager.FindByIdAsync(id.ToString());

            if (myUser == null) throw new AuthServicesException("Usuário não encontrado.");

            return myUser;
        }
        public async Task<bool> VerifyTwoFactorTokenAsync(MyUser myUser, string email, T2FactorDto t2Factor)
        {
            var result = await _userManager.VerifyTwoFactorTokenAsync(myUser, email, t2Factor.Token);

            if (!result) throw new AuthServicesException("Token expirado ou inválido.");

            return result;
        }
        public async Task<bool> UserWasRegistered(MyUser user, string password)
        {
            var register = await _userManager.CreateAsync(user, password);

            if (!register.Succeeded) throw new AuthServicesException("Error: Não foi possível cadastrar o usuário, verifique os dados e tente novamente, obrigado!");

            return register.Succeeded;
        }
        public MyUser User(string userName, string email, string companyName)
        {

            var myUser = new MyUser()
            {
                UserName = userName,
                Email = email,
                Company = new Company(companyName),
            };

            return myUser;
        }
        public async Task<IdentityResult> UserUpdateAsync(MyUser user)
        {
            var myUser = await _userManager.FindByIdAsync(user.Id.ToString());

            if (myUser == null) throw new AuthServicesException("Usuário não encontrado.");
            if (myUser.Id != user.Id) throw new AuthServicesException("Erro: Ids não são iguais.");

 
            var userUpdated = await _userManager.UpdateAsync(user);

            if (!userUpdated.Succeeded) throw new AuthServicesException("Erro ao tentar atualizar.");

            return userUpdated;
        }
        public MyUserDto MyUserToMyUserDto(MyUser user)
        {
            var myUserDto = _iMapper.Map<MyUserDto>(user);
            return myUserDto;
        }

        public async Task<string> UrlEmailConfirm(MyUser myUser, string controller, string action)
        {

            var urlConfirmMail = _url.Action(action, controller, new
            {
                token = await _userManager.GenerateEmailConfirmationTokenAsync(myUser),
                email = myUser.Email
            }).Remove(0, 29);

            if (urlConfirmMail == null) throw new AuthServicesException("O link não pode ser gerado.");

            return urlConfirmMail;
        }
        public async Task<bool> ConfirmingEmail(MyUser myUser, ConfirmEmailDto confirmEmail)
        {
            var result = await _userManager.ConfirmEmailAsync(myUser, confirmEmail.Token);

            return result.Succeeded;

        }
        public async Task<bool> PasswordReseted(ResetPasswordDto resetPassword)
        {
            var myUser = await _userManager.FindByEmailAsync(resetPassword.Email);

            IdentityResult identityResult = await _userManager.ResetPasswordAsync(myUser, resetPassword.Token, resetPassword.Password);

            if (!identityResult.Succeeded) throw new AuthServicesException($"Error: {identityResult}");

            return identityResult.Succeeded;
        }
        public async Task<string> UrlPasswordReset(MyUser myUser, string controller, string action)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(myUser);

            var urlReset = _url.Action(action, controller, new { token = token, email = myUser.Email }).Remove(0, 15);

            if (urlReset == null) throw new AuthServicesException("O link não pode ser gerado.");

            return urlReset;
        }

        //ROLES
        public async Task<IdentityResult> CreateRole(RoleDto role)
        {
            var roleDtoToRoleEntity = _iMapper.Map<Role>(role);

            var result = await _roleManager.CreateAsync(roleDtoToRoleEntity);

            return result;
        }
        public async Task<string> UpdateUserRoles(UpdateUserRoleDto model)
        {
            var myUser = await _userManager.FindByNameAsync(model.UserName);

            if (myUser == null) throw new AuthServicesException("Usuário era nulo.");

            if (model.Delete)
            {
                await _userManager.RemoveFromRoleAsync(myUser, model.Role);
                return "Role removed";
            }
            else
            {
                await _userManager.AddToRoleAsync(myUser, model.Role);
                return "Role Added";
            }

            throw new AuthServicesException("Erro desconhecido.");

        }
        public async Task<IList<string>> GetRoles(MyUser user)
        {
            var role = await _userManager.GetRolesAsync(user);
            return role;
        }

        //ClAIMS

        public async Task<List<Claim>> GetClaims(MyUserDto user, Task<IList<string>> roles)
        {
            var userToUserDto = _iMapper.Map<MyUser>(user);

            var getRoles = await roles;

            var claims = new List<Claim>
            {
              new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
              new Claim(ClaimTypes.Name, user.UserName),
            };

            foreach (var role in getRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }








        // public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, Task<List<Claim>> claims)
        // {
        //     var tokenOptions = new JwtSecurityToken(
        //       issuer: _jwtSettings["sonny_Issuer"],
        //       audience: _jwtSettings["sonny_Audience"],
        //       claims: claims.Result,
        //       expires: DateTime.Now.AddHours(Double.Parse(_jwtSettings["expiresHours"])),
        //       signingCredentials: signingCredentials
        //   );

        //     if (tokenOptions == null)
        //         throw new AuthServicesException("O token era nulo");

        //     return tokenOptions;
        // }

        // public string jwtSecurityTokenHandler(JwtSecurityToken jwtSecurityToken)
        // {
        //     jwtSecurityToken.
        //     return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        // }



        // public UserToken GenerateUserToken(MyUserDto user)
        // {
        //     var jwt = GenerateTokenOptions(GetSigningCredentials(), GetClaims(user));
        //     jwtSecurityTokenHandler(jwt);


        // }

    }
}