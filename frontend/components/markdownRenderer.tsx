import Markdown from 'react-markdown';

const MarkdownRenderer = ({ markdown }: { markdown: string }) => (
  <Markdown>{markdown}</Markdown>
);

export default MarkdownRenderer;
