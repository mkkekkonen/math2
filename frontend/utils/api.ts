export const fetchCategories = async () => {
  const categoryRes = await fetch('http://127.0.0.1:8000/categories/');
  const categories = await categoryRes.json();
  return categories;
};

export const fetchPages = async () => {
  const pageRes = await fetch('http://127.0.0.1:8000/pages/');
  const pages = await pageRes.json();
  return pages;
};
