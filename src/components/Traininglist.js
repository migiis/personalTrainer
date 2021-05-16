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
import Moment from 'react-moment';

function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true)
    }
    
    const closeSnackBar = () => {
        setOpen(false)
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }
    
    const deleteTraining = (rowData) => {
        fetch(rowData.links[0].href, { method: 'DELETE' })
        .then(response => {
            if(response.ok) {
                fetchTrainings();
                setMsg('Training deleted');
                openSnackBar();
            }
            else {
                alert('Something went wrong in deletion');
            }
        })
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
        { title: 'Date', field: 'date',
            render: row => (
                <Moment format="DD.MM.YYYY HH:mm">{row.date}</Moment>
            )
        },
        { title: 'Duration', field: 'duration' },
        { title: 'Activity', field: 'activity' },
        { title: 'Firstname', field: 'customer.firstname' },
        { title: 'Lastname', field: 'customer.lastname' }
    ];

    return (

        <div>
            <MaterialTable
                title="Traininglist"
                data={trainings}
                columns={columns}
                options={{ sorting: true }}
                icons={tableIcons}
                editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                deleteTraining(oldData)
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

export default Traininglist;