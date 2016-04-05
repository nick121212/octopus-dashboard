import * as path from 'path';
import express  from 'express';
import Resource from 'express-resource';
import logger from 'morgan';
import cookieParser  from 'cookie-parser';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import domainMiddleware from 'domain-middleware';
import params from 'express-params';
import consign from 'consign';
import query from 'qs-middleware';
import serveStatic from 'serve-static';
import commonError from 'common-errors';
import passport from 'passport';
import config from './config';
import db from './db';

let app = express();
let corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = config.whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'))
    .use(bodyParser({ uploadDir: './tmp' }))
    .use(bodyParser())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(expressSession({ secret: 'nicktyui', resave: true, saveUninitialized: true }))//, cookie: { maxAge: 600000 }
    .use(passport.initialize())
    .use(passport.session())
    .use(cors(corsOptions))
    .use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    }))
    .use(domainMiddleware({
        server: app,
        killTimeout: 30000,
    }))
    .use(commonError.middleware.crashProtector())
    .use(query())
    .use(serveStatic('public', { 'index': ['index.html', 'index.htm'] }));

params.extend(app);

consign({})
    .include('controllers')
    .then('routes')
    .then('config/strategy')
    .into(app, db, commonError);

// 404 Handler
app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

// 未处理Error Handler
app.use((err, req, res, next) => {
    console.info(err);
    err.status = err.status || 500;

    // 获取用户IP和User Agent
    let hostAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let userAgent = req.headers['user-agent'];
    let originalUrl = req.originalUrl;
    let clientInfo = `Host: ${hostAddr}, UA: ${userAgent}`;
    let errorInfo;

    if (err.status === 404) {
        errorInfo = `* 404: ${originalUrl} ${clientInfo}`;
    } else {
        errorInfo = `*** ${err.status}: ${originalUrl}\nStack: ${err.stack}\n${clientInfo}\n***`;
    }
    // Log
    console.error(errorInfo);
    // HTTP回应
    res.status(err.status);
    res.send(errorInfo);
});

export default app;
