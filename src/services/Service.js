const ENDPOINT = 'https://randomuser.me/api/?results=50';

const getApi= () => fetch(ENDPOINT).then(response => response.json());

export {getApi};