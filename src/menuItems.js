import NotificationsIcon from '@mui/icons-material/Notifications';

export const menuItems = [
   
    {
        title: "Custom",
    },
    {
        title: "Plan",
    },
    {
        title: "Download",
    },
    {
        title: "Account",
        submenu: [{
            title: "account",
        },
        {
            title: "one",
            submenu: [{
                title: "one1",
            },
            {
                title: "one2",
                /* submenu: [{
                         title: "NodeJS",
                     },
                     {
                         title: "PHP",
                     },
                 ],*/
            },
            ],
        },
        {
            title: "notification",
        },
        ],
    },
    {
        title: "About",
        submenu: [{
            title: "About1",
        },
        {
            title: "About2",
        },
        ],
    },
];