import React, { useEffect, useState,useRef, useMemo } from 'react';
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { getCampaigns } from '../../store/actions/campaign-action';
import { FaLongArrowAltRight, FaLongArrowAltLeft, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ManageCampaigns = () => {

  const dispatch = useDispatch();
  const fetchOnce = useRef(false); // Reference to ensure campaigns are fetched only once
  const isActionChange = useRef(false);

  const navigate = useNavigate();

  const [pagination, setPagination] = useState( { pageNumber : 1, pageCount : 5 }); // State to manage pagination filters (page number and count)
  const allCampaigns = useSelector(state => state.getCampaignsReducer.campaigns); // Selector to get the campaigns from the Redux store

  useEffect(() => {
    if(fetchOnce.current === true && isActionChange.current === true) {
      dispatch(getCampaigns(pagination));
    }
  },[dispatch,pagination]);

  // useEffect to fetch campaigns only on the first render
  useEffect(() => { 
    if (!fetchOnce.current) {
      dispatch(getCampaigns(pagination));
      fetchOnce.current = true;   // Set the fetchOnce.current to true to prevent refetching
    }
  },[dispatch]); 

  const handlePreviousPage = () => {  // Function to handle the 'Previous Page' button click event
    setPagination({...pagination, pageNumber : pagination.pageNumber - 1}); // Update the filters to go to the previous page
    isActionChange.current = true;
  };

  const handleNextPage = () => {  // Function to handle the 'Next Page' button click event
    setPagination({...pagination, pageNumber : pagination.pageNumber + 1}); // Update the filters to go to the next page
    isActionChange.current = true;
  };

  const handlePageCount = (e) => {  // Function to handle the page count selection (how many items to show per page)
    setPagination({...pagination, pageCount : e.target.value, pageNumber : 1}); // Update the filters with the new page count and reset to page 1
    isActionChange.current = true;
  };

  function formatToIST(dateString) {
    // Create a new Date object from the input UTC date string
    const date = new Date(dateString);
    // Calculate the time in milliseconds for 5 hours and 30 minutes
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    // Adjust the UTC time by adding the IST offset
    const istDate = new Date(date.getTime() + istOffset);
    // Options to format the date to the desired output
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Format the date to the desired format: October 10, 2024
    return istDate.toLocaleDateString('en-US', options);
  };

  // Memoized columns configuration for the MantineReactTable
  const columns = useMemo( () => 
    [
      { header:"Name", 
        accessorFn: (row) => { return ( <Typography className = "data-column title">{row["c_nm"]}</Typography> )}, 
      },
      { header: "Duration", 
        accessorFn: (row) => ( <Typography className='data-column large-width'> {`${formatToIST(row["start_dt"])} - ${formatToIST(row["end_dt"])}`}  </Typography> )
      },
      { header:"Created on", 
        accessorFn: (row) => { return ( <Typography className='data-column date'>{formatToIST(row["c_on"])}</Typography> )}, 
      },
      {
        header: "Status",
        accessorFn: (row) => {
          return row["status"] && row["status"] === 1 ? (
            <Typography className='data-column active'>Active</Typography>
          ) : (
            <Typography className='data-column inactive'>Inactive</Typography>
          );
        },
      },
      { header:"Action", 
        accessorFn: (row) => { return ( 
        <Box className="action-column">
          <Typography className='action-icon edit'><FaEdit/></Typography>
          <Typography className='action-icon delete'><MdOutlineDelete/></Typography>
        </Box> )}, 
      },
    ], []
  );

  const table = useMantineReactTable({
    columns, data: allCampaigns.campaigns || [],
    renderTopToolbar: () => { // Custom top toolbar for the table
      return (
        <Box className="top-toolbar title"> 
          <Box >Campaigns </Box>
          <Box >Total Campaigns: {allCampaigns ? allCampaigns.totalCount : 0 } </Box>
        </Box>
      );
    },
    renderBottomToolbar: () => {  // Custom bottom toolbar for pagination controls
      return (
        <Box className="pagination-toolbar">
              <Box className="current-page">
                  <Typography>CurrentPage : </Typography>
                  <Typography>{pagination.pageNumber}</Typography>
              </Box>
              <Box className="pagesize">
                  <Select className="selected-page" value={pagination.pageCount} onChange={handlePageCount} >
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                  </Select>
                  <Box>
                      <Button onClick={handlePreviousPage} disabled = {pagination.pageNumber === 1 }><FaLongArrowAltLeft /></Button> 
                      {pagination.pageNumber} 
                      <Button onClick={handleNextPage} disabled = {(Math.ceil(allCampaigns.totalCount/pagination.pageCount) === pagination.pageNumber )
                          || (allCampaigns.totalCount/pagination.pageCount) === 0}> <FaLongArrowAltRight /></Button>
                  </Box>
              </Box>
          </Box>
      )
    },
    mantineTableContainerProps: { sx: { maxHeight: 450,width:"100%" } }, getRowId: (row) => row.ID, enableStickyHeader: true, initialState: { showColumnFilters: false, showGlobalFilter: false },
    manualPagination: true, enablePagination: true, enableFilters:false, manualFiltering: false, enableColumnActions: false, enableSorting:false,   defaultColumn: { minSize: 20, maxSize: 100, size: 60 },
  });

return (
  <Box className="manage-campaign">
    <Box className="page-title">Manage Campaigns</Box>
    <Box className="primary-action">
        <Button className="button" onClick={() => navigate('/newcampaign')}> + New Campaign</Button>
    </Box>
    <Box className = "table-mantine">
        <MantineReactTable table={table} /> 
      </Box>
  </Box>
)}

export default ManageCampaigns;
