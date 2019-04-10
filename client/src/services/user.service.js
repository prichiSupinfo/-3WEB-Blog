export const userService = {
  register,
  login,
  logout
}

function register (username, password, email) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({ 'username': username, 'email': email, 'password': password })
  }

  return fetch('http://localhost:1337/auth/register', requestOptions)
    .then(res => {
      return res.json()
    })
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({ 'username': username, 'password': password })
  }

  return fetch('http://localhost:1337/auth/login', requestOptions)
    .then(res => {
      return res.json()
    })
}

function logout (token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({ 'session': token })
  }

  return fetch('http://localhost:1337/auth/logout', requestOptions)
    .then(res => {
      return res.json()
    })
}
