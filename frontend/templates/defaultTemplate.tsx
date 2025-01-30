import { ReactNode } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { IEnrichedNode } from '@/utils/treeData';
import Panel from '@/components/panel';
import { Navbar } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FaHome } from 'react-icons/fa';
import LocalePicker from '@/components/localePicker';

const DefaultTemplate = ({
  nodes,
  children,
}: {
  nodes: IEnrichedNode[];
  children: ReactNode;
}) => {
  return (
    <div id="outerContainer">
      <style jsx global>{`
        body {
          font-family: 'Electrolize', sans-serif;
          font-size: 120%;
        }

        .home-link,
        a:link.home-link,
        a:visited.home-link {
          color: #ddd;
          display: flex;
          align-items: center;
        }

        a,
        a:link,
        a:visited {
          color: rgb(35, 50, 96);
          font-weight: bold;
          text-decoration: none;
        }

        a:hover,
        a:active {
          color: rgb(35, 50, 96);
        }

        .navbar-container {
          justify-content: flex-start !important;
        }

        .locale-picker {
          padding: 1rem;
        }

        .content-container {
          padding: 2rem;
        }

        .graph-container {
          width: 400px;
          height: 400px;
        }

        button.burger-btn {
          margin-right: 1rem;
        }

        .graph-container {
          aspect-ratio: 1;
        }

        @media (max-width: 768px) {
          .graph-container {
            max-width: 100%;
            height: auto;
          }

          .brand-text {
            display: none;
          }
        }
      `}</style>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="navbar-container">
          <Panel nodes={nodes} />
          <Navbar.Brand href="/" className="home-link">
            <span className="brand-text">
              <FormattedMessage id="mathVisualized" />
            </span>
            &nbsp;
            <FaHome />
          </Navbar.Brand>
          <LocalePicker />
        </Container>
      </Navbar>

      <Container id="pageWrap">
        <Row>{children}</Row>
      </Container>
    </div>
  );
};

export default DefaultTemplate;
