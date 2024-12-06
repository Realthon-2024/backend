export interface UserInfo {
  id: string;
}

export interface JwtPayload extends UserInfo {
  signedAt: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  refreshToken: string;
}
