﻿using System;

namespace Common.FirendlyConverters
{
    /// <summary> Convert values to friendly ones </summary>
    public static class FriendlyConvert
    {
        /// <summary> Convert byte length to human-friendly string like '10 Mb' </summary>
        /// <param name="byteCount">Length in bytes</param>
        /// <param name="suffices">Suffices in format: { "B", "KB", "MB", "GB", "TB", "PB", "EB" }</param>
        /// <remarks>
        /// The suffices parameter is available for localization purposes. 
        /// The default values are in English
        /// </remarks>
        /// <returns>User-friendly string, ex.:  '10 Mb'</returns>
        public static string BytesToString(long byteCount, string[] suffices = null)
        {
            if(suffices == null || suffices.Length == 0)
            {
                suffices = new string[] { "B", "KB", "MB", "GB", "TB", "PB", "EB" };
            }

            if (byteCount == 0)
                return $"0 {suffices[0]}";

            var bytes = Math.Abs(byteCount);
            var place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            var num = Math.Round(bytes / Math.Pow(1024, place), 1);

            return $"{Math.Sign(byteCount) * num} {suffices[place]}";
        }
    }
}
