import { ReactNode } from 'react';
import styled from 'styled-components';
import TreeMenu from 'react-simple-tree-menu';

import { IEnrichedNode } from '../utils/treeData';

import '../node_modules/react-simple-tree-menu/dist/main.css';

const Row = styled.div`
  display: flex;
`;

const DefaultTemplate = ({
  nodes,
  children,
}: {
  nodes: IEnrichedNode[];
  children: ReactNode;
}) => (
  <Row>
    <div>
      <TreeMenu data={nodes} />
    </div>
    <div>{children}</div>
  </Row>
);

export default DefaultTemplate;
