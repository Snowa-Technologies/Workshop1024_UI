import React, { useEffect, useState,useRef, useMemo } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { FaLongArrowAltRight, FaLongArrowAltLeft, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { getPromotions } from '../../store/actions/promotion-action';

const ManagePromotions = () => {

  const dispatch = useDispatch();
  const fetchOnce = useRef(false); // Reference to ensure campaigns are fetched only once
  const isActionChange = useRef(false);

  const navigate = useNavigate();

  const [filters, setfilters] = useState( { pageNumber : 1, pageCount : 5 }); // State to manage pagination filters (page number and count)
  const allPromotions = useSelector(state => state.getPromotionsReducer.promotions); // Selector to get the campaigns from the Redux store

  useEffect(() => {
    if(fetchOnce.current === true && isActionChange.current === true) {
      dispatch(getPromotions(filters));
    }
  },[filters]);

  // useEffect to fetch campaigns only on the first render
  useEffect(() => { 
    if (!fetchOnce.current) {
      dispatch(getPromotions(filters));
      fetchOnce.current = true;   // Set the fetchOnce.current to true to prevent refetching
    }
  },[dispatch]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfilters((prevState) => ({ ...prevState, [name]: value}));
    isActionChange.current = true;
  };

  const formatCurrency = (amount) => { // This Function is convert number to amount Formate
    const formattedAmount = new Intl.NumberFormat('en-IN').format(Number(amount));
    return formattedAmount
  };

  const handlePreviousPage = (e) => {  // Function to handle the 'Previous Page' button click event
    setfilters({...filters, pageNumber : filters.pageNumber - 1}); // Update the filters to go to the previous page
    isActionChange.current = true;
  };

  const handleNextPage = (e) => {  // Function to handle the 'Next Page' button click event
    setfilters({...filters, pageNumber : filters.pageNumber + 1}); // Update the filters to go to the next page
    isActionChange.current = true;
  };

  const handlePageCount = (e) => {  // Function to handle the page count selection (how many items to show per page)
    setfilters({...filters, pageCount : e.target.value, pageNumber : 1}); // Update the filters with the new page count and reset to page 1
    isActionChange.current = true;
  };

  // Memoized columns configuration for the MantineReactTable
  const columns = useMemo( () => 
    [
      { header:"Name", 
        accessorFn: (row) => { return ( <Typography className = "data-column title"></Typography> )}, 
      },
      { header: "Campaign", 
        accessorFn: (row) => ( <Typography className='data-column'></Typography> )
      },
      { header:"Discount", 
        accessorFn: (row) => { return ( <Typography className='data-column '></Typography> )}, 
      },
      { header:"Promo Code", 
        accessorFn: (row) => { return ( <Typography className='data-column '></Typography> )}, 
      },
      { header:"Impressions", 
        accessorFn: (row) => { return ( <Typography className='data-column '></Typography> )}, 
      },
      { header:"Clicks", 
        accessorFn: (row) => { return ( <Typography className='data-column '></Typography> )}, 
      },
      { header:"Conversion Rate", 
        accessorFn: (row) => { return ( <Typography className='data-column '></Typography> )}, 
      },
      {
        header: "Status",
        accessorFn: (row) => {
          // return row["status"] && row["status"] === 1 ? (
          //   <Typography className='data-column active'>Active</Typography>
          // ) : (
          //   <Typography className='data-column inactive'>Inactive</Typography>
          // );
        },
      },
      { header:"Action", 
        accessorFn: (row) => { return ( 
        <Box className="action-column">
          <Typography className='action-icon edit'><FaEdit/></Typography>
          <Typography className='action-icon delete'><MdOutlineDelete/></Typography>
        </Box> )}, 
      },
    ]
  );

  const table = useMantineReactTable({
    columns, data: allPromotions.campaigns || [],
    renderTopToolbar: () => { // Custom top toolbar for the table
      return (
        <Box className="top-toolbar title"> 
          <Box >Promotions </Box>
          <Box >Total Promotions: {allPromotions ? allPromotions.totalCount : 0 } </Box>
        </Box>
      );
    },
    renderBottomToolbar: () => {  // Custom bottom toolbar for pagination controls
      return (
        <Box className="pagination-toolbar">
              <Box className="current-page">
                  <Typography>CurrentPage : </Typography>
                  <Typography>{filters.pageNumber}</Typography>
              </Box>
              <Box className="pagesize">
                  <Select className="selected-page" value={filters.pageCount} onChange={handlePageCount} >
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                  </Select>
                  <Box>
                      <Button onClick={handlePreviousPage} disabled = {filters.pageNumber === 1 }><FaLongArrowAltLeft /></Button> 
                      {filters.pageNumber} 
                      <Button onClick={handleNextPage} disabled = {(Math.ceil(allPromotions.totalCount/filters.pageCount) === filters.pageNumber )
                          || (allPromotions.totalCount/filters.pageCount) === 0}> <FaLongArrowAltRight /></Button>
                  </Box>
              </Box>
          </Box>
      )
    },
    mantineTableContainerProps: { sx: { maxHeight: 450,width:"100%" } }, getRowId: (row) => row.ID, enableStickyHeader: true, initialState: { showColumnFilters: false, showGlobalFilter: false },
    manualPagination: true, enablePagination: true, enableFilters:false, manualFiltering: false, enableColumnActions: false, enableSorting:false,   defaultColumn: { minSize: 20, maxSize: 100, size: 60 },
  });

return (
  <Box className="manage-promotion">
    <Box className="page-title">Manage Promotions</Box>
    <Box className="primary-actions">
        <FormControl required >
            <InputLabel id = "campaign">Select Campaign</InputLabel>
            <Select labelId = "campaign" label = "Select Campaign" value={filters.c_nm || "all"}  required onChange={handleChange} 
                className = "campaign-select" name = "c_nm">
                    <MenuItem  value = "all">All</MenuItem>
                    <MenuItem  value = "dussera sale">Dussera Sale</MenuItem>
            </Select>
        </FormControl>
        <Button className="button" onClick={() => navigate('/newpromotion')}> + New Promotion</Button>
    </Box>
    <Box className = "table-mantine">
        <MantineReactTable table={table} /> 
      </Box>
  </Box>
)}

export default ManagePromotions;
