module.exports = {
    register: async (request, response, next) => {
        console.log('reach register');
        response.writeHead(200,{'type':'text/html'});
        response.write("lol");
        response.end();
    },

    login: async (request, response, next) => {
        console.log('reach login');
        response.writeHead(200,{'type':'text/html'});
        response.write("lol");
        response.end();
    }
}