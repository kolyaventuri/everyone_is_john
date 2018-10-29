import * as urls from '../../lib/common/api-urls';

const headers = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'}
};

const handleError = err => {
  const body = JSON.stringify({err});

  fetch(urls.ERROR_LOGGER, Object.assign({body}, headers))
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
};

export default handleError;
