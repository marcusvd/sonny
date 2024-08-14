using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using System.Net;

namespace Application.Services.Operations.Finances
{
    public class CategoryExpensesServices : ICategoryExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public CategoryExpensesServices(IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {

            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<HttpStatusCode> AddAsync(CategoryExpensesDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var toDb = _MAP.Map<CategoryExpenses>(entityDto);

            _GENERIC_REPO.CategoriesExpenses.Add(toDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }

        public async Task<List<CategoryExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CategoriesExpenses.Get(
             predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
             toInclude => toInclude.Include(x => x.SubcategoriesExpenses.Where(x => x.Deleted != true)),
             selector => selector
             ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CategoryExpensesDto>>(fromDb);

            return toViewDto;
        }

        public async Task<HttpStatusCode> UpdateAsync(int categoryExpensesId, CategoryExpensesDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (categoryExpensesId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.CategoriesExpenses.GetById(
                x => x.Id == categoryExpensesId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);

            _GENERIC_REPO.CategoriesExpenses.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
        public async Task<HttpStatusCode> DeleteFakeAsync(int categoryExpensesId)
        {

            var fromDb = await _GENERIC_REPO.CategoriesExpenses.GetById(
                x => x.Id == categoryExpensesId,
                null,
                selector => selector
                );

            fromDb.Deleted = true;

            _GENERIC_REPO.CategoriesExpenses.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }



        public Task<PagedList<CategoryExpensesDto>> GetAllPagedAsync(Params parameters)
        {
            throw new NotImplementedException();
        }

        public Task<CategoryExpensesDto> GetByIdAllIncluded(int monthFixedExpensesId)
        {
            throw new NotImplementedException();
        }
    }
}