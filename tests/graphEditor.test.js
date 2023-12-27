import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkflowContextProvider } from '../src/App/context/workflowContext.jsx';
import GraphEditor from '../src/App/components/GraphEditor.jsx';
import '@testing-library/jest-dom';

describe('GraphEditor', () => {
  const startingTrigger = {
    serviceName: 'Test Service',
    description: 'Test Description'
  };

  const workflowId = '1';

  test('renders without crashing', () => {
    render(
      <WorkflowContextProvider>
        <GraphEditor startingTrigger={startingTrigger} workflowId={workflowId} />
      </WorkflowContextProvider>
    );
  });
});