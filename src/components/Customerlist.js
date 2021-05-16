import React, { useState, useEffect, forwardRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import Check from '@material-ui/icons/Check';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true)
    }
    
    const closeSnackBar = () => {
        setOpen(false)
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }

    const deleteCustomer = (rowData) => {
        fetch(rowData.links[0].href, { method: 'DELETE' })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMsg('Customer deleted');
                openSnackBar();
            }
            else {
                alert('Something went wrong in deletion');
            }
        })
        .catch(err => console.err(err))
    }

    const updateCustomer = (newData, url) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMsg('Customer updated');
                openSnackBar();
            }
            else {
                alert('Something went wrong in updating');
            }
        })
        .catch(err => console.err(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }
    
    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const tableIcons = {
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />)
    };

    const columns = [
        { title: '', 
            render: rowData => <AddTraining addTraining={addTraining} link={rowData.links[0].href} /> },
        { title: 'Firstname', field: 'firstname' },
        { title: 'Lastname', field: 'lastname' },
        { title: 'Streetaddress', field: 'streetaddress' },
        { title: 'Postcode', field: 'postcode' },
        { title: 'City', field: 'city' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
    ];

    return (

        <div>
            <AddCustomer addCustomer={addCustomer} />
            <MaterialTable
                title="Customerlist"
                data={customers}
                columns={columns}
                options={{ sorting: true }}
                icons={tableIcons}
                editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                deleteCustomer(oldData)
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                updateCustomer(newData, oldData.links[0].href)
                                resolve();
                            }, 1000)
                        })
                }}
            />
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={closeSnackBar}
            />
        </div>
    );
}

export default Customerlist;