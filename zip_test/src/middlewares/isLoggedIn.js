export const isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn 실행');
      if (req.isAuthenticated()) {
        next();
      } else {
        res.status(403).send('로그인 필요');
      }
  };
    
   