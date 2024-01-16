export const isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn 실행');
    console.log('req.isAuthenticated()', req.isAuthenticated());
      if (req.isAuthenticated()) {
        next();
      } else {
        res.status(403).send('로그인 필요');
      }
  };
    
   