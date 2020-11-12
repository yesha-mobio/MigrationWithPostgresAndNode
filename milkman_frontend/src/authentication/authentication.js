export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    const token = data.signin;
    // const token = data.data.signin;
    localStorage.setItem("TOKEN", JSON.stringify(token));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("TOKEN")) {
    return JSON.parse(localStorage.getItem("TOKEN"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("TOKEN");
    next();
  }
};
