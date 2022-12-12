import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Grid from '@material-ui/core/Grid';

import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import DBVC from "./DBVC"
//import photos from "./Photos";
import Logo from "./Logo"
import Card from './Card';
//import Imagecreate from "./Imagecreate"
//import VistingCard from './VistingCard';
import Collage from './Collage';
import CreatePost from './CreatePost';
import Cframe from './Cframe';
import Temp from './Temp';

export default function Custom() {

    const [value, setValue] = React.useState('2');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
           <div
            id="Dmthome-div1" >
            
            <div className='account-main'>
                <TabContext value={value}>
                    <div className='ac-left'>
                        <TabList
                            onChange={handleChange}
                            orientation='vertical'
                            className="custom-tab-list"
                        >
                            <Tab label={<><DashboardIcon/>Create Frame</>} value="2" />
                            <Tab label={<><DashboardIcon/>Create Logo</>} value="4" />
                            <Tab label={<><FilterFramesIcon/>Digital Business Card</>} value="3"/>
                            <Tab label={<><FilterFramesIcon />Create Motivational Post</>} value="1" />
                            <Tab label={<><FilterFramesIcon />Before / After Image</>} value="5" />
                        </TabList>
                    </div>
                    <div className='ac-right'>
                        <TabPanel value="2">
                            <Cframe/>
                        </TabPanel>
                        <TabPanel value="5">
                            <Temp/>
                        </TabPanel>
                        <TabPanel value="4">
                            <Logo />
                        </TabPanel>
                        <TabPanel value="3">
                         <DBVC />
                        </TabPanel>
                        <TabPanel value="1">
                            <CreatePost />
                        </TabPanel>
                    </div>
                </TabContext>
            </div>


            
        </div>
    );
}
