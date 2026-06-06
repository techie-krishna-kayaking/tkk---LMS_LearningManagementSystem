function getDefaultApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:4000/api/v1';
  }

  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  const host = window.location.hostname;
  return `${protocol}//${host}:4000/api/v1`;
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getDefaultApiBaseUrl();

export const DATABRICKS_FALLBACK_URL =
  'https://accounts.cloud.databricks.com/login?account_id=9637a1ab-0a47-420d-b5f1-2f7027b9163f&next_url=%2Foidc%2Faccounts%2F9637a1ab-0a47-420d-b5f1-2f7027b9163f%2Fv1%2Fauthorize%3Fclient_id%3Dcef6a689-ce26-45d0-bc87-17bef342fbba%26redirect_uri%3Dhttps%253A%252F%252Faccounts.cloud.databricks.com%252Foidc%252Fconsume%26state%3DP2xvZ2luVXNpbmdJZHA9ZGF0YWJyaWNrcyZuZXh0X3VybD0lMkZlZGl0b3IlMkZub3RlYm9va3MlMkYzMzEwMTkyMDIxMDYzNTE5JTNGbyUzRDc0NzQ2NTU5MzIxODE4MDclMjNjb21tYW5kJTJGODA4OTAwNDY4MDE1MzcyOCZhY2NvdW50X2lkPTk2MzdhMWFiLTBhNDctNDIwZC1iNWYxLTJmNzAyN2I5MTYzZiZhdXRoX3JlcXVlc3RfaWQ9Y2U0MTU4MjAtYThjNS00NWJlLTg4ODQtZWIwOWUxNDIxMmI0Jm5vbmNlX25hbWU9b2F1dGhfbm9uY2VfNDBmMjc5ZjYmcmlpZD05MzU0YTg3MS0zNzY1LTRhNDktOGNiMS0xZTI1MTU2Y2NiMzMmbz03NDc0NjU1OTMyMTgxODA3%26response_type%3Did_token%26nonce%3Da912df4d-d114-4b0c-b51b-0d5f037e5358%26access_type%3Doffline%26include_granted_scopes%3Dtrue%26response_mode%3Dform_post%26scope%3Dopenid%2Bemail&lakehouse=true&tuuid=3c620ede-6882-482d-ae41-036af47982bb';
