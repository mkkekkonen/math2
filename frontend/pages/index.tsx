export const getServerSideProps = (async context => {
  const categoryRes = await fetch('http://127.0.0.1:8000/categories/');
  const pageRes = await fetch('http://127.0.0.1:8000/pages/');
  const categories = await categoryRes.json();
  const pages = await pageRes.json();
  return { props: { categories, pages } };
});

const Index = ({ categories, pages }: { categories: any[], pages: any[] }) => (
  <div>
    <h1>Hello world</h1>
    <h3>Categories</h3>
    <ul>
      {categories && categories.map(category => (
        <li key={category.id}>{category.localization_key}</li>
      ))}
    </ul>
    <h3>Pages</h3>
    <ul>
      {pages && pages.map(page => (
        <li key={page.id}>{page.localization_key}</li>
      ))}
    </ul>
  </div>
);

export default Index;
