let io;

module.exports = {
  /**
   * Init the socket instance
   * 
   * @param {Object} server 
   * @returns io
   */

  init: function (server) {
    // start socket.io server and cache io value
    io = require('socket.io')(server, {
      transports: ['websocket', 'polling'],
      pingTimeout: 40000,
      maxHttpBufferSize: 1e8,
    });
    return io;
  },

  /**
   * Get tht socket instance
   * 
   * @returns io
   */
  getio: function () {
    // return previously cached value
    if (!io) throw new Error("must call .init(server) before you can call .getio()");
    return io;
  }
}