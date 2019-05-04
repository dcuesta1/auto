export const environment = {
  production: false,
  apiUrl: 'http://auto.test/api',
  homeUrl: 'localhost/',
  passwordStrength: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  const: {
    authToken: 'authToken',
    currentUser: 'user',
    deviceId: 'device',
    impersonate: 'impersonate'
  }
};
