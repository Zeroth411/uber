# User API Documentation

## Register User
Register a new user in the system by creating a user account with provided information.

**Endpoint:** `POST /users/register`

### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules
- `email`: Must be a valid email format
- `fullname.firstname`: Minimum 3 characters
- `password`: Minimum 6 characters

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "123456"
}
```

### Success Response
**Status Code:** 201 (Created)
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses

#### Validation Error
**Status Code:** 400 (Bad Request)
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    }
  ]
}
```

#### Missing Fields Error
**Status Code:** 400 (Bad Request)
```json
{
  "error": "All fields are required"
}
```

## Login User

Authenticate an existing user and receive an authentication token.

**Endpoint:** `POST /users/login`

### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "123456"
}
```

### Success Response
**Status Code:** 200 (OK)
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses

#### Invalid Credentials
**Status Code:** 401 (Unauthorized)
```json
{
  "message": "Invalid Credentials"
}
```
#### Validation Error
**Status Code:** 400 (Bad Request)
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    }
  ]
}
