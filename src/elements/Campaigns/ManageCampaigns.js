import React, { useEffect, useState,useRef, useMemo } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography , InputLabel,FormControl } from "@mui/material";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { getCampaigns } from '../../store/actions/campaign-action';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

const ManageCampaigns = () => {

  const dispatch = useDispatch();
  const fetchOnce = useRef(false);

  const navigate = useNavigate();

  const [filters, setFilters] = useState( { pageNumber : 1, pageCount : 5 });
  const allCampaigns = useSelector(state => state.getCampaignsReducer.campaigns);

  useEffect(() => {
    if (!fetchOnce.current) {
      dispatch(getCampaigns(filters));
      fetchOnce.current = true;  
    }
  },[dispatch]); 

  const handlePreviousPage = (e) => { //Handle previous page
    setFilters({...filters, pageNumber : filters.pageNumber - 1});
  }

  const handleNextPage = (e) => { //Handle next page
    setFilters({...filters, pageNumber : filters.pageNumber + 1});
  }

  const handlePageCount = (e) => { //Handle page count
    console.log(filters.pageCount);
    setFilters({...filters, pageCount : e.target.value, pageNumber : 1});
  }


  const columns = useMemo( () => 
  []);

  const table = useMantineReactTable({
    columns, data: allCampaigns.campaigns || [],
    renderTopToolbar: () => {
      return (
        <Box className="top-toolbar"> 
          <Box className = "toolbar-heading">Campaigns </Box>
          <Box className = "toolbar-heading">Total Campaigns count: 0 </Box>
        </Box>
      );
    },
    renderBottomToolbar: () => {  
      return (
        <Box className="bottom-toolbar-pagination">
              <Box className="current-page">
                  <Typography>CurrentPage : </Typography>
                  <Typography>{filters.pageNumber}</Typography>
              </Box>
              <Box className="sub-bottom-container">
                  <Select className="pagesize-select" value={filters.pageCount} onChange={handlePageCount} >
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                  </Select>
                  <Box>
                      <Button onClick={handlePreviousPage} disabled = {filters.pageNumber === 1 }><FaLongArrowAltLeft /></Button> 
                      {filters.pageNumber} 
                      <Button onClick={handleNextPage} disabled = {(Math.ceil(allCampaigns.totalCount/filters.pageCount) === filters.pageNumber )
                          || (allCampaigns.totalCount/filters.pageCount) === 0}> <FaLongArrowAltRight /></Button>
                  </Box>
              </Box>
          </Box>
      )
    },
    mantineTableContainerProps: { sx: { maxHeight: 450,width:"100%" } }, getRowId: (row) => row.ID, enableStickyHeader: true, initialState: { showColumnFilters: false, showGlobalFilter: false },
    manualPagination: true, enablePagination: true, enableFilters:false, manualFiltering: false, enableColumnActions: false, enableSorting:false,   defaultColumn: { minSize: 20, maxSize: 100, size: 60 },
  });

return (
  <Box className="table-container grid-main">
    <Box className="page-title">Manage Campaigns</Box>
    <Box className="search-box">
        <Button className="button" onClick={() => navigate('/newcampaign')}> + New Campaign</Button>
    </Box>
    <Box className = "table-mantine">
        <MantineReactTable table={table} /> 
      </Box>
  </Box>
)}

export default ManageCampaigns;
