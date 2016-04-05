import passport from 'passport';
import LocalStrategy, {Strategy} from 'passport-local';

module.exports = (app) => {
    passport.use('local', new LocalStrategy(
        (username, password, done)=> {
            if (username == password && username == "nick") {
                return done(null, {
                    nickname: "nick"
                });
            }
            let error = new Error("");
            error.status = 403;
            return done(null, false, new Error());
        }));

    passport.serializeUser((user, done) => {//保存user对象
        done(null, user);//可以通过数据库方式操作
    });

    passport.deserializeUser((user, done)=> {//删除user对象
        done(null, user);//可以通过数据库方式操作
    });
}