import RouterComp from './comps/RouterComp'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './comps/materialUI'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <RouterComp />
      </ThemeProvider>
    </div>
  );
}

export default App;
