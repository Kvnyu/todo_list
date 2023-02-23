// Modules
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// Providers
import { ThemeProvider } from '@material-ui/core';
// MUI
import CssBaseline from '@material-ui/core/CssBaseline';
// Styles
import '../theme/css/styles.css';
import theme from '../theme/theme';

// InMemoryCache is used to cache query results after fetching them
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_API_URL,
});

// Is this a higher order component ?
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
