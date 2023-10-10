import { ReactNode, Fragment } from 'react';
import styled from 'styled-components';
import TreeMenu from 'react-simple-tree-menu';
import Head from 'next/head';

import { IEnrichedNode } from '../utils/treeData';

import 'react-simple-tree-menu/dist/main.css';

const Row = styled.div`
  display: flex;
  font-family: 'Rajdhani', sans-serif;
`;

const TreeMenuCol = styled.div`
  width: 400px;
`;

const DefaultTemplate = ({
  nodes,
  children,
}: {
  nodes: IEnrichedNode[];
  children: ReactNode;
}) => (
  <Fragment>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Row>
      <TreeMenuCol>
        <TreeMenu data={nodes} />
      </TreeMenuCol>
      <div>{children}</div>
    </Row>
  </Fragment>
);

export default DefaultTemplate;
