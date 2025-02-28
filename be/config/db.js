module.exports = {
    HOST : 'localhost',
    USER : 'root',
    PASSWORD : '',
    DB : 'lks-finish',
    dialect : 'mysql',
    pool : {
        max : 5,
        min : 0,
        acquire : 3000,
        idle : 1000
    }
}