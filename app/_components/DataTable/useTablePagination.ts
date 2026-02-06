'use client';

import { useEffect, useState } from 'react';

export const useTablePagination = ({
  page,
  totalRows,
  rowsPerPage,
  onPageChange,
}: {
  page: number,
  totalRows: number,
  rowsPerPage: number,
  onPageChange: (page: number) => void;
}) => {

  const [pageInputValue, setPageInputValue] = useState(String(page + 1));
  const maxPage = Math.ceil(totalRows / rowsPerPage) || 1;

  useEffect(() => {
    setPageInputValue(String(page + 1));
  }, [page]);

  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(event.target.value);
  };

  const handlePageInputBlur = () => {
    const inputPage = parseInt(pageInputValue, 10);
    if (!isNaN(inputPage) && inputPage > 0 && inputPage <= maxPage) {
      onPageChange(inputPage - 1); // Convert to 0-indexed
    } else {
      setPageInputValue(String(page + 1)); // Reset to current page
    }
  };

  const handlePageInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  return {
    maxPage,
    pageInputValue,
    setPageInputValue,
    handlePageInputChange,
    handlePageInputKeyDown,
    handlePageInputBlur,
  };
};
