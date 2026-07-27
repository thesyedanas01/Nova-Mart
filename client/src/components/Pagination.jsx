import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination" id="pagination">
        <button
          className="pagination__btn pagination__btn--nav"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          id="pagination-prev"
          aria-label="Previous page"
        >
          <HiChevronLeft /> <span>Prev</span>
        </button>

        <div className="pagination__numbers">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`pagination__btn ${page === currentPage ? 'pagination__btn--active' : ''}`}
              onClick={() => onPageChange(page)}
              id={`pagination-page-${page}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination__btn pagination__btn--nav"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          id="pagination-next"
          aria-label="Next page"
        >
          <span>Next</span> <HiChevronRight />
        </button>

        <div className="pagination__indicator">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
