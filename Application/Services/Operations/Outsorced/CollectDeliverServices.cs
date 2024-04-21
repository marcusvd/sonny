using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Domain.Entities.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Exceptions;
using System.Linq;
using System.Net;
using Pagination.Models;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Application.Services.Helpers;
using System.Collections.Generic;


namespace Application.Services.Operations.Outsourced
{
    public class CollectDeliverServices : ICollectDeliverServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CollectDeliverServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<HttpStatusCode> AddAsync(CollectDeliverDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            CollectDeliver entityToDb = _MAP.Map<CollectDeliver>(entityDto);


            entityToDb.Start = DateTime.Now;


            _GENERIC_REPO.CollectDeliver.Add(entityToDb);
            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }



        public async Task<PagedList<CollectDeliverDto>> GetAllPagedAsync(Params parameters)
        {


            Func<IQueryable<CollectDeliver>, IOrderedQueryable<CollectDeliver>> orderBy = null;

            var fromDb = await _GENERIC_REPO.CollectDeliver.GetPaged(
                                         parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.Destiny)
                                         .ThenInclude(x => x.Customer)
                                         .Include(x => x.Destiny)
                                         .ThenInclude(x => x.Partner)
                                         .Include(x => x.BillingFrom)
                                         .ThenInclude(x => x.Customer)
                                         .Include(x => x.BillingFrom)
                                         .ThenInclude(x => x.Partner),
                                         selector => selector,
                                         orderBy,
                                         null
                                       );

            if (parameters.OrderBy != null)
            {

                var orderByObj = JsonSerializer.Deserialize<OrderBy>(parameters.OrderBy);


                if (!string.IsNullOrEmpty(orderByObj.orderbyfield))
                {

                    // if (orderByObj.isdescending)
                    //     orderBy = x => x.OrderByDescending(QueryHelperServices.GetProperty(orderByObj.orderbyfield));
                    // else
                    //     orderBy = x => x.OrderBy(QueryHelperServices.GetProperty(orderByObj.orderbyfield));

                }

                fromDb = await _GENERIC_REPO.CollectDeliver.GetPaged(
                                                        parameters,
                                                        predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                                        toInclude => toInclude.Include(x => x.Destiny)
                                                        .Include(x => x.BillingFrom),
                                                        selector => selector,
                                                        orderBy,
                                                        null
                                                      );

            }


            if (!string.IsNullOrEmpty(parameters.Term))
            {

                fromDb = fromDb = await _GENERIC_REPO.CollectDeliver.GetPaged(
                                parameters,
                                predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                toInclude => toInclude.Include(x => x.Destiny)
                                .Include(x => x.BillingFrom),
                                selector => selector,
                                null
                  //    term => term.Name.ToLower().Contains(parameters.Term.ToLower())
                  //    ||
                  //    term.CNPJ.ToLower().Contains(parameters.Term.ToLower())
                  //    ||
                  //    term.Responsible.ToLower().Contains(parameters.Term.ToLower())
                  //    ||
                  //    term.Contact.Email.ToLower().Contains(parameters.Term.ToLower())


                  );
            }

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CollectDeliverDto> ViewDto = _MAP.Map<List<CollectDeliverDto>>(fromDb);



            var PgDto = new PagedList<CollectDeliverDto>()
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

        public async Task<List<CollectDeliverDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.CollectDeliver.Get(x => x.CompanyId == id && x.Deleted != true).ToListAsync();

            var toReturn = _MAP.Map<List<CollectDeliverDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }


    }

}