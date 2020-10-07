﻿using Abstractions.Supervision;
using System;
using System.Collections.Generic;
using Xunit;

namespace GeneralTests._Utils
{
    internal static class GenericChecks
    {
        public static void CheckValid<T>(ExecutionResult<T> response)
        {
            Assert.NotEqual(default, response.Data);
            Assert.True(response.IsSucceed);
            Assert.Null(response.Error);
        }

        public static void CheckInvalid<T>(ExecutionResult<T> response)
        {
            if (typeof(T).IsArray)
            {
                Assert.Empty(response.Data as Array);
            }
            else if (response.Data is IEnumerable<T>)
            {
                Assert.Empty(response.Data as IEnumerable<T>);
            }
            else if (typeof(T).IsValueType)
            {
                Assert.Null(response.Data);
            }
            else
            {
                Assert.Equal(default, response.Data);
            }

            Assert.False(response.IsSucceed);
            Assert.NotNull(response.Error);
        }

        public static void CheckEmpty<T>(ExecutionResult<T> response)
        {
            if (typeof(T).IsArray)
            {
                Assert.Empty(response.Data as Array);
            }
            else if (response.Data is IEnumerable<T>)
            {
                Assert.Empty(response.Data as IEnumerable<T>);
            }
            else if (typeof(T).IsValueType)
            {
                Assert.Null(response.Data);
            }
            else
            {
                Assert.Equal(default, response.Data);
            }

            Assert.True(response.IsSucceed);
            Assert.Null(response.Error);
        }
    }
}