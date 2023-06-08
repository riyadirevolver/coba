const InfoWindow = (props) => {
  const { place } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{'test'}</div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>{'wewe'} </span>
        <span style={{ color: 'orange' }}>{String.fromCharCode(9733).repeat(Math.floor(4.6))}</span>
        <span style={{ color: 'lightgrey' }}>{String.fromCharCode(9733).repeat(5 - Math.floor(4.6))}</span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>{'wewe'}</div>
      <div style={{ fontSize: 14, color: 'grey' }}>{'$'.repeat('wewe')}</div>
      <div style={{ fontSize: 14, color: 'green' }}>{'Closed'}</div>
    </div>
  );
};

export default InfoWindow;
