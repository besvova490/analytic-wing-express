import JWT from 'jsonwebtoken';

function generateTokens({ id, email }: { id: number, email: string }) {
  const expirationAccess = process.env.EXPRESS_APP_JWT_ACCESS_EXPIRATION_TIME as string;
  const expirationRefresh = process.env.EXPRESS_APP_JWT_REFRESH_EXPIRATION_TIME as string;

  const accessToken = JWT.sign(
    { id, email },
    process.env.EXPRESS_APP_JWT_ACCESS_SECRET as string,
    { expiresIn: +expirationAccess },
  );

  const refreshToken = JWT.sign(
    { id, email },
    process.env.EXPRESS_APP_JWT_REFRESH_SECRET as string,
    { expiresIn: +expirationRefresh },
  );

  return { accessToken, refreshToken };
}

function verifyToken(
  refreshToken: string,
  callback: (args: { accessToken: string, refreshToken: string }) => void,
  errorCallback: (e: unknown) => void,
) {
  JWT.verify(
    refreshToken,
    process.env.EXPRESS_APP_JWT_REFRESH_SECRET as string,
    async (e, user: any) => {
      if (e) return errorCallback(e);

      const {
        accessToken,
        refreshToken: refreshTokenNew,
      } = generateTokens({ id: user.id, email: user.email });

      return callback({ accessToken, refreshToken: refreshTokenNew });
    },
  );
}

export default {
  generateTokens,
  verifyToken,
};
