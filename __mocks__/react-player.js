// Mock for react-player to use in Jest tests
const React = require('react');

const ReactPlayer = React.forwardRef((props, ref) => {
  return React.createElement('div', { 
    ...props, 
    ref,
    'data-testid': 'react-player-mock' 
  });
});

ReactPlayer.displayName = 'ReactPlayer';

module.exports = ReactPlayer;
module.exports.default = ReactPlayer;
