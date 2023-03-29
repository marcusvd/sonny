using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Identity;
using Application.Dto.Authentication;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Application.Contracts.Authentication
{
    public interface IAuthHelpersServices
    {
        void ObjIsNull(object obj);
        Task<bool> NameIsDuplicate(string userName);
        Task<bool> EmailIsDuplicate(string email);
        Task<bool> IsLockedOutAsync(MyUser myUser);
        Task<bool> IsEmailConfirmedAsync(MyUser myUser);
        Task<bool> CheckPasswordAsync(MyUser myUser, string user);
        Task<bool> GetTwoFactorEnabledAsync(MyUser myUser);
        Task<IList<string>> GetValidTwoFactorProvidersAsync(MyUser myUser);
        Task<string> GenerateTwoFactorTokenAsync(MyUser myUser, string provider);
        Task<MyUser> FindByEmailAsync(string email);
        Task<MyUser> FindByNameAsync(string name);
        Task<MyUser> FindByIdAsync(int id);
        Task<bool> VerifyTwoFactorTokenAsync(MyUser myUser, string email, T2FactorDto t2Factor);
        Task<bool> UserWasRegistered(MyUser user, string password);
        MyUser User(string userName, string email, string companyName);
        MyUserDto MyUserToMyUserDto(MyUser user);
        Task<IdentityResult> UserUpdate(MyUser user);
        Task<string> UrlEmailConfirm(MyUser myUser, string controller, string action);
        Task<bool> ConfirmingEmail(MyUser myUser, ConfirmEmailDto confirmEmail);
        Task<bool> PasswordReseted(ResetPasswordDto resetPassword);
        Task<string> UrlPasswordReset(MyUser myUser, string controller, string action);

        //ROLES
        Task<IdentityResult> CreateRole(RoleDto role);
        Task<string> UpdateUserRoles(UpdateUserRoleDto model);
        Task<IList<string>> GetRoles(MyUser user);

        //ClAIMS
        Task<List<Claim>> GetClaims(MyUserDto user, Task<IList<string>> roles);

    }
}