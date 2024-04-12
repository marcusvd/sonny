using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using Pagination.Models;
using Application.Exceptions;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json;
using Application.Services.Operations.Main.Customers.Enums;
using Domain.Entities.Main.Enums;
using Application.Services.Operations.Main.Customers.Search;
using System;
using System.Linq.Expressions;
using Application.Services.Helpers;
using Microsoft.EntityFrameworkCore.Query;
using Domain.Entities.Shared;



namespace Application.Services.Operations.Main.Customers
{
    public class CustomerGetServices : ICustomerGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICustomerSearchService _ICustomerSearchService;
        public CustomerGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP,
                         ICustomerSearchService ICustomerSearchService
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
            _ICustomerSearchService = ICustomerSearchService;
        }

        public async Task<List<CustomerDto>> GetAllAsync()
        {
            List<Customer> entityFromDb = await _GENERIC_REPO.Customers.Get(x => x.Disabled != true, null, x => x, Order => Order.OrderBy(x => x.Id)).ToListAsync();

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> entityDto = _MAP.Map<List<CustomerDto>>(entityFromDb);

            return entityDto;
        }

        public async Task<List<CustomerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Customers.Get(x => x.CompanyId == id && x.Disabled != true).ToListAsync();

            var toReturn = _MAP.Map<List<CustomerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedList<CustomerDto>> GetAllPagedAsync(Params parameters)
        {

            // var searchTerms = JsonSerializer.Deserialize<SearchTerms>(parameters.SearchTerms);

            // Func<IQueryable<Customer>, IOrderedQueryable<Customer>> orderBy = null;

            // if (!string.IsNullOrEmpty(searchTerms.orderbyfield))
            // {
            //     if (searchTerms.isdescending)
            //         orderBy = x => x.OrderByDescending(QueryHelperServices.GetProperty(searchTerms.orderbyfield));
            //     else
            //         orderBy = x => x.OrderBy(QueryHelperServices.GetProperty(searchTerms.orderbyfield));

            // }

            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                              parameters,
                              predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                              toInclude => toInclude.Include(x => x.Contact)
                              .Include(x => x.Address),
                              selector => selector,
                              null,
                              null
                            );

            if (!string.IsNullOrEmpty(parameters.Term))
            {

                fromDb = fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                parameters,
                                predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                toInclude => toInclude.Include(x => x.Contact),
                                selector => selector,
                                null,
                               term => term.Name.ToLower().Contains(parameters.Term.ToLower())
                               ||
                               term.CNPJ.ToLower().Contains(parameters.Term.ToLower())
                               ||
                               term.Responsible.ToLower().Contains(parameters.Term.ToLower())
                               ||
                               term.Contact.Email.ToLower().Contains(parameters.Term.ToLower())

                  //    .Replace("\\D", "")
                  );
            }

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> ViewDto = _MAP.Map<List<CustomerDto>>(fromDb);



            var PgDto = new PagedList<CustomerDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }


        public async Task<PagedList<CustomerDto>> GetAllCustomersByTermSearchPagedAsync(Params parameters)
        {
            var searchTerms = JsonSerializer.Deserialize<SearchTerms>(parameters.SearchTerms);

            Func<IQueryable<Customer>, IOrderedQueryable<Customer>> orderBy = null;

            if (!string.IsNullOrEmpty(searchTerms.orderbyfield))
            {
                if (searchTerms.isdescending)
                    orderBy = x => x.OrderByDescending(QueryHelperServices.GetProperty(searchTerms.orderbyfield));
                else
                    orderBy = x => x.OrderBy(QueryHelperServices.GetProperty(searchTerms.orderbyfield));

            }

            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                           parameters,
                                                           predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                           toInclude => toInclude.Include(x => x.Contact),
                                                           selector => selector,
                                                            orderBy
                                                           );

            var filtered = await _ICustomerSearchService.FilterList(parameters, searchTerms);

            if (filtered != null) fromDb = filtered;

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> ViewDto = _MAP.Map<List<CustomerDto>>(fromDb);

            var PgDto = new PagedList<CustomerDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }



        public async Task<int> GetLengthAsync(int companyId)
        {

            var fromDb = await _GENERIC_REPO.Customers.Get(
                               predicate => predicate.CompanyId == companyId && predicate.Disabled != true,
                               null,
                               selector => selector
                             ).ToListAsync();

            // var totalCustomers = _GENERIC_REPO.Customers.GetCount(x => x.CompanyId == companyId);

            if (fromDb == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return fromDb.Count();

        }

        public async Task<CustomerDto> GetByIdIncludedPhysicallyMovingCosts(int customerId)
        {

            var entityFromDb = await _GENERIC_REPO.Customers.GetById(
                predicate => predicate.Id == customerId && predicate.Disabled != true,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<CustomerDto>(entityFromDb);

            return toReturnViewDto;
        }

        public async Task<CustomerDto> GetByIdAllIncluded(int customerId)
        {

            var entityFromDb = await _GENERIC_REPO.Customers.GetById(
                 predicate => predicate.Id == customerId && predicate.Disabled != true,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts)
                .Include(x => x.AdditionalCosts)
                .Include(x => x.Address)
                .Include(x => x.Company)
                .Include(x => x.PhysicallyMovingCosts)
                .Include(x => x.Contact)
                .ThenInclude(x => x.SocialMedias),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<CustomerDto>(entityFromDb);

            return toReturnViewDto;



        }

    }
}



