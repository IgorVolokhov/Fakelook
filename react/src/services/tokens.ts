import axios from "axios";

const url = "http://localhost:3001/users/";

export function saveAccessToken(accessToken: string, expiresIn: number = -1) {
  localStorage.setItem("access-token", accessToken);
  if (expiresIn > 0) {
    //refreshAccessToken(expiresIn);
  }
}

export function refreshAccessToken(expiresIn: number) {
  setInterval(() => {
    refreshToken();
  }, (expiresIn - 300) * 1000);
}

export function refreshToken() {
  const refreshToken = localStorage.getItem("refresh-token");
  if (refreshToken === null) {
    return;
  }
  const refreshTokenUrl = url + "refreshtoken";

  axios.post(refreshTokenUrl, { token: refreshToken }).then((res) => {
    const token = res.data.accessToken.token;
    if (token) {
      saveAccessToken(token);
    }
  });
}

export function saveRefreshToken(refreshToken: string): void {
  localStorage.setItem("refresh-token", refreshToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access-token");
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refresh-token");
}

export function deleteTokens(): void {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
}
