import * as urls from '../../lib/common/api-urls';

const headers = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'}
};

const handleError = err => {
  const body = JSON.stringify({err});

  console.error(err);
  fetch(urls.ERROR_LOGGER, Object.assign({body}, headers))
    .catch(error => console.error(error));
};

export default handleError;
