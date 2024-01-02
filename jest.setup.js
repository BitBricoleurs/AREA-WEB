global.ResizeObserver = class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
};

jest.mock('reactflow/dist/base.css', () => {});
jest.mock('./src/App/context/loginContext.jsx', () => ({
    ...jest.requireActual('./src/App/context/loginContext.jsx'),
    import: {
      meta: {
        env: {
          VITE_REACT_APP_API_URL: 'https://botnek.azurewebsites.net/',
        },
      },
    },
  }));

jest.mock('./src/App/context/workflowContext.jsx', () => ({
...jest.requireActual('./src/App/context/workflowContext.jsx'),
import: {
    meta: {
    env: {
        VITE_REACT_APP_API_URL: 'https://botnek.azurewebsites.net/',
    },
    },
},
}));