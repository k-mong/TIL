export const isNotLoggedIn = (req, res, next) => {
    console.log('isNotLoggedIn 실행');
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      console.log('next 실행!');
      next();
    } else {
      console.log('에러발생');
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect('/error');
    }
};