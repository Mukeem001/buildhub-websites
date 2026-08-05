import { useState } from "react";

import TemplateHero from "./component/TemplateHero";
import CategoryFilter from "./component/CategoryFilter";
import TemplateGrid from "./component/TemplateGrid";
import Pagination from "./component/Pagination";

const Templates = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  // API se baad me aayega
  const totalPages = 12;

  return (
    <>
      <TemplateHero
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TemplateGrid
        search={search}
        selectedCategory={selectedCategory}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Templates;