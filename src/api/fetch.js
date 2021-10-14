const localhost = 'http://localhost:3000/';

export default (params = {}, host = localhost) => {
  const { body, method, path = '' } = params;
  const url = `${host}${path}`;
  const payload = {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    payload.body = JSON.stringify(body);
  }

  return fetch(url, payload)
    .then((response) => {
      const responseStatusFirstNumber = `${response.status}`[0];

      if (responseStatusFirstNumber !== '2') {
        response.json().then(error => new Error(error.message));
        return;
      }

      return response.json();
    })
    .catch(error => error);
};
