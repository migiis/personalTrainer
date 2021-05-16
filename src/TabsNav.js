import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';

function TabsNav() {

    const [value, setValue] = useState('0');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return(
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="0" label="Customers" />
                    <Tab value="1" label="Trainings" />
                    <Tab value="2" label="Calendar" />
                </Tabs>
            </AppBar>
            { value === '0' && <div><Customerlist /> </div> }
            { value === '1' && <div><Traininglist /> </div> }
            { value === '2' && <div><Calendar /> </div> }
        </div>
    );
}

export default TabsNav;