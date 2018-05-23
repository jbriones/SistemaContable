import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Helmet from 'react-helmet';
import styled from 'styled-components';

import appTheme from '../../config/appTheme';

const AppWrapper = styled.div`
  max-width: calc(100% + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

export function App(props) {
  return (
    <MuiThemeProvider muiTheme={appTheme}>
      <AppWrapper>
        <Helmet
          titleTemplate="Sistema"
          defaultTitle="Sistema"
          meta={[
            { name: 'description', content: 'Sistema' },
          ]}
        />
        <div id="principal">
          {React.Children.toArray(props.children)}
        </div>
      </AppWrapper>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
