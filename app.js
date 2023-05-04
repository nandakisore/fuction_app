const sql = require('mssql');

module.exports = async function (context, req) {
    const { name, password } = req.body;
    
    try {
        await sql.connect(process.env.AZURE_SQL_CONNECTION_STRING);
        
        const result = await sql.query(`INSERT INTO User (Name, Password) VALUES ('${name}', '${password}')`);
        
        context.res = {
            status: 200,
            body: { success: true }
        };
    } catch (error) {
        console.log(error);
        
        context.res = {
            status: 500,
            body: { success: false }
        };
    } finally {
        sql.close();
    }
};
