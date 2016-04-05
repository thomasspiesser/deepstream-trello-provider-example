var DEBUG = false;

var Trello = require("node-trello");

function TrelloCardReader() {
  this.trello = new Trello("<your key>", "<token>");
  this.cards = [];
  this.query = "/1/members/me" 
  this.options = { cards: "open" } 
}

TrelloCardReader.prototype._makeRequest = function( callback ) {
  DEBUG && console.log('_makeRequest');
  this.trello.get( this.query, this.options, function( err, data ) {
    DEBUG && console.log('_onResponse');
    if (err) throw err;
    DEBUG && console.log('data: ', data);
    // handle data
    this.cards = data.cards;
    DEBUG && console.log('this.cards.length: ', this.cards.length);
    DEBUG && console.log('calling callback function now..');
    callback( this.cards );
  });
};

TrelloCardReader.prototype.getCards = function( callback ) {
  DEBUG && console.log('getCards');
  // make request immediately
  this._makeRequest( callback )
  // then repeat it
  makeRequest = this._makeRequest.bind( this, callback );
  var interval = setInterval( makeRequest, 5000 );
};

TrelloCardReader.prototype.discardCards = function() {
  clearInterval( interval );
};

module.exports = TrelloCardReader;
