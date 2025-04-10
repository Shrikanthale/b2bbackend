"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./config/db");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const error_1 = require("./helpers/error");
const httpLogger_1 = __importDefault(require("./middlewares/httpLogger"));
const index_1 = __importDefault(require("./routes/index"));
const database_1 = __importDefault(require("./utils/database"));
const app = (0, express_1.default)();
app.use(httpLogger_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/', index_1.default);
app.use((_req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
const errorHandler = (err, _req, res) => {
    (0, error_1.handleError)(err, res);
};
app.use(errorHandler);
const port = process.env.PORT || '8000';
app.set('port', port);
const server = http_1.default.createServer(app);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    console.info(`Server is listening on ${bind}`);
}
(0, db_1.connectDB)();
database_1.default.sync({ alter: true })
    .then(() => console.log('DB synced'))
    .catch((err) => console.error('DB sync error:', err));
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//# sourceMappingURL=app.js.map