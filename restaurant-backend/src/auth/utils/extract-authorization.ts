export interface IAuthorization {
  scheme: string;
  token: string;
}

// Apró segédfüggvény az authorizációs http header feldolgozásához.
export function extractAuthorizationHeader(request: any): IAuthorization {
  const result = {
    scheme: null,
    token: null
  };

  if (request) {
    const authorizationHeader =
      request.get('Authorization') || request.headers['Authorization'];

    if (authorizationHeader) {
      const splitHeader = authorizationHeader.split(' ');
      result.scheme = splitHeader[0];
      result.token = splitHeader[1];
    }
  }

  return result;
}