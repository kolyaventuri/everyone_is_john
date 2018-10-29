import * as urls from '../../lib/common/api-urls';

const handleError = _ => {
  fetch(urls.ERROR_LOGGER, {method: 'POST'})
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
};

export default handleError;
