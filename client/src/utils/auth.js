export const checkPermission = (credentials, onlyAdmin) => {
  const { token, isAuthenticated, user } = credentials;

  if (onlyAdmin) {
    return (
      token &&
      isAuthenticated &&
      user &&
      user.role === 'admin'
    );
  }

  return token && isAuthenticated;
};
