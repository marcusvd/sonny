using System;
using System.Net;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.StockProduct.Dtos.Mappers;

using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.StockProduct.ProductKind;
using System.Linq;

namespace Application.Services.Operations.StockProduct
{
    public class ProductServices : IProductServices
    {
        private readonly IStockProductObjectMapperServices _IStockProductObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;

        public ProductServices(
            IUnitOfWork GENERIC_REPO,
            IStockProductObjectMapperServices IStockProductObjectMapperServices
        )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IStockProductObjectMapperServices = IStockProductObjectMapperServices;
        }

        public async Task<HttpStatusCode> AddProductTypeAsync(ProductTypeDto dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var entityToDb = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.ProductTypes.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<HttpStatusCode> AddProductAsync(ProductDto dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var entityToDb = _IStockProductObjectMapperServices.ProductMapper(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Products.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<List<ProductTypeDto>> GetProductTypesIncludedAsync(int companyId)
        {

            var fromDb = await _GENERIC_REPO
                .ProductTypes.Get(
                    predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                    toInclude =>
                        toInclude
                            .Include(x => x.Segments.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Manufacturers.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Models.Where(x => x.Deleted == DateTime.MinValue)),
                    selector => selector
                )
                .ToListAsync();

            if (fromDb == null)
                throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        }
        public async Task<HttpStatusCode> UpdateProductTypeAsync(ProductTypeDto dtoView, int id)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            if (dtoView.Id != id)
                throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.ProductTypes.GetById(
                x => x.Id == id,
                null,
                // toInclude => toInclude.Include(x => x.Segments).ThenInclude(x => x.Manufacturers).ThenInclude(x => x.Models),
                selector => selector
                );

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            var entityToDb = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

            entityToDb.Segments.ForEach(x =>
            {
                if (x.Deleted != DateTime.MinValue)
                {
                    x.Deleted = DateTime.Now;

                        x.Manufacturers.ForEach(xy =>
                        {
                            xy.Deleted = DateTime.Now;

                            xy.Models.ForEach(mxy => mxy.Deleted = DateTime.Now);
                        });
                }

            });

            _GENERIC_REPO.ProductTypes.Update(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<HttpStatusCode> UpdateProductTypeRangeAsync(List<ProductTypeDto> dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.ProductTypes.Get(
                predicate => predicate.CompanyId == dtoView[0].CompanyId && predicate.Deleted == DateTime.MinValue,
                toInclude => toInclude.Include(x => x.Segments).ThenInclude(x => x.Manufacturers).ThenInclude(x => x.Models),
                selector => selector
                ).ToListAsync();

            var entityToDb = _IStockProductObjectMapperServices.ProductTypeUpdateListMake(dtoView, fromDb);

            entityToDb.ForEach(x =>
            {
                if (x.Deleted != DateTime.MinValue)
                {
                    x.Deleted = DateTime.Now;

                    x.Segments.ForEach(y =>
                    {
                        y.Deleted = DateTime.Now;

                        y.Manufacturers.ForEach(xy =>
                        {
                            xy.Deleted = DateTime.Now;

                            xy.Models.ForEach(mxy => mxy.Deleted = DateTime.Now);
                        });
                    });
                }

            });

            _GENERIC_REPO.ProductTypes.UpdateRange(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<List<ProductTypeDto>> GetProductTypesAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.ProductTypes.Get(
                predicate =>
                 predicate.CompanyId == companyId &&
                 predicate.Deleted == DateTime.MinValue,
                 null, selector => selector).ToListAsync();

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        }
     
       
    }
}
