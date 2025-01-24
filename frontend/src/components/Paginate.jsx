import { Pagination } from "react-bootstrap";
import { Link, } from "react-router-dom";


const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item
                        as={Link}
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/productlist/${x + 1}`
                        }
                        active={x + 1 === page}
                    >
                        {x + 1}
                    </Pagination.Item>
                ))}

                {/* {[...Array(pages).keys()].map((x) => (
                    <NavLink as={Link} key={x + 1}
                        to={
                            !isAdmin
                                ? `/page/${x + 1}`
                                : `/admin/productlist/${x + 1}`
                        }>
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </NavLink>
                ))} */}
            </Pagination>
        )
    )
}

export default Paginate