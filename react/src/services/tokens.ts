import axios from "axios";

const url = "http://localhost:3001/users/";
let inervalId: any = null;

export function saveAccessToken(accessToken: string, expiresIn: number = -1) {
  console.log("saved token");

  localStorage.setItem("access-token", accessToken);
  if (expiresIn > 0) {
    refreshAccessToken(expiresIn);
  }
}

export function refreshAccessToken(expiresIn: number) {
  const refreshToken = localStorage.getItem("refresh-token");
  if (refreshToken === null) {
    return;
  }
  if (inervalId !== null) {
    clearInterval(inervalId);
  }
  const refreshTokenUrl = url + "refreshtoken";
  inervalId = setInterval(() => {
    axios.post(refreshTokenUrl, { token: refreshToken }).then((res) => {
      const { token } = res.data.accessToken;
      saveAccessToken(token);
    });
  }, (expiresIn - 50) * 1000);
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
