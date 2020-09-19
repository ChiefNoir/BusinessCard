﻿namespace Infrastructure.Resources
{
    /// <summary> User-friendly messages</summary>
    static class TextMessages
    {
        /// <summary> The {0} was already changed. Refresh editor. </summary>
        internal const string ItemWasAlreadyChanged = "The {0} was already changed. Refresh editor.";

        /// <summary> Database is corrupted: Introduction is missing. </summary>
        internal const string IntroductionIsMissing = "Database is corrupted: Introduction is missing.";

        /// <summary> Can't delete new {0} </summary>
        internal const string CantDeleteNewItem = "Can't delete new {0}";

        /// <summary> Can't delete system category </summary>
        internal const string CantDeleteSystemCategory = "Can't delete system category";

        /// <summary> Can't update new {0} </summary>
        internal const string CantUpdateNewItem = "Can't update new {0}";

        /// <summary> Can't create existing {0} </summary>
        internal const string CantCreateExistingItem = "Can't create existing {0}";

        /// <summary> Can't delete new {0} </summary>
        internal const string WasAlreadyDeleted = "{0} was already deleted";

        /// <summary> The property {0} can't be empty </summary>
        internal const string ThePropertyCantbeEmpty = "The {0} can't be empty";

        /// <summary> The category {0} does not exist </summary>
        internal const string TheCategoryDoesNotExist = "The category {0} does not exist";

        /// <summary> {0} duplicate </summary>
        internal const string PropertyDuplicate = "{0} duplicate";

        /// <summary> Login is empty </summary>
        internal const string AccountEmptyLogin = "Login is empty";

        /// <summary> Password is empty </summary>
        internal const string AccountEmptyPassword = "Password is empty";

        /// <summary> Wrong login or password </summary>
        internal const string AccountSomethingWrong = "Wrong login or password";

    }
}
