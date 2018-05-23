import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-flexbox-grid';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PrincipalContainer from '../../components/containers/PrincipalContainer';

import { login } from '../../containers/LoginPage/actions';
import {
  makeLoading,
  makeProfile,
  makeError,
  makeErrorMge,
} from '../../containers/LoginPage/selectors';

import { saveProfile } from '../../utils/profileHelpers';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    /* eslint-disable no-underscore-dangle */
    super(props);
    this.state = {
      form: {
        usuario: null,
        clave: null,
      },
      formError: {
        usuario: null,
        clave: null,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile;
    if (profile && profile.usuario) {
      saveProfile(profile);
      this.props.goToPrincipal();
    }
  }

  onChange = (e, v) => {
    switch (e.target.name) {
      case 'txtUsuario':
        this.state.form.usuario = v;
        break;
      case 'txtClave':
        this.state.form.clave = v;
        break;
      default:
        break;
    }
    this.validateForm();
  }

  validateForm = () => {
    let isValid = true;
    const error = {
      usuario: null,
      clave: null,
    };
    if (!this.state.form.usuario) { isValid = false; error.usuario = 'Ingrese usuario'; }
    if (!this.state.form.clave) { isValid = false; error.clave = 'Ingrese clave'; }
    this.setState({ formError: error });
    return isValid;
  }

  handleAceptar = () => {
    if (this.validateForm()) {
      this.props.login(this.state.form);
    }
  }

  render() {
    const { loading, error, errorMge } = this.props;

    if (loading) {
      return <span>Iniciando sesión...</span>;
    }

    let errorContent = null;
    if (error) {
      errorContent = <h3>{errorMge}</h3>;
    }

    return (
      <PrincipalContainer>
        <Row middle="lg">
          <Col xsOffset={3} xs={6}>
            <Card>
              <CardTitle
                title="Sistema Web Referidos"
                subtitle="Iniciar sesión"
              />
              <CardText>
                <TextField
                  name="txtUsuario"
                  onChange={this.onChange}
                  floatingLabelText="Usuario"
                  errorText={this.state.formError.usuario}
                />
                <br />
                <TextField
                  name="txtClave"
                  onChange={this.onChange}
                  floatingLabelText="Clave"
                  type="password"
                  errorText={this.state.formError.clave}
                />
                {errorContent}
              </CardText>
              <CardActions>
                <FlatButton label="Aceptar" onClick={this.handleAceptar} />
              </CardActions>
            </Card>
          </Col>
        </Row>
      </PrincipalContainer>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMge: PropTypes.string,
  login: PropTypes.func,
  goToPrincipal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeLoading(),
  profile: makeProfile(),
  error: makeError(),
  errorMge: makeErrorMge(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (form) => dispatch(login(form)),
    goToPrincipal: () => dispatch(push('/principal')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
