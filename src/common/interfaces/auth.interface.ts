export interface UserInfo {
  id: number;
}

export interface JwtPayload extends UserInfo {
  signedAt: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  refreshToken: string;
}
