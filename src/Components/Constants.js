
export const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const phoneRegExp =
/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const nameRegExp = /^[A-Z][a-z]{1,30}([-'][A-Z][a-z]{1,30})?$/g;
export const userNameRegex= /^[a-zA-Z0-9_-]{3,16}$/;
export const passwordRegex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[^\s])[a-zA-Z\d!@#$%^&*()_+]{10,}$/;
export const userNameMessage="usernames consist of letters, numbers, underscores, and hyphens only"
export const passwordMessage="Password must contain one UpperCase,lowercase,digit and special character"
export const F_NAME= "Enter your first name"
export const MIN_CHARACTER = "must be at least 3 characters long"
export const NAME_regex_message = "Initials should be capital rest small with no spaces"
export const FIRST_NAME_REQUIRE = "First name is required"
export const ENTER_YOUR_LAST_NAME = "Enter your last name"
export const ENTER_YOUR_USERNAME="Enter your username"
export const LAST_NAME_IS_REQUIRED="Last name is required"
export const UNIQUE_USERNAME="Unique username"
export const USERNAME_ALREADY_USE = "Username already in use"
export const USERNAME_IS_REQUIRED="User name is required"
export const USERNAME_LENGTH = "must be at least 8 characters long"
export const ENTER_YOUR_EMAIL = "enter your email"
export const EMAIL_REGEX_VALDATION_MESSAGE ="invalid email expression"
export const UNIQUE_EMAIL="Unique email"
export const EMAIL_ALREADY_IN_USE="Email already in use"
export const EMAIL_VALIDATION="Email is required"
export const ENTER_A_VALID_EMAIL ="Enter a valid email"
export const ENTER_PASSWORD="Enter your password"
export const PASSWORD_LENGTH="Password should be of minimum 8 characters length"
export const PASSWORD_REQUIRE="Password is required"
export const PHONE_REQUIRE="Phone number is required"
export const PHONENO_INVALID="Phone number is not valid"
export const TOO_SHORT="too short"
export const TOO_LONG="too long"




export const error = "Invalid credentials!! Please try again.";

export const accessToken = "accessToken";
export const refreshToken = "refreshToken";

export const addAlbum = "ADD";
export const updateAlbum = "SAVE";


  