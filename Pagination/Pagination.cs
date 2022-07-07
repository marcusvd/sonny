﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Pagination
{
    public static class Pagination
    {
        public static void AddPagination(this HttpResponse response,
                                         int TotalItems,
                                         int pgSize,
                                         int CurrentPg,
                                         int TotalPg,
                                         bool HasNext,
                                         bool HasPrevious

         )

        {
            var Pagination = new PaginationHeader(TotalItems,
                                                    pgSize,
                                                    CurrentPg,
                                                    TotalPg,
                                                    HasNext,
                                                    HasPrevious
            );
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(Pagination, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }











    }
}