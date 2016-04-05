var DEBUG = false;

var deepstreamClient = require( 'deepstream.io-client-js' );
var TrelloCardReader = require( './trello-cards-reader' );

var ds = deepstreamClient( 'localhost:6022' );
var trelloCardsReader = new TrelloCardReader();

ds.login( { username: 'trello-provider' }, listenForSubscriptions );

function listenForSubscriptions() {
  ds.record.listen( 'trello/.*', onSubscription );
}

/**
 * @param {string} recordName The name of the record that has been subscribed to
 * @param {boolean} isSubscribed Whether the subject is being subscribed too or disposed of.
 */
function onSubscription( recordName, isSubscribed ) {
  DEBUG && console.log('recordName: ', recordName);
  /**
   * Get the record from your cache
   */
  var record = ds.record.getRecord( recordName );
  /**
   * If isSubscribed is false no clients are interested in this
   */
  if( isSubscribed === false ) {
    record.discard();
    trelloCardsReader.discardCards();
  }
  /**
   * If isSubscribed is true the currency pair has been requested by a client
   * so start fetching the cards accordingly
   */
  else {
    trelloCardsReader.getCards( function( cards ) {
      record.set( 'cards', cards );
    });
  }
}
