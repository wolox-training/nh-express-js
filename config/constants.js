exports.EMAIL_REGEX = /^(\w|\.)+@wolox\.(com\.ar|co|mx|cl)$/;

exports.EMAIL_ERROR = 'Email should belong to Wolox';

exports.EMAIL_CONFLICT = 'The email provided is already linked to an account';

exports.USER_CREATE_ERROR = 'Cannot create user';
exports.USER_FIND_ERROR = 'Cannot get user';
exports.LIST_USERS_ERROR = 'Cannot get users';

exports.WEET_CREATE_ERROR = 'Cannot create weet';
exports.WEET_API_ERROR = 'The service responded with the code ';
exports.WEET_LENGTH_ERROR = 'The weet was too long';

exports.USER_CREDENTIALS_ERROR = 'Login failed: Invalid username or password';

exports.BEARER_ERROR = 'Not a Bearer token';
exports.NO_TOKEN_ERROR = 'No token provided';
exports.INVALID_TOKEN_ERROR = 'Invalid or expired token';

exports.ADMIN_TOKEN_ERROR = 'Token provided does not have admin access';
exports.ADMIN_CONFLICT = 'User was already an admin';
