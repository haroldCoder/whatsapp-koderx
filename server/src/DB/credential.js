"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = void 0;
exports.DB_HOST = process.env.DB_HOST || 'bwh6blkptzgz1bm5wbv1-postgresql.services.clever-cloud.com';
exports.DB_USER = process.env.DB_USER || 'uhkr7xzqhiw3onqoifqg';
exports.DB_PASSWORD = process.env.DB_PASSWORD || 'tc8MC1eUTZDUH900NISmfE3ACpoGKT';
exports.DB_NAME = process.env.DB_NAME || 'bwh6blkptzgz1bm5wbv1';
exports.DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
exports.PORT = process.env.PORT || 5000;
