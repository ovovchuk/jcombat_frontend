export class AppProperties {
  static API_SERVER = 'http://localhost:8080/api';
  static AUTH_ENDPOINT = AppProperties.API_SERVER + '/oauth/token';
  static CLIENT_AUTH_HASH = 'dHJ1c3RlZENsaWVudDp3amNzZWM=';
  static WS_ENDPOINT = AppProperties.API_SERVER + '/jcombat';
  static ADMIN_ROLE = 'ROLE_ADMIN';
  static NOTIFICATION_OPTIONS = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };
}

