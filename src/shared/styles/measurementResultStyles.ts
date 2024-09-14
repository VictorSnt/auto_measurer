const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginBottom: '10px',
  textAlign: 'center',
};

const imageContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '300px',
  objectFit: 'contain',
  borderRadius: '8px',
};

const measureContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
};

const measureTitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
};

const measureValueStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#333',
};

const confirmationContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '300px',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

const confirmButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: '#6c757d',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export const measureResultStyles = {
  containerStyle,
  titleStyle,
  imageContainerStyle,
  imageStyle,
  measureContainerStyle,
  measureTitleStyle,
  measureValueStyle,
  confirmationContainerStyle,
  inputStyle,
  buttonContainerStyle,
  confirmButtonStyle,
  cancelButtonStyle,
};