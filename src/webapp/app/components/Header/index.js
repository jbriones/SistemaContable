import React, { PropTypes } from 'react';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import HeaderContainer from '../../components/containers/HeaderContainer';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { profile } = this.props;

    let userContent = null;
    if (profile) {
      userContent = (<p>
          Bienvenido, <strong>{profile.usuario}</strong>
      </p>);
    }

    return (
      <HeaderContainer>
        <Card>
          <CardTitle title="Sistema Web Referidos" subtitle={userContent} />
          <CardActions>
            <FlatButton label="Cerrar Sesión" onClick={this.props.logout} />
          </CardActions>
        </Card>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  logout: PropTypes.func,
};

export default Header;
