import React from 'react';
import AddButton from 'components/AddButton';

class Administration extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('hey');
  }

  render() {
    return (
      <div>
        <h1>Administration</h1>
        <p>För att lägga till en admin</p>
        <AddButton onClick={() => {}}>Lägg till admin</AddButton>
      </div>
    );
  }
}

export default Administration;
